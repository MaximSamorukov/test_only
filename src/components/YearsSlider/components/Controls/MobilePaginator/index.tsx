import React from 'react';
import cn from 'classnames';
import s from './style.module.scss';
import { observer } from 'mobx-react-lite';
import { useHistoricalDataStore } from '../../../../../store/hookProvider';

export const MobilePaginator = observer(() => {
  const historicalDataStore = useHistoricalDataStore();

  const periodsCount = historicalDataStore.getPeriodsCount();
  const currentIndex = historicalDataStore.getCurrentIndex();

  const onClick = (id: number) => () => {
    historicalDataStore.setCurrentPeriod(id);
  };

  return (
    <div className={s.container}>
      {Array.from({ length: periodsCount }).map((_, i) => (
        <button
          disabled={i === currentIndex}
          onClick={onClick(i)}
          className={cn(s.itemContainer)}
        >
          <div
            className={cn(s.item, { [s.itemCurrent]: i === currentIndex })}
          />
        </button>
      ))}
    </div>
  );
});
