import React, { useState } from 'react';
import s from './style.module.scss';
import { ThinCircle } from '../../../../shared/ui/Circle/circle';

type LeftArrowButtonProps = {
  onClick: () => void;
};

export const LeftArrowButton: React.FC<LeftArrowButtonProps> = ({
  onClick,
}) => {
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };
  const color = '#42567A';
  const width = 0.6;
  const hoveredWidth = 1;
  const widthValue = hover ? hoveredWidth : width;
  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={s.container}
    >
      <ThinCircle
        arrowWidth={widthValue}
        size={50}
        stroke={color}
        strokeWidth={widthValue}
      />
    </div>
  );
};
