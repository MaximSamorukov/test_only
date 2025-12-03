import styles from './Container.module.scss';
import { YearsSlider } from './components/YearsSlider';
import { Title } from './components/Title';
import { ItemsSlider } from './components/ItemsSlider';

export const Container = () => {
  return (
    <div className={styles.mainContainer}>
      <Title />
      <YearsSlider />
      <ItemsSlider />
    </div>
  );
};
