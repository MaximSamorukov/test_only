import React from 'react';
import s from './style.module.scss';
import { Item } from './components/Item';
import { ArrowRightButton } from './components/ArrowRight';
import { ArrowLeftButton } from './components/ArrowLeft';

export const ItemsSlider = () => {
  return (
    <div className={s.container}>
      <Item />
      <Item />
      <Item />
      <ArrowRightButton />
      <ArrowLeftButton />
    </div>
  );
};
