import {FC, useState, useEffect, useRef} from 'react';
import {useEvent, useGate, useStore} from 'effector-react/ssr';
import {
  $player,
  playerContainerGate,
  playerGate,
  setBuffering,
  setDuration,
  setPlaying,
  setProgress
} from '@models/Player';
import styles from './styles/DyadkaPlayer.module.scss';
import Auth from '@store/Auth';
import PlayerControls from '@store/PlayerControls';
import PlayerOptions from '@store/PlayerOptions';
import ReactPlayer from 'react-player';
import {isMobile} from 'react-device-detect';
import Volume from '@store/Volume';
import Icons from '../../../../images/Icons';
import sendTime from '../../hooks/sendTime';
import TopControls from './Controls/components/TopControls';
import BottomControls from './Controls/components/BottomControls';
import {setNextEpisode} from '@models/Playlist';
import {$url} from '@models/Video';


const DyadkaPlayer: FC = () => {
  let timer;
  const {isBuffering, isFullscreen, isMuted, isPlaying, speed, volume} = useStore($player);
  const [setBufferingFn, onDurationFn,onProgressFn, setNextEpisodeFn, setPlayingFn] = useEvent([setBuffering, setDuration, setProgress, setNextEpisode, setPlaying]);
  const url = useStore($url);
  const [count, setCount] = useState(1);
  const playerContainerRef = useRef(null);
  const playerRef = useRef(null);
  const controlsRef = useRef(null);
  useGate(playerContainerGate, playerContainerRef)
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

  const handleKeys = (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      PlayerControls.setPlaying(!PlayerControls?.playing);
    }

    if (e.code === 'ArrowLeft') {
      e.preventDefault();
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
    }

    if (e.code === 'ArrowRight') {
      e.preventDefault();
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
    }

    if (e.code === 'ArrowUp') {
      e.preventDefault();
      PlayerControls.setMute(false);
      if (Volume.volume <= 0.95) {
        Volume.setVolume((Number(Volume.volume) + 0.05).toFixed(2));
      } else {
        Volume.setVolume(1);
      }
    }

    if (e.code === 'ArrowDown') {
      e.preventDefault();
      if (Volume.volume >= 0.05) {
        Volume.setVolume(Number(Volume.volume - 0.05).toFixed(2));
      } else {
        Volume.setVolume(0);
        PlayerControls.setMute(true);
      }
    }
  };

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = 'visible';
    document.body.style.cursor = 'auto';
    setCount(0);
  };

  const handleProgress = async (data) => {
    PlayerControls.setPlayed(parseFloat(data?.played));
    PlayerControls.setCurrentTime(data?.playedSeconds);
    // if (Auth.isAuth) {
    //   send();
    // }
    if (count > 3 && isFullscreen) {
      controlsRef.current.style.visibility = 'hidden';
      document.body.style.cursor = 'none';
    }

    if (controlsRef.current.style.visibility === 'visible' && isFullscreen) {
      setCount(count + 1);
    }
  };

  const handleSeekChange = (e, newValue: number) => {
    PlayerControls.setPlayed(newValue / 100);
    playerRef.current.seekTo(newValue / 100);
  };

  const onClickHandler = (e, action) => {
    clearTimeout(timer);
    if (e.detail === 1) {
      timer = setTimeout(() => setPlayingFn(!isPlaying), 200);
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
        onMouseMove={handleMouseMove}
        onKeyDown={(e) => {
          handleKeys(e);
        }}
        onClick={(e) => onClickHandler(e, null)}
      >
        {isBuffering && (
          <div className="player_loading">
            <Icons icon="LoadingIcon" />
          </div>
        )}
        {PlayerOptions.error && (
          <div className="player_error">
            <p className="error_text">
              Пыня упаль, посылаем Пушистика за пакетами!
            </p>
            <Icons icon="LoadingIcon" />
          </div>
        )}
        {isMobile && (
          <div
            className="left_rewind"
            onClick={(e) => onClickHandler(e, 'rewind')}
          ></div>
        )}
        <ReactPlayer
          url={url}
          muted={isMuted}
          playing={isPlaying}
          width={'100%'}
          height={'100%'}
          //style={{margin: 'auto'}}
          ref={playerRef}
          volume={1}
          playbackRate={speed}
          onDuration={onDurationFn}
          onProgress={onProgressFn}
          onEnded={setNextEpisodeFn}
          onBuffer={() => setBufferingFn(true)}
          onBufferEnd={() => setBufferingFn(false)}
        />
        {isMobile && (
          <div
            className="right_forward"
            onClick={(e) => onClickHandler(e, 'forward')}
          ></div>
        )}
      </div>
      <div className="controls" ref={controlsRef}>
        <TopControls />
        <BottomControls />
      </div>
    </section>
  );
};

export default DyadkaPlayer;
