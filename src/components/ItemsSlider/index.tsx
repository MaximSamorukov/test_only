import React, { useEffect } from 'react';
import { Navigation, Scrollbar } from 'swiper/modules';
import { observer } from 'mobx-react-lite';
import { useMediaQuery } from 'react-responsive';
import { Item } from './components/Item';
import { ArrowRightButton } from './components/ArrowRight';
import { ArrowLeftButton } from './components/ArrowLeft';
import { historicalDataStore } from '../../store';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetMediaValues } from './utils';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import s from './style.module.scss';

export const ItemsSlider = observer(() => {
  const { slidesPerView, spaceBetween, withControls } = useGetMediaValues();

  const points = historicalDataStore.currentPoints;
  const swiper = historicalDataStore.swiper;

  useEffect(() => {
    swiper?.slideTo(0);
  }, [points]);
  return (
    <div className={s.container}>
      {withControls && <ArrowLeftButton />}
      <div className={s.innerContainer}>
        <Swiper
          onSwiper={(swiper) => {
            historicalDataStore.swiper = swiper;
          }}
          modules={[Navigation, Scrollbar]}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          navigation={false}
          pagination={false}
          scrollbar={false}
          className={s.swiper}
        >
          {points.map((point, index) => (
            <SwiperSlide key={`${point.year}-${index}`}>
              <Item point={point} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {withControls && <ArrowRightButton />}
    </div>
  );
});
