import React from 'react';
import s from './style.module.scss';
import { PagesCount } from './PagesCount';
import { observer } from 'mobx-react-lite';
import { historicalDataStore } from '../../../../store';
import { ArrowButton } from './ArrowButton';

export const Controls = observer(() => {
  const currentIndex = historicalDataStore.getCurrentIndex();
  const periodsCount = historicalDataStore.getPeriodsCount();

  const handleRight = () => {
    historicalDataStore.nextPeriod();
  };
  const handleLeft = () => {
    historicalDataStore.prevPeriod();
  };
  const rightArrowIsDisabled = currentIndex + 1 === periodsCount;
  const leftArrowIsDisabled = currentIndex === 0;

  return (
    <div className={s.container}>
      <PagesCount current={currentIndex} periodsCount={periodsCount} />
      <div className={s.arrowsContainer}>
        <ArrowButton
          direction="left"
          disabled={leftArrowIsDisabled}
          onClick={handleLeft}
        />
        <ArrowButton
          direction="right"
          disabled={rightArrowIsDisabled}
          onClick={handleRight}
        />
      </div>
    </div>
  );
});
