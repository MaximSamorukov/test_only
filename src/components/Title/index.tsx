import React from 'react';
import s from './style.module.scss';

export const Title = () => {
  return (
    <div className={s.container}>
      <div className={s.markLine} />
      <div className={s.title}>
        <span>Исторические даты</span>
      </div>
    </div>
  );
};
