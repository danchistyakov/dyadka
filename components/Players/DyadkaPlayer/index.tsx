import { FC, useRef, KeyboardEvent } from 'react';
import { useEvent, useGate, useStore } from 'effector-react/ssr';
import {
  $player,
  negativePlaying,
  playerContainerGate,
  setBuffering,
  setDuration,
  setProgress,
} from '@models/Player';
import styles from './styles/DyadkaPlayer.module.scss';
import PlayerControls from '@store/PlayerControls';
import PlayerOptions from '@store/PlayerOptions';
import ReactPlayer from 'react-player';
import { isMobile } from 'react-device-detect';
import Icons from '../../../images/Icons';
import TopControls from './components/TopControls';
import BottomControls from './components/BottomControls';
import { setNextEpisode } from '@models/Playlist';
import { $url } from '@models/Video';
import { onKeyboard } from './utils/PlayerUtils';
import usePlayer from './hooks/usePlayer';
import { SpeedList } from '@constants/PlayerSettings';

let timer;

const DyadkaPlayer: FC = () => {
  const { isBuffering, isMuted, isPlaying, speed, volume } = useStore($player);
  const [negativePlayingFn, setBufferingFn, onDurationFn, onProgressFn, setNextEpisodeFn] =
    useEvent([negativePlaying, setBuffering, setDuration, setProgress, setNextEpisode]);
  const url = useStore($url);
  const playerContainerRef = useRef<HTMLInputElement | null>(null);
  useGate(playerContainerGate, playerContainerRef);
  const { onMouseMove, controlsRef, playerRef } = usePlayer();

  //useGate(PlayerGate);
  // const send = throttle(5000, () =>
  //   sendTime(
  //     Auth.user.email,
  //     Info.info.id,
  //     Playlist.season,
  //     Playlist.episode,
  //     Video.translation.id,
  //     Playlist.quality.id,
  //     PlayerControls?.currentTime
  //   )
  // );

  // PlayerControls.setCurrentDuration(
  //   playerRef.current ? playerRef.current.getDuration() : '00:00'
  // );
  /*useEffect(() => {
    continuePlaying(Auth.isAuth, Auth.user.email, Info.info.id);
  }, [Auth.isAuth, Auth.user.email, Info.info.id]);*/

  const handleSeekChange = (e, newValue: number) => {
    PlayerControls.setPlayed(newValue / 100);
    playerRef.current.seekTo(newValue / 100);
  };

  const onClickHandler = (e, action) => {
    clearTimeout(timer);
    if (e.detail === 1) {
      timer = setTimeout(() => negativePlayingFn(), 200);
    } else if (e.detail === 2) {
      if (action === 'rewind') {
        playerRef.current.getCurrentTime() > 5
          ? playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5)
          : playerRef.current.seekTo(0);
      }
      if (action === 'forward') {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
      }
    }
  };

  return (
    <section className={styles.container} ref={playerContainerRef}>
      <div
        className={styles.screen}
        tabIndex={0}
        onMouseMove={onMouseMove}
        onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => onKeyboard(e, playerRef)}
        onClick={(e) => onClickHandler(e, null)}
      >
        {isBuffering && (
          <div className={styles.player_loading}>
            <Icons icon='LoadingIcon' />
          </div>
        )}
        {PlayerOptions.error && (
          <div className='player_error'>
            <p className='error_text'>Пыня упаль, посылаем Пушистика за пакетами!</p>
            <Icons icon='LoadingIcon' />
          </div>
        )}
        {isMobile && (
          <div className='left_rewind' onClick={(e) => onClickHandler(e, 'rewind')}></div>
        )}
        <ReactPlayer
          url={url}
          muted={isMuted}
          playing={isPlaying}
          width={'100%'}
          height={'100%'}
          ref={playerRef}
          volume={1}
          playbackRate={SpeedList[speed].value}
          onDuration={onDurationFn}
          onProgress={onProgressFn}
          onEnded={setNextEpisodeFn}
          onBuffer={() => setBufferingFn(true)}
          onBufferEnd={() => setBufferingFn(false)}
        />
        {isMobile && (
          <div className='right_forward' onClick={(e) => onClickHandler(e, 'forward')}></div>
        )}
      </div>
      <div className={styles.controls} ref={controlsRef}>
        <TopControls />
        <BottomControls />
      </div>
    </section>
  );
};

export default DyadkaPlayer;
