import React, { useState } from 'react';
import s from './style.module.scss';
import { ArrowIcon } from '../../../shared/ui/Circle/arrowIcon';

export const ArrowLeftButton = () => {
  return (
    <div className={s.container}>
      <ArrowIcon size={40} arrowWidth={2.5} stroke="#3877EE" />
    </div>
  );
};
