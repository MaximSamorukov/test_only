import React from 'react';
import { Years } from './components/Years';
import s from './style.module.scss';
import { Controls } from './components/Controls';

export const YearsSlider = () => {
  return (
    <div className={s.container}>
      <Years from="2015" to="2022" />
      <Controls />
    </div>
  );
};
