import {FC} from 'react';
import styles from '../styles/TopControls.module.scss';
import Translations from './Translations';
import {useStore} from 'effector-react/ssr';
import {$playlistData} from '@models/Playlist';
import {$data} from '@models/FilmData';

const TopControls: FC = () => {
  const {isSeries, title} = useStore($data);
  const {season, episode} = useStore($playlistData);

  return (
    <div className={styles.container}>
      <div className={styles.top_left}>
        <p className={styles.episode_info}>
          <p>{title}</p>
          {isSeries && <p>. Сезон {season}. Серия {episode}</p>}
        </p>
      </div>
      <Translations />
    </div>
  );
};

export default TopControls;