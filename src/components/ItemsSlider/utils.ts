import { useMediaQuery } from 'react-responsive';

export const useGetMediaValues = () => {
  const maxWidth1440 = useMediaQuery({ query: '(max-width: 1400px)' });
  const maxWidth1220 = useMediaQuery({ query: '(max-width: 1220px)' });
  const maxWidth1000 = useMediaQuery({ query: '(max-width: 1000px)' });
  const maxWidth800 = useMediaQuery({ query: '(max-width: 800px)' });
  const maxWidth600 = useMediaQuery({ query: '(max-width: 600px)' });
  const maxWidth200 = useMediaQuery({ query: '(max-width: 200px)' });
  if (maxWidth200) {
    return {
      slidesPerView: 1,
      spaceBetween: 20,
      withControls: false,
    };
  }
  if (maxWidth600) {
    return {
      slidesPerView: 1,
      spaceBetween: 20,
      withControls: false,
    };
  }
  if (maxWidth800) {
    return {
      slidesPerView: 1,
      spaceBetween: 20,
      withControls: false,
    };
  }
  if (maxWidth1000) {
    return {
      slidesPerView: 2,
      spaceBetween: 20,
      withControls: true,
    };
  }
  if (maxWidth1220) {
    return {
      slidesPerView: 2,
      spaceBetween: 30,
      withControls: true,
    };
  }
  if (maxWidth1440) {
    return {
      slidesPerView: 3,
      spaceBetween: 40,
      withControls: true,
    };
  }
  return {
    slidesPerView: 3,
    spaceBetween: 50,
    withControls: true,
  };
};
