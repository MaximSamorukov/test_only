import React from 'react';
import s from './style.module.scss';
import { LeftArrowButton } from './LeftArrowButton';
import { RightArrowButton } from './RightArrowButton';
import { PagesCount } from './PagesCount';
import { observer } from 'mobx-react-lite';

export const Controls = observer(() => {
  return (
    <div className={s.container}>
      <PagesCount />
      <div className={s.arrowsContainer}>
        <LeftArrowButton onClick={() => {}} />
        <RightArrowButton onClick={() => {}} />
      </div>
    </div>
  );
});
