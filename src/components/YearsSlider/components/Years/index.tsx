import React from 'react';
import s from './style.module.scss';

type YearsProps = {
  from: string;
  to: string;
};
export const Years: React.FC<YearsProps> = ({ from, to }) => {
  return (
    <div className={s.container}>
      <div className={s.fromContainer}>
        <div className={s.fromContainerLabel}>{from}</div>
      </div>
      <div className={s.toContainer}>
        <div className={s.toContainerLabel}>{to}</div>
      </div>
    </div>
  );
};
