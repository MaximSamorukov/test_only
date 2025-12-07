import { useRef, useMemo, useLayoutEffect, useEffect, useState } from 'react';
import gsap from 'gsap';
import { YearsSlider } from './components/YearsSlider';
import { Title } from './components/Title';
import { ItemsSlider } from './components/ItemsSlider';
import { calculateDots, getDelta, getRealIndex } from './utils';
import {
  CIRCLE_RADIUS,
  START_DOT_RADIUS,
  END_DOT_RADIUS,
  FULL_CIRCLE_DEG,
  MAX_HEIGHT,
  MAX_WIDTH,
  PATH_COLOR,
  X_CENTER,
  Y_CENTER,
  BACKGROUND_COLOR,
} from './constants';
import { historicalDataStore } from './store';
import { observer } from 'mobx-react-lite';
import s from './Container.module.scss';

export const Container = observer(() => {
  const groupRef = useRef<SVGGElement>(null);
  const periods = historicalDataStore.getAllPeriods();
  const periodsCount = periods.length;
  const currentIndex = historicalDataStore.getCurrentIndex();
  const previousIndex = historicalDataStore.getPreviousIndex();

  const dots = useMemo(
    () => calculateDots(X_CENTER, Y_CENTER, CIRCLE_RADIUS, periods),
    [periods],
  );

  useLayoutEffect(() => {
    let delta = getDelta(previousIndex, currentIndex, periodsCount);
    const angelPerPeriod = FULL_CIRCLE_DEG / periodsCount;
    const travelAngel = angelPerPeriod * delta;
    const tl = gsap.timeline();
    tl.to(groupRef.current, {
      rotation: `-=${travelAngel}`,
      duration: 1.5,
      ease: 'sine.inOut',
      svgOrigin: `${X_CENTER} ${Y_CENTER}`,
    });

    const texts = groupRef.current?.querySelectorAll('text');
    texts?.forEach((text) => {
      const x = text.getAttribute('x');
      const y = text.getAttribute('y');
      tl.to(
        text,
        {
          rotation: `+=${travelAngel}`,
          duration: 1.5,
          ease: 'sine.inOut',
          svgOrigin: `${x} ${y}`,
        },
        0,
      );
    });
  }, [currentIndex, previousIndex, periodsCount]);

  const handleDotClick = (dotId: number) => {
    historicalDataStore.setCurrentPeriod(dotId);
  };

  const handleDotMouseEnter =
    (dotId: number) => (event: React.MouseEvent<SVGGElement>) => {
      const realIndex = getRealIndex(currentIndex, dotId, periods.length);
      const outerCircle = event.currentTarget.querySelector('#outer_circle');
      const innerCircle = event.currentTarget.querySelector('#inner_circle');
      const text = event.currentTarget.querySelector('text');

      gsap
        .timeline()
        .to(outerCircle, {
          attr: { r: END_DOT_RADIUS },
          fill: PATH_COLOR,
          duration: 0.2,
          ease: 'power2.out',
        })
        .to(innerCircle, {
          attr: { r: END_DOT_RADIUS - 0.7 },
          fill: BACKGROUND_COLOR,
          duration: 0.2,
          ease: 'power2.out',
        })
        .to(
          text,
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          },
          '-=0.1',
        );
    };

  const handleDotMouseLeave = (event: React.MouseEvent<SVGGElement>) => {
    const outerCircle = event.currentTarget.querySelector('#outer_circle');
    const innerCircle = event.currentTarget.querySelector('#inner_circle');
    const texts = groupRef.current?.querySelectorAll('text');

    const tl = gsap.timeline();
    tl.to(innerCircle, {
      attr: { r: 0 },
      fill: PATH_COLOR,
      stroke: 'none',
      strokeWidth: 0,
      duration: 0.1,
      ease: 'power2.out',
    }).to(outerCircle, {
      attr: { r: START_DOT_RADIUS },
      fill: PATH_COLOR,
      stroke: 'none',
      strokeWidth: 0,
      duration: 0.2,
      ease: 'power2.out',
    });
    texts?.forEach((text) => {
      tl.to(
        text,
        {
          opacity: 0,
          duration: 0.1,
          ease: 'power2.out',
        },
        0,
      );
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
            <g
              key={dot.id}
              onMouseEnter={handleDotMouseEnter(dot.id)}
              onMouseLeave={handleDotMouseLeave}
              className={s.dot}
              onClick={() => handleDotClick(dot.id)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                id="outer_circle"
                cx={dot.x}
                cy={dot.y}
                r={START_DOT_RADIUS}
                fill={PATH_COLOR}
              />
              <circle
                id="inner_circle"
                cx={dot.x}
                cy={dot.y}
                r={0}
                fill="black"
              />
              <text
                x={dot.x}
                y={dot.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="14"
                fill="black"
                opacity={0}
                style={{
                  pointerEvents: 'none',
                  userSelect: 'none',
                  fontSize: '20px',
                  color: PATH_COLOR,
                }}
              >
                {dot.id}
              </text>
            </g>
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
