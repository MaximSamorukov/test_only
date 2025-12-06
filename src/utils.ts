export const calculateDots = (
  cx: number,
  cy: number,
  r: number,
  count: number,
) => {
  const angleStep = 360 / count;
  const startAngle = -90;

  return Array.from({ length: count }, (_, i) => {
    const angle = ((startAngle + i * angleStep) * Math.PI) / 180;
    return {
      id: i,
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  });
};
