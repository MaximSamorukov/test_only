type ThinCircleProps = {
  size: number;
  stroke: string;
  strokeWidth: number;
  arrowWidth: number;
};
export function ThinCircle({
  size = 100,
  stroke = '#000',
  strokeWidth = 0.5,
  arrowWidth = 0.2,
}: ThinCircleProps) {
  const widthCoefficient = 0.2;
  const widthToHeight = 2.0;
  const backToFrontCoefficient = 0.25;
  const center = size / 2;
  const arrawIconWidth = size * widthCoefficient;
  const arrowIconHeight = arrawIconWidth * widthToHeight;
  const fromX = center - arrawIconWidth * backToFrontCoefficient;
  const fromY = center - arrowIconHeight / 2;
  const midX = center + arrawIconWidth * (1 - backToFrontCoefficient);
  const midY = center;
  const toX = fromX;
  const toY = fromY + arrowIconHeight;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: 'block' }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - strokeWidth / 2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <path
        d={`M${fromX} ${fromY} L${midX} ${midY} L${toX} ${toY}`}
        stroke={stroke}
        strokeWidth={arrowWidth}
        fill="none"
      />
    </svg>
  );
}
