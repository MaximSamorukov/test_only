import { YearsSlider } from './components/YearsSlider';
import { Title } from './components/Title';
import { ItemsSlider } from './components/ItemsSlider';
import s from './Container.module.scss';

export const Container = () => {
  return (
    <div className={s.mainContainer}>
      <div className={s.innerContainer}>
        <Title />
        <YearsSlider />
        <ItemsSlider />
      </div>
    </div>
  );
};
