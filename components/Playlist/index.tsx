import {FC} from 'react';
import styles from './styles/Playlist.module.scss';
import SwiperCore, {Navigation} from 'swiper/core';
import SeasonsSlider from './components/SeasonsSlider';
import EpisodesSlider from './components/EpisodesSlider';

SwiperCore.use([Navigation]);

const Playlist: FC = () => {
  return (
    <section className={styles.container}>
      <SeasonsSlider />
      <EpisodesSlider />
    </section>
  );
};
export default Playlist;
