import React from 'react';
import s from './style.module.scss';

export const Item = () => {
  return (
    <div className={s.container}>
      <div className={s.title}>2015</div>
      <div className={s.text}>
        <span>
          Компания Tesla официально представила первый в мире электрический
          грузовик Tesla Semi
        </span>
      </div>
    </div>
  );
};
