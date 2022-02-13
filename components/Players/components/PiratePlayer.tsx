import {FC, useEffect} from 'react';
import {useStore} from 'effector-react/ssr';
import {$data} from '@models/FilmData';
import {$playlistData} from '@models/Playlist';
import {setPirate} from '@models/Player';

const PiratePlayer: FC = () => {
  const {kpId} = useStore($data);
  const {season, episode} = useStore($playlistData);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//yohoho.cc/yo.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [kpId]);

  return (
    <div>
      <div
        id="yohoho"
        className="player"
        data-button_limit="13"
        data-kinopoisk={kpId}
        data-resize="1"
        data-season={season}
        data-episode={episode}
        data-player="alloha,bazon,collaps,hdvb,iframe,kodik,pleer,torrent,trailer,ustore,videocdn,videospider"
        data-separator=","
      ></div>
      <button className="inside_player" onClick={() => setPirate(false)}>
        Перейти в дядькин плеер
      </button>
    </div>
  );
};

export default PiratePlayer;
