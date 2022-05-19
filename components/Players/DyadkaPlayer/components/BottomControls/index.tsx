import { FC, useState } from 'react';
import Settings from './Settings';
import styles from './styles/BottomControls.module.scss';
import Icons from '@images/Icons';
import { useStore } from 'effector-react/ssr';
import { $player, toggleFullscreen, setMute, setPirate, setPlaying } from '@models/Player';
import { setNextEpisode, setPrevEpisode } from '@models/Playlist';
import { useEvent } from 'effector-react/ssr';
import ProgressBar from './ProgressBar';
import { formatTime } from '../../utils/PlayerUtils';

const BottomControls: FC = () => {
  const { duration, isFullscreen, isMuted, isPlaying, progress, volume } = useStore($player);
  const [toggleFullscreenFn, setPrevEpisodeFn, setNextEpisodeFn, setPlayingFn] = useEvent([
    toggleFullscreen,
    setPrevEpisode,
    setNextEpisode,
    setPlaying,
  ]);
  const [remaining, setRemaining] = useState(false);
  const [slider, setSlider] = useState(false);
  const [settingsPopup, setSettingsPopup] = useState(false);
console.log(progress)
  return (
    <div className={styles.root}>
      <ProgressBar />
      <div className={styles.controls}>
        <div className={styles.bottom_left}>
          <Icons icon='SkipPreviousIcon' className={styles.icon} onClick={setPrevEpisodeFn} />
          <Icons
            icon={!isPlaying ? 'PlayArrowIcon' : 'PauseIcon'}
            className={styles.icon}
            onClick={() => setPlayingFn(!isPlaying)}
          />
          <Icons icon='SkipNextIcon' className={styles.icon} onClick={setNextEpisodeFn} />
          <p className={styles.player_duration} onClick={() => setRemaining(!remaining)}>
            {!remaining
              ? progress.playedFormatted
              : //: `-${formatTime(PlayerControls?.currentDuration - PlayerControls?.currentTime)}`}
                `-${formatTime(0 - 0)}`}
            &nbsp;/ {duration}
          </p>
        </div>
        <div className={styles.bottom_right}>
          <span>
            <Icons
              className={styles.icon}
              icon='ExternalPlayerIcon'
              onClick={() => setPirate(true)}
            />
          </span>
          <div className='volume_controls'>
            <span>
              <Icons
                icon={!isMuted ? 'VolumeUpIcon' : 'VolumeOffIcon'}
                className={styles.icon}
                onClick={() => setMute(!isMuted)}
                onMouseEnter={() => setSlider(true)}
                onMouseLeave={() => setSlider(true)}
              />
            </span>
            {slider && (
              <span
                className={styles.volume_slider}
                onMouseEnter={() => setSlider(true)}
                onMouseLeave={() => setSlider(false)}
              >
                <input
                  className={styles.volume_input}
                  type='range'
                  //onChange={handleVolume}
                  value={volume}
                />
              </span>
            )}
          </div>
          <span>
            <Icons
              icon='SettingsIcon'
              className={styles.icon}
              onClick={(e) => {
                e.stopPropagation();
                setSettingsPopup((prev) => !prev);
              }}
            />
          </span>
          {settingsPopup && <Settings onClose={() => setSettingsPopup(false)} />}
          <span>
            <Icons
              icon={!isFullscreen ? 'FullscreenIcon' : 'FullscreenExitIcon'}
              className={styles.icon}
              onClick={toggleFullscreenFn}
            />
          </span>
        </div>
      </div>
    </div>
  );
};
export default BottomControls;
