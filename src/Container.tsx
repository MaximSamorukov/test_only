import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { YearsSlider } from './components/YearsSlider';
import { Title } from './components/Title';
import { ItemsSlider } from './components/ItemsSlider';
import s from './Container.module.scss';

gsap.registerPlugin(MotionPathPlugin);

const calculateDots = (
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  count: number,
) => {
  const angleStep = 360 / count;
  const startAngle = -90;

  return Array.from({ length: count }, (_, i) => {
    const angle = ((startAngle + i * angleStep) * Math.PI) / 180;
    return {
      id: i,
      x: cx + rx * Math.cos(angle),
      y: cy + ry * Math.sin(angle),
    };
  });
};

export const Container = () => {
  const dotsRef = useRef<(SVGCircleElement | null)[]>([]);
  const dots = useMemo(() => calculateDots(720, 480, 265, 265, 6), []);

  useEffect(() => {
    dotsRef.current.forEach((dot, index) => {
      if (!dot) return;

      gsap.to(dot, {
        duration: 20,
        repeat: -1,
        ease: 'none',
        motionPath: {
          path: '#circlePath',
          align: '#circlePath',
          alignOrigin: [0.5, 0.5],
          start: index / 6,
          end: index / 6 + 1,
        },
      });
    });
  }, []);

  const handleDotClick = (dotId: number) => {
    console.log('Clicked dot:', dotId);
  };

  const handleDotMouseEnter = (event: React.MouseEvent<SVGCircleElement>) => {
    gsap.to(event.currentTarget, {
      attr: { r: 14 },
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleDotMouseLeave = (event: React.MouseEvent<SVGCircleElement>) => {
    gsap.to(event.currentTarget, {
      attr: { r: 8 },
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div className={s.mainContainer}>
      <svg
        className={s.dotsOverlay}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 1080"
      >
        <path
          id="circlePath"
          d="M 720,215 A 265,265 0 1,1 719.99,215"
          fill="none"
          stroke="none"
        />
        {dots.map((dot, index) => (
          <circle
            key={dot.id}
            ref={(el) => {
              dotsRef.current[index] = el;
            }}
            cx={dot.x}
            cy={dot.y}
            r={8}
            fill="black"
            onMouseEnter={handleDotMouseEnter}
            onMouseLeave={handleDotMouseLeave}
            className={s.dot}
            onClick={() => handleDotClick(dot.id)}
          />
        ))}
      </svg>

      <div className={s.innerContainer}>
        <Title />
        <YearsSlider />
        <ItemsSlider />
      </div>
    </div>
  );
};
