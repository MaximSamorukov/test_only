import { useRef, useMemo, useLayoutEffect, useEffect, useState } from 'react';
import gsap from 'gsap';
import { YearsSlider } from './components/YearsSlider';
import { Title } from './components/Title';
import { ItemsSlider } from './components/ItemsSlider';
import { calculateDots, getDelta } from './utils';
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
  DIRECTION_POS_X,
  DIRECTION_POS_Y,
} from './constants';
import { historicalDataStore } from './store';
import { observer } from 'mobx-react-lite';
import s from './Container.module.scss';
import { directionTranslations } from './store/directionTranslations';
import { Controls } from './components/YearsSlider/components/Controls';
import { useMediaQuery } from 'react-responsive';
import { Shim } from './components/shared/ui/Shim';

export const Container = observer(() => {
  const isMaxWidth1050px = useMediaQuery({ query: '(max-width: 1050px)' });
  const groupRef = useRef<SVGGElement>(null);
  const directionLabelRef = useRef<SVGTextElement>(null);
  const periods = historicalDataStore.getAllPeriods();
  const periodsCount = periods.length;
  const currentIndex = historicalDataStore.getCurrentIndex();
  const previousIndex = historicalDataStore.getPreviousIndex();
  const currentDirection = historicalDataStore.direction;
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
    if (travelAngel) {
      tl.to(
        directionLabelRef.current,
        {
          opacity: 0,
          duration: 0.2,
        },
        0,
      );
      tl.to(
        directionLabelRef.current,
        {
          opacity: 1,
          duration: 0.2,
        },
        '1.5',
      );
    }
  }, [currentIndex, previousIndex, periodsCount]);

  const handleDotClick = (dotId: number) => {
    historicalDataStore.setCurrentPeriod(dotId);
  };

  const handleDotMouseEnter =
    (dotId: number) => (event: React.MouseEvent<SVGGElement>) => {
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
        0.1,
      );
    });
  };

  return (
    <div className={s.mainContainer}>
      <svg className={s.dotsOverlay} viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
        <text
          ref={directionLabelRef}
          id="direction"
          x={DIRECTION_POS_X}
          y={DIRECTION_POS_Y}
          textAnchor="start"
          dominantBaseline="central"
          fontSize="20"
          fill={PATH_COLOR}
          opacity={1}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            color: PATH_COLOR,
          }}
        >
          {currentDirection ? directionTranslations[currentDirection] : ''}
        </text>
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
                fill={PATH_COLOR}
              />
              <text
                x={dot.x}
                y={dot.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="14"
                fill={PATH_COLOR}
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
        {isMaxWidth1050px ? <Shim height={78} /> : <></>}
        {isMaxWidth1050px ? <Controls /> : <></>}
      </div>
    </div>
  );
});
