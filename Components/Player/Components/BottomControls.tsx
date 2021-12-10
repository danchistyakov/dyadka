import React, {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import Settings from "../../Settings";
import PlayerControls from "../../../Store/PlayerControls";
import Volume from "../../../Store/Volume";
import { observer } from "mobx-react-lite";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import styles from "../../../styles/BottomControls.module.scss";
import Icons from "../../../Images/Icons";
import formatTime from "../Hooks/formatTime";
import { useRouter } from "next/router";

interface BottomControlsProps {
  isPlaying: boolean;
  fullScreenHandle: any;
  handleSeekChange: (e: any, newValue: number) => void;
  //prevEpisode: (season: number, episode: number, setSeason) => void;
  //nextEpisode: () => void;
  setMuted: Dispatch<SetStateAction<boolean>>;
  setPirate: Dispatch<SetStateAction<boolean>>;
  setVolume: Dispatch<SetStateAction<number>>;
  volume: number;
}

const BottomControls: FC<BottomControlsProps> = observer(
  ({
    isPlaying,
    fullScreenHandle,
    handleSeekChange,
    /*prevEpisode,
    nextEpisode,*/
    setMuted,
    setPirate,
    setVolume,
    volume,
  }) => {
    const [remaining, setRemaining] = useState(false);
    const [slider, setSlider] = useState(false);
    const { query } = useRouter();
    const { season, episode } = query;

    const handleVolumeChange = (e) => {
      setVolume(e.target.value / 100);
    };

    const ValueLabelComponent = (props) => {
      const { children, open, value } = props;

      return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
          {children}
        </Tooltip>
      );
    };

    const PrettoSlider = withStyles({
      root: {
        height: 8,
      },
      thumb: {
        height: 16,
        width: 16,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        marginTop: -4,
        marginLeft: -8,
        "&:focus, &:hover, &$active": {
          boxShadow: "inherit",
        },
      },
      active: {},
      valueLabel: {
        left: "calc(-50% + 4px)",
      },
      track: {
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ff4f12",
      },
      rail: {
        height: 8,
        borderRadius: 4,
      },
    })(Slider);

    return (
      <div className={styles.bottom_part}>
        <PrettoSlider
          min={0}
          max={100}
          value={PlayerControls?.played * 100}
          ValueLabelComponent={(props) => (
            <ValueLabelComponent
              {...props}
              value={formatTime(PlayerControls?.currentTime)}
            />
          )}
          onChange={handleSeekChange}
        />

        <div className={styles.bottom_controls}>
          <div className={styles.bottom_left}>
            <Icons
              icon="SkipPreviousIcon"
              className={styles.bottom_icon}
              //onClick={prevEpisode}
            />
            {!isPlaying ? (
              <Icons
                icon="PlayArrowIcon"
                className={styles.bottom_icon}
                onClick={() => PlayerControls.setPlaying(true)}
              />
            ) : (
              <Icons
                icon="PauseIcon"
                className={styles.bottom_icon}
                onClick={() => PlayerControls.setPlaying(false)}
              />
            )}
            <Icons
              icon="SkipNextIcon"
              className={styles.bottom_icon}
              //onClick={nextEpisode}
            />
            <p
              className={styles.player_duration}
              onClick={() => setRemaining(!remaining)}
            >
              {!remaining
                ? formatTime(PlayerControls?.currentTime)
                : `-${formatTime(
                    PlayerControls?.currentDuration -
                      PlayerControls?.currentTime
                  )}`}{" "}
              / {formatTime(PlayerControls?.currentDuration)}
            </p>
          </div>
          <div className={styles.bottom_right}>
            <span>
              <Icons
                className={styles.bottom_icon}
                icon="ExternalPlayerIcon"
                onClick={() => {
                  setPirate(true);
                }}
              />
            </span>
            <div className="volume_controls">
              <span
                className="volume_icon"
                onMouseEnter={() => setSlider(true)}
                onMouseLeave={() => setSlider(false)}
              >
                {!PlayerControls?.mute ? (
                  <Icons
                    icon="VolumeUpIcon"
                    className={styles.bottom_icon}
                    onClick={() => setMuted(true)}
                    onMouseEnter={() => setSlider(true)}
                    onMouseLeave={() => setSlider(true)}
                  />
                ) : (
                  <Icons
                    icon="VolumeOffIcon"
                    className={styles.bottom_icon}
                    onClick={() => setMuted(false)}
                    onMouseEnter={() => setSlider(true)}
                    onMouseLeave={() => setSlider(false)}
                  />
                )}
              </span>
              {slider && (
                <span
                  //className="volume_slider"
                  className={styles.volume_slider}
                  onMouseEnter={() => setSlider(true)}
                  onMouseLeave={() => setSlider(false)}
                >
                  {/*<Slider
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e, newValue) => {
                      handleVolumeChange(e, newValue);
                    }}
                    orientation="vertical"
                    aria-labelledby="vertical-slider"
                  />*/}
                  <input
                    className={styles.volume_input}
                    type="range"
                    onChange={handleVolumeChange}
                    value={volume * 100}
                  />
                </span>
              )}
            </div>
            <Settings />
            <span>
              {!fullScreenHandle.active ? (
                <Icons
                  icon="FullscreenIcon"
                  className={styles.bottom_icon}
                  onClick={fullScreenHandle.enter}
                />
              ) : (
                <Icons
                  icon="FullscreenExitIcon"
                  className={styles.bottom_icon}
                  onClick={fullScreenHandle.exit}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

export default BottomControls;
