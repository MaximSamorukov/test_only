import React from 'react';
import { PagesCount } from './PagesCount';
import { observer } from 'mobx-react-lite';
import { ArrowButton } from './ArrowButton';
import { useMediaQuery } from 'react-responsive';
import { MobilePaginator } from './MobilePaginator';
import { useHistoricalDataStore } from '../../../../store/hookProvider';
import s from './style.module.scss';

export const Controls = observer(() => {
  const maxWidth1050 = useMediaQuery({ query: '(max-width: 1050px)' });
  const historicalDataStore = useHistoricalDataStore();

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
  if (maxWidth1050) {
    return (
      <div className={s.mobileContainer}>
        <div className={s.mobilePageCounter}>
          <PagesCount current={currentIndex} periodsCount={periodsCount} />
        </div>
        <div className={s.mobilePaginatorContainer}>
          <MobilePaginator />
        </div>
        <div className={s.mobileArrowsContainer}>
          <ArrowButton
            size={25}
            direction="left"
            disabled={leftArrowIsDisabled}
            onClick={handleLeft}
          />
          <ArrowButton
            size={25}
            direction="right"
            disabled={rightArrowIsDisabled}
            onClick={handleRight}
          />
        </div>
      </div>
    );
  }
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
