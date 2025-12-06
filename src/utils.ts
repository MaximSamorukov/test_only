import { FULL_CIRCLE_DEG, START_ANGLE } from './constants';
import { Period } from './store/type';

export const calculateDots = (
  cx: number,
  cy: number,
  r: number,
  periods: Period[],
) => {
  const count = periods.length;
  const angleStep = FULL_CIRCLE_DEG / count;
  const startAngle = START_ANGLE;

  return periods.map((i) => {
    const angle =
      ((startAngle + i.id! * angleStep) * Math.PI) / (FULL_CIRCLE_DEG / 2);
    return {
      id: i.id!,
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  });
};

export const getRealIndex = (
  currentIndex: number,
  id: number,
  count: number,
) => {
  const sum = currentIndex + id;
  if (sum < count) {
    return sum;
  }
  return sum - count;
};
