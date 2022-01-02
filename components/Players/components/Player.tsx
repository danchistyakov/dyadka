import React, { FC, useState, useEffect, useRef } from "react";
import { toJS } from "mobx";
import Playlist from "../../../Store/Playlist";
import Auth from "../../../Store/Auth";
import Info from "../../../Store/Info";
import PlayerControls from "../../../Store/PlayerControls";
import PlayerOptions from "../../../Store/PlayerOptions";
import { observer } from "mobx-react-lite";
import ReactPlayer from "react-player";
import { FullScreen } from "react-full-screen";
import GetUrl from "../hooks/GetUrl";
import Video from "../../../Store/Video";
import { isMobile } from "react-device-detect";
import Volume from "../../../Store/Volume";
import Icons from "../../../Images/Icons";
import { throttle } from "throttle-debounce";
import PiratePlayer from "./PiratePlayer";
import sendTime from "../hooks/sendTime";
import Controls from "../Controls";
import { PlayerProps } from "../interfaces/IPlayer";
import { useRouter } from "next/router";

var timer;

const Player: FC<PlayerProps> = ({
  data,
  fullScreenHandle,
  isBuffering,
  isMuted,
  isPirate,
  isPlaying,
  handleBuffering,
  handleMute,
  handlePirate,
  handlePlaying,
  handleVolume,
  prevEpisode,
  nextEpisode,
  url,
  volume,
}) => {
  const { query } = useRouter();
  const { season, episode } = query;

  const [count, setCount] = useState(1);
  const playerContainer = useRef(null);
  const playerRef = useRef(null);
  const controlsRef = useRef(null);
  const send = throttle(5000, () =>
    sendTime(
      Auth.user.email,
      Info.info.id,
      Playlist.season,
      Playlist.episode,
      Video.translation.id,
      Playlist.quality.id,
      PlayerControls?.currentTime
    )
  );

  PlayerControls.setCurrentDuration(
    playerRef.current ? playerRef.current.getDuration() : "00:00"
  );

  /*useEffect(() => {
    continuePlaying(Auth.isAuth, Auth.user.email, Info.info.id);
  }, [Auth.isAuth, Auth.user.email, Info.info.id]);*/

  useEffect(() => {
    const Quality = async () => {
      if (Playlist.quality?.id) {
        const id = Number(Playlist.quality.id);
        const videos = toJS(Video?.urls);
        const time = PlayerControls?.currentTime;
        Video.setUrl(videos[id].urls[0]);
        PlayerOptions.setBuffering(true);
        if (time) {
          setTimeout(() => playerRef.current?.seekTo(time), 1000);
        }
        PlayerOptions.setBuffering(false);
      }
    };
    Quality();
  }, [Playlist.quality?.id]);

  const handleKeys = (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      PlayerControls.setPlaying(!PlayerControls?.playing);
    }

    if (e.code === "ArrowLeft") {
      e.preventDefault();
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
    }

    if (e.code === "ArrowRight") {
      e.preventDefault();
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
    }

    if (e.code === "ArrowUp") {
      e.preventDefault();
      PlayerControls.setMute(false);
      if (Volume.volume <= 0.95) {
        Volume.setVolume((Number(Volume.volume) + 0.05).toFixed(2));
      } else {
        Volume.setVolume(1);
      }
    }

    if (e.code === "ArrowDown") {
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
    controlsRef.current.style.visibility = "visible";
    document.body.style.cursor = "auto";
    setCount(0);
  };

  const handleProgress = async (data) => {
    PlayerControls.setPlayed(parseFloat(data?.played));
    PlayerControls.setCurrentTime(data?.playedSeconds);
    if (Auth.isAuth) {
      send();
    }
    if (count > 3 && fullScreenHandle.active) {
      controlsRef.current.style.visibility = "hidden";
      document.body.style.cursor = "none";
    }

    if (
      controlsRef.current.style.visibility === "visible" &&
      fullScreenHandle.active
    ) {
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
      timer = setTimeout(() => handlePlaying(!isPlaying), 200);
    } else if (e.detail === 2) {
      if (action === "rewind") {
        playerRef.current.getCurrentTime() > 5
          ? playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5)
          : playerRef.current.seekTo(0);
      }
      if (action === "forward") {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
      }
    }
  };

  return (
    <section>
      {!isPirate ? (
        <FullScreen
          handle={fullScreenHandle}
          className="player"
          //ref={playerContainer}
          //tabIndex={0}
          /*onKeyDown={(e) => {
            handleKeys(e);
          }}*/
        >
          <div
            className="player_screen"
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
                onClick={(e) => onClickHandler(e, "rewind")}
              ></div>
            )}
            <ReactPlayer
              url={url}
              muted={isMuted}
              playing={isPlaying}
              width={"100%"}
              height={"100%"}
              style={{ margin: "auto" }}
              ref={playerRef}
              volume={volume / 100}
              playbackRate={Playlist?.speed}
              onProgress={handleProgress}
              onEnded={() => nextEpisode(Number(season), Number(episode))}
              onBuffer={() => handleBuffering(true)}
              onBufferEnd={() => handleBuffering(false)}
            />
            {isMobile && (
              <div
                className="right_forward"
                onClick={(e) => onClickHandler(e, "forward")}
              ></div>
            )}
          </div>
          <div className="controls" ref={controlsRef}>
            <Controls
              data={data}
              fullScreenHandle={fullScreenHandle}
              isMuted={isMuted}
              isPlaying={isPlaying}
              handleMute={handleMute}
              handlePirate={handlePirate}
              handlePlaying={handlePlaying}
              handleSeekChange={handleSeekChange}
              handleVolume={handleVolume}
              prevEpisode={prevEpisode}
              nextEpisode={nextEpisode}
              volume={volume}
            />
          </div>
        </FullScreen>
      ) : (
        <PiratePlayer
          kpId={Info.info.kp_id}
          season={Number(season)}
          episode={Number(episode)}
          handlePirate={handlePirate}
        />
      )}
    </section>
  );
};

export default observer(Player);