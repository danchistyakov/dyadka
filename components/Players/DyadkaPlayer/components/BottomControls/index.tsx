import { FC, useState } from 'react';
import Settings from './Settings';
import PlayerControls from '@store/PlayerControls';
import { observer } from 'mobx-react-lite';
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

  return (
    <div className={styles.bottom_part}>
      <ProgressBar />
      <div className={styles.bottom_controls}>
        <div className={styles.bottom_left}>
          <Icons icon='SkipPreviousIcon' className={styles.icon} onClick={setPrevEpisodeFn} />
          {!isPlaying ? (
            <Icons
              icon='PlayArrowIcon'
              className={styles.icon}
              onClick={() => setPlayingFn(true)}
            />
          ) : (
            <Icons icon='PauseIcon' className={styles.icon} onClick={() => setPlayingFn(false)} />
          )}
          <Icons icon='SkipNextIcon' className={styles.icon} onClick={setNextEpisodeFn} />
          <p className={styles.player_duration} onClick={() => setRemaining(!remaining)}>
            {!remaining
              ? progress.playedFormatted
              : `-${formatTime(
                  PlayerControls?.currentDuration - PlayerControls?.currentTime
                )}`}{' '}
            / {duration}
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
            <span
              className='volume_icon'
              onMouseEnter={() => setSlider(true)}
              onMouseLeave={() => setSlider(false)}
            >
              {!isMuted ? (
                <Icons
                  icon='VolumeUpIcon'
                  className={styles.icon}
                  onClick={() => setMute(true)}
                  onMouseEnter={() => setSlider(true)}
                  onMouseLeave={() => setSlider(true)}
                />
              ) : (
                <Icons
                  icon='VolumeOffIcon'
                  className={styles.icon}
                  onClick={() => setMute(false)}
                  onMouseEnter={() => setSlider(true)}
                  onMouseLeave={() => setSlider(false)}
                />
              )}
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
            {!isFullscreen ? (
              <Icons icon='FullscreenIcon' className={styles.icon} onClick={toggleFullscreenFn} />
            ) : (
              <Icons
                icon='FullscreenExitIcon'
                className={styles.icon}
                onClick={toggleFullscreenFn}
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
export default observer(BottomControls);
