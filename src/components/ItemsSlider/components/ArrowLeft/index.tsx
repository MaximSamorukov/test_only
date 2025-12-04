import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import s from './style.module.scss';
import { ArrowIcon } from '../../../shared/ui/Circle/arrowIcon';
import { historicalDataStore } from '../../../../store';
import { observer } from 'mobx-react-lite';

type ArrowLeftButtonProps = {};
export const ArrowLeftButton: React.FC<ArrowLeftButtonProps> = observer(() => {
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
