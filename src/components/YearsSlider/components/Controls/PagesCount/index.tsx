import React from 'react';
import s from './style.module.scss';

type PagesCountProps = {
  current: number;
  periodsCount: number;
};
export const PagesCount: React.FC<PagesCountProps> = ({
  current,
  periodsCount,
}) => {
  const value = (current + 1).toString().padStart(2, '0');
  const periods = periodsCount.toString().padStart(2, '0');
  return (
    <div className={s.container}>
      <span>{`${value}/${periods}`}</span>
    </div>
  );
};
