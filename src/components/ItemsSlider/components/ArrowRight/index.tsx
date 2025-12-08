import React, { useEffect, useState } from 'react';
import { ArrowIcon } from '../../../shared/ui/Circle/arrowIcon';
import { observer } from 'mobx-react-lite';
import { useHistoricalDataStore } from '../../../../store/hookProvider';
import s from './style.module.scss';

export const ArrowRightButton = observer(() => {
  const historicalDataStore = useHistoricalDataStore();

  const swiper = historicalDataStore.swiper;
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    if (!swiper) return;
    setIsAtEnd(swiper.isEnd);
    const handleSlideChange = () => {
      setIsAtEnd(swiper.isEnd);
    };
    swiper.on('slideChange', handleSlideChange);

    return () => {
      swiper.off('slideChange', handleSlideChange);
    };
  }, [swiper]);

  const handleRight = () => {
    swiper?.slideNext();
  };
  return (
    <button
      onClick={handleRight}
      className={s.container}
      disabled={!swiper || isAtEnd}
      style={{ visibility: isAtEnd ? 'hidden' : 'visible' }}
    >
      <ArrowIcon size={40} arrowWidth={2.5} stroke="#3877EE" />
    </button>
  );
});
