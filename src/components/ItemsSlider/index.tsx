import React, { useEffect } from 'react';
import { Navigation, Scrollbar } from 'swiper/modules';
import { observer } from 'mobx-react-lite';
import { Item } from './components/Item';
import { ArrowRightButton } from './components/ArrowRight';
import { ArrowLeftButton } from './components/ArrowLeft';
import { historicalDataStore } from '../../store';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import s from './style.module.scss';

export const ItemsSlider = observer(() => {
  const points = historicalDataStore.currentPoints;
  const swiper = historicalDataStore.swiper;

  useEffect(() => {
    swiper?.slideTo(0);
  }, [points]);

  return (
    <div className={s.container}>
      <ArrowLeftButton />
      <div className={s.innerContainer}>
        <Swiper
          onSwiper={(swiper) => {
            historicalDataStore.swiper = swiper;
          }}
          modules={[Navigation, Scrollbar]}
          spaceBetween={50}
          slidesPerView={3}
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
      <ArrowRightButton />
    </div>
  );
});
