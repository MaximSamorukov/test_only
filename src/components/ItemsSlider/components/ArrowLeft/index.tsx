import React, { useEffect, useState } from 'react';
import { ArrowIcon } from '../../../shared/ui/Circle/arrowIcon';
import { observer } from 'mobx-react-lite';
import { useHistoricalDataStore } from '../../../../store/hookProvider';
import s from './style.module.scss';

export const ArrowLeftButton = observer(() => {
  const historicalDataStore = useHistoricalDataStore();
  const swiper = historicalDataStore.swiper;
  const [isAtStart, setIsAtStart] = useState(true);

  useEffect(() => {
    if (!swiper) return;
    setIsAtStart(swiper.isBeginning);
    const handleSlideChange = () => {
      setIsAtStart(swiper.isBeginning);
    };
    swiper.on('slideChange', handleSlideChange);

    return () => {
      swiper.off('slideChange', handleSlideChange);
    };
  }, [swiper]);

  const handleLeft = () => {
    swiper?.slidePrev();
  };

  return (
    <button
      onClick={handleLeft}
      className={s.container}
      disabled={!swiper || isAtStart}
      style={{ visibility: isAtStart ? 'hidden' : 'visible' }}
    >
      <ArrowIcon size={40} arrowWidth={2.5} stroke="#3877EE" />
    </button>
  );
});
