export type DataItem = {
  period: Period;
  direction: Direction;
  points: Point[];
};

export type Point = {
  year: number;
  event: string;
};

export type Direction =
  | 'fashion'
  | 'tech'
  | 'medicine'
  | 'science'
  | 'automotive'
  | 'transport'
  | 'politics'
  | null;

export type Period = {
  from: number | null;
  to: number | null;
  id: number | null;
};
export type HistoricalData = DataItem[];
