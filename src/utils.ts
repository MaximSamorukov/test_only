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

export const getDelta = (
  previousIndex: number,
  currentIndex: number,
  periodsCount: number,
) => {
  let delta = 0;
  if (previousIndex > currentIndex) {
    const counterCWDelta = previousIndex - currentIndex;
    const сWDelta = periodsCount - counterCWDelta;
    if (counterCWDelta > сWDelta) {
      delta = сWDelta;
    } else {
      delta = -counterCWDelta;
    }
  }
  if (previousIndex < currentIndex) {
    const cWDelta = currentIndex - previousIndex;
    const counterCWDelta = periodsCount - cWDelta;
    if (counterCWDelta > cWDelta) {
      delta = cWDelta;
    } else {
      delta = -counterCWDelta;
    }
  }
  return delta;
};
