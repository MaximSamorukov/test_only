import React from 'react';
import s from './style.module.scss';
import { Point } from '../../../../store/type';

type ItemPropsType = {
  point: Point;
};
export const Item: React.FC<ItemPropsType> = ({ point }) => {
  return (
    <div className={s.container}>
      <div className={s.title}>{point.year}</div>
      <div className={s.text}>
        <span>{point.event}</span>
      </div>
    </div>
  );
};
