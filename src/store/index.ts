import { makeAutoObservable } from 'mobx';
import { historicalData } from './constants';
import { Direction, HistoricalData, Period, Point } from './type';
import { SwiperClass } from 'swiper/react';

class HistoricalDataStore {
  private readonly _data: HistoricalData;
  private _currentPeriod: Period;
  private _currentPoints: Point[];
  private _direction: Direction;
  private _currentIndex: number = 0;
  private _swiper: SwiperClass | null = null;
  private _periodSwiper: SwiperClass | null = null;

  constructor(data: HistoricalData) {
    this._data = data;
    this._currentPeriod = { ...data[this._currentIndex].period };
    this._currentPoints = [...data[this._currentIndex].points];
    this._direction = data[this._currentIndex].direction;
    makeAutoObservable(this);
  }
  getCurrentIndex() {
    return this._currentIndex;
  }
  getPeriodsCount() {
    return this._data.length;
  }
  getNextIndex() {
    const index = this.getCurrentIndex();
    if (index === this._data.length - 1) {
      return 0;
    }
    return index + 1;
  }
  getPrevIndex() {
    const index = this.getCurrentIndex();
    if (index === 0) {
      return this._data.length - 1;
    }
    return index - 1;
  }

  private setCurrentData(index: number): void {
    const info = this._data[index];
    this._currentIndex = index;
    this._direction = info.direction;
    this._currentPeriod = { ...info.period };
    this._currentPoints = [...info.points];
  }

  nextPeriod() {
    if (!this._periodSwiper?.isEnd) {
      this.periodSwiper?.slideNext();
      this.setCurrentData(this.getNextIndex());
    }
  }

  prevPeriod() {
    if (!this._periodSwiper?.isBeginning) {
      this.periodSwiper?.slidePrev();
      this.setCurrentData(this.getPrevIndex());
    }
  }

  get currentPeriod() {
    return this._currentPeriod;
  }

  set currentPeriod(per: Period) {
    this._currentPeriod = { ...per };
  }

  get currentPoints() {
    return this._currentPoints;
  }

  set currentPoints(points: Point[]) {
    this._currentPoints = [...points];
  }

  get direction() {
    return this._direction;
  }
  set direction(dir: Direction) {
    this._direction = dir;
  }

  set swiper(sw: SwiperClass | null) {
    this._swiper = sw;
  }
  get swiper() {
    return this._swiper;
  }
  set periodSwiper(sw: SwiperClass | null) {
    this._periodSwiper = sw;
  }
  get periodSwiper() {
    return this._periodSwiper;
  }
  getAllPeriods() {
    return this._data.map((i) => i.period);
  }
}

export const historicalDataStore = new HistoricalDataStore(historicalData);
