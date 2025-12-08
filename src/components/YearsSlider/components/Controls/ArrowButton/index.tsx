import React, { useState } from 'react';
import cn from 'classnames';
import s from './style.module.scss';
import { ThinCircle } from '../../../../shared/ui/Circle/circle';
import { PATH_COLOR } from '../../../../../constants';

type ArrowButtonProps = {
  onClick: () => void;
  disabled: boolean;
  direction: 'right' | 'left';
  size?: number;
};
export const ArrowButton: React.FC<ArrowButtonProps> = ({
  onClick,
  disabled = false,
  direction = 'right',
  size = 50,
}) => {
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };
  const color = PATH_COLOR;
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
        size={size}
        stroke={color}
        strokeWidth={widthValue}
      />
    </button>
  );
};
