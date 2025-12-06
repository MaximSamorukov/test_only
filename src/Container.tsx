import { useRef, useMemo, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { YearsSlider } from './components/YearsSlider';
import { Title } from './components/Title';
import { ItemsSlider } from './components/ItemsSlider';
import { calculateDots, getRealIndex } from './utils';
import {
  CIRCLE_RADIUS,
  DOT_RADIUS,
  FULL_CIRCLE_DEG,
  MAX_HEIGHT,
  MAX_WIDTH,
  PATH_COLOR,
  X_CENTER,
  Y_CENTER,
} from './constants';
import s from './Container.module.scss';
import { historicalDataStore } from './store';
import { observer } from 'mobx-react-lite';

export const Container = observer(() => {
  const groupRef = useRef<SVGGElement>(null);
  const periods = historicalDataStore.getAllPeriods();
  const currentIndex = historicalDataStore.getCurrentIndex();
  const dots = useMemo(
    () => calculateDots(X_CENTER, Y_CENTER, CIRCLE_RADIUS, periods),
    [periods],
  );

  useLayoutEffect(() => {
    if (!groupRef.current) return;

    gsap.to(groupRef.current, {
      rotation: 0,
      duration: 2,
      repeat: -1,
      ease: 'none',
      svgOrigin: `${X_CENTER} ${Y_CENTER}`,
    });
  }, []);

  const handleDotClick = (dotId: number) => {
    const length = periods.length;
    const realIndex = getRealIndex(currentIndex, dotId, length);
    const delta = dotId > Math.floor(length / 2) ? length - dotId : -dotId;
    const angelPerPeriod = FULL_CIRCLE_DEG / periods.length;
    const travelAngel = angelPerPeriod * delta;
    gsap.to(groupRef.current, {
      rotation: travelAngel,
      duration: 1.5,
      ease: 'sine.inOut',
      svgOrigin: `${X_CENTER} ${Y_CENTER}`,
    });
    historicalDataStore.setCurrentPeriod(realIndex);
  };

  const handleDotMouseEnter =
    (dotId: number) => (event: React.MouseEvent<SVGCircleElement>) => {
      const realIndex = getRealIndex(currentIndex, dotId, periods.length);
      gsap.to(event.currentTarget, {
        attr: { r: 14 },
        duration: 0.3,
        ease: 'power2.out',
      });
    };

  const handleDotMouseLeave = (event: React.MouseEvent<SVGCircleElement>) => {
    gsap.to(event.currentTarget, {
      attr: { r: DOT_RADIUS },
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div className={s.mainContainer}>
      <svg className={s.dotsOverlay} viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
        <path
          id="circlePath"
          d="M 720,215 A 265,265 0 1,1 719.99,215"
          fill="none"
          strokeWidth="0.5px"
          stroke={PATH_COLOR}
        />
        <g ref={groupRef}>
          {dots.map((dot) => (
            <circle
              key={dot.id}
              cx={dot.x}
              cy={dot.y}
              r={DOT_RADIUS}
              fill="black"
              onMouseEnter={handleDotMouseEnter(dot.id)}
              onMouseLeave={handleDotMouseLeave}
              className={`${s.dot} + ' ' + ${dot.id}`}
              onClick={() => handleDotClick(dot.id)}
            />
          ))}
        </g>
      </svg>

      <div className={s.innerContainer}>
        <Title />
        <YearsSlider />
        <ItemsSlider />
      </div>
    </div>
  );
});
