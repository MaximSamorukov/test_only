type ThinCircleProps = {
  size: number;
  stroke: string;
  arrowWidth: number;
};
export const ArrowIcon = ({
  size = 100,
  stroke = '#000',
  arrowWidth = 0.2,
}: ThinCircleProps) => {
  const widthCoefficient = 0.15;
  const widthToHeight = 2.1;
  const backToFrontCoefficient = 0.3;
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
      <path
        d={`M${fromX} ${fromY} L${midX} ${midY} L${toX} ${toY}`}
        stroke={stroke}
        strokeWidth={arrowWidth}
        fill="none"
      />
    </svg>
  );
};
