import { Direction } from './type';

export const directionTranslations: Record<Exclude<Direction, null>, string> = {
  fashion: 'Мода',
  tech: 'Технологии',
  medicine: 'Медицина',
  science: 'Наука',
  automotive: 'Автомобили',
  transport: 'Транспорт',
  politics: 'Политика',
};
