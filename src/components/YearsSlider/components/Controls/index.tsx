import React from 'react';
import s from './style.module.scss';
import { LeftArrowButton } from './LeftArrowButton';
import { RightArrowButton } from './RightArrowButton';
import { PagesCount } from './PagesCount';

export const Controls = () => {
  return (
    <div className={s.container}>
      <PagesCount />
      <div className={s.arrowsContainer}>
        <LeftArrowButton />
        <RightArrowButton />
      </div>
    </div>
  );
};
