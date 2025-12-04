import React, { useState } from 'react';
import cn from 'classnames';
import s from './style.module.scss';
import { ThinCircle } from '../../../../shared/ui/Circle/circle';

type ArrowButtonProps = {
  onClick: () => void;
  disabled: boolean;
  direction: 'right' | 'left';
};
export const ArrowButton: React.FC<ArrowButtonProps> = ({
  onClick,
  disabled = false,
  direction = 'right',
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
    <button
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(s.container, s[direction])}
    >
      <ThinCircle
        arrowWidth={widthValue}
        size={50}
        stroke={color}
        strokeWidth={widthValue}
      />
    </button>
  );
};
