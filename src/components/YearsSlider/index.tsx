import React from 'react';
import { Years } from './components/Years';
import s from './style.module.scss';
import { Controls } from './components/Controls';
import { observer } from 'mobx-react-lite';
import { historicalDataStore } from '../../store';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';

export const YearsSlider = observer(() => {
  const isMaxWidth1050px = useMediaQuery({ query: '(max-width: 1050px)' });
  const periods = historicalDataStore.getAllPeriods();
  return (
    <div className={s.container}>
      <Swiper
        onSwiper={(swiper) => {
          historicalDataStore.periodSwiper = swiper;
        }}
        modules={[Navigation, Scrollbar]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={false}
        pagination={false}
        scrollbar={false}
        className={s.swiper}
      >
        {periods.map((i) => (
          <SwiperSlide key={i.from?.toString() + '-' + i.to?.toString()}>
            <Years from={i.from} to={i.to} />
          </SwiperSlide>
        ))}
      </Swiper>
      {isMaxWidth1050px ? <></> : <Controls />}
    </div>
  );
});
