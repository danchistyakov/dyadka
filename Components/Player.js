import React, { useState, useEffect, useRef } from "react";
import TopControls from "./TopControls";
import BottomControls from "./BottomControls";
import { toJS } from "mobx";
import Playlist from "../Store/Playlist";
import Info from "../Store/Info";
import PlayerControls from "../Store/PlayerControls";
import PlayerOptions from "../Store/PlayerOptions";
import { observer } from "mobx-react-lite";
import ReactPlayer from "react-player";
import { get, set } from "idb-keyval";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { GetUrl } from "./GetUrl";
import Video from "../Store/Video";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import Volume from "../Store/Volume";

var timer;

const Player = observer(() => {
  const [count, setCount] = useState(1);
  //const [last, setLast] = useState(null);
  const [pirate, setPirate] = useState(false);
  const playerContainer = useRef(null);
  const playerRef = useRef(null);
  const controlsRef = useRef(null);
  const video = useFullScreenHandle();

  //PlayerControls.setCurrentTime(playerRef.current ? playerRef.current.getCurrentTime() : '00:00');
  PlayerControls.setCurrentDuration(
    playerRef.current ? playerRef.current.getDuration() : "00:00"
  );

  useEffect(() => {
    const Last = async () => {
      Video.setUrl(null);
      PlayerOptions.setError(false);
      if ((await get("Длительность")) !== undefined) {
        var info = await get("Длительность");
        var search = info.findIndex(
          (item) => item?.kinopoisk_id === Info?.info?.kp
        );
        //search !== -1 && setLast(info[search]?.currentTime);
        info[search]?.quality !== undefined &&
          Playlist.setQuality(info[search]?.quality);
        //Playlist.setTranslation({ id: info[search]?.translationId, name: info[search]?.translationName })
      }
      PlayerOptions.setBuffering(true);
    };
    Last();
  }, [Info?.info?.kp]);

  useEffect(() => {
    const parsingUrl = async () => {
      await GetUrl();
    };

    parsingUrl();
  }, [Info?.info?.kp, Video?.translation?.id]);

  useEffect(() => {
    const Quality = async () => {
      PlayerOptions.setBuffering(true);
      if ((await get("Длительность")) !== undefined) {
        var info = await get("Длительность");
        var search = info.findIndex(
          (item) => item?.kinopoisk_id === Info?.info?.kp
        );
        search !== -1 && playerRef.current?.seekTo(info[search]?.currentTime);
      }
    };
    Quality();
  }, [Playlist?.quality]);

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

    if (count > 3 && video.active) {
      controlsRef.current.style.visibility = "hidden";
      document.body.style.cursor = "none";
    }

    if (controlsRef.current.style.visibility === "visible" && video.active) {
      setCount(count + 1);
    }
  };

  useEffect(() => {
    if (!video.active) {
      document.body.style.cursor = "auto";
    }
  }, [video.active]);

  const handleSeekChange = (e, newValue) => {
    PlayerControls.setPlayed(parseFloat(newValue / 100));
    playerRef.current.seekTo(newValue / 100);
  };

  const onClickHandler = (e, action) => {
    clearTimeout(timer);
    console.log(e);
    if (e.detail === 1) {
      timer = setTimeout(
        () => PlayerControls.setPlaying(!PlayerControls?.playing),
        200
      );
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

  useEffect(() => {
    if (Playlist?.last !== null) {
      playerRef.current.seekTo(Playlist?.last);
    }
  }, [Playlist?.last]);

  const prevEpisode = () => {
    if (Playlist?.season !== 1 && Playlist?.episode !== 1) {
      Video.setUrl(null);
    } else {
      playerRef.current.seekTo(0);
    }

    if (Playlist?.episode > 1) {
      Playlist.setEpisode(Number(Playlist?.episode) - 1);
      GetUrl();
      PlayerControls.setPlaying(true);
    } else {
      if (Playlist?.season > 1) {
        Playlist.setSeason(Number(Playlist?.season) - 1);
        Playlist.setEpisode(1);
        GetUrl();
        PlayerControls.setPlaying(true);
      }
    }
  };

  const nextEpisode = () => {
    Video.setUrl(null);
    const playlist = toJS(Info?.playlist);
    if (Playlist?.episode < playlist[Playlist?.season - 1].episodes.length) {
      Playlist.setEpisode(Number(Playlist?.episode) + 1);
      GetUrl();
      PlayerControls.setPlaying(true);
    } else {
      if (Playlist?.season < playlist.length) {
        Playlist.setSeason(Number(Playlist?.season) + 1);
        Playlist.setEpisode(1);
        GetUrl();
        PlayerControls.setPlaying(true);
      }
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//yohoho.cc/yo.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [Info.info.kp_id, pirate]);

  return (
    <section>
      {!pirate ? (
        <FullScreen
          handle={video}
          className="player"
          ref={playerContainer}
          tabIndex="0"
          onKeyDown={(e) => {
            handleKeys(e);
          }}
        >
          <div
            className="player_screen"
            tabIndex="0"
            onMouseMove={handleMouseMove}
            onKeyDown={(e) => {
              handleKeys(e);
            }}
            onClick={(e) => onClickHandler(e)}
          >
            {PlayerOptions.buffering && (
              <div className="player_loading">
                <svg className="icon_loading" viewBox="25 25 50 50">
                  <circle
                    className="icon_loading_front"
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    strokeWidth="5"
                    strokeMiterlimit="10"
                  ></circle>
                  <circle
                    className="icon_loading_back"
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    strokeWidth="5"
                    strokeMiterlimit="10"
                  ></circle>
                </svg>
              </div>
            )}
            {PlayerOptions.error && (
              <div className="player_error">
                <p className="error_text">
                  Пыня упаль, посылаем Пушистика за пакетами!
                </p>
                <svg className="icon_loading" viewBox="25 25 50 50">
                  <circle
                    className="icon_loading_front"
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    strokeWidth="5"
                    strokeMiterlimit="10"
                  ></circle>
                  <circle
                    className="icon_loading_back"
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    strokeWidth="5"
                    strokeMiterlimit="10"
                  ></circle>
                </svg>
              </div>
            )}
            {isMobile && (
              <div
                className="left_rewind"
                onClick={(e) => onClickHandler(e, "rewind")}
              ></div>
            )}
            <ReactPlayer
              url={Video?.url}
              muted={PlayerControls?.mute}
              playing={PlayerControls?.playing}
              width={"100%"}
              height={"100%"}
              style={{ margin: "auto" }}
              ref={playerRef}
              volume={Volume.volume}
              playbackRate={Playlist?.speed}
              onProgress={handleProgress}
              onEnded={nextEpisode}
              onBuffer={() => {
                PlayerOptions.setBuffering(true);
                PlayerControls.setPlaying(true);
              }}
              onBufferEnd={() => PlayerOptions.setBuffering(false)}
            />
            {isMobile && (
              <div
                className="right_forward"
                onClick={(e) => onClickHandler(e, "forward")}
              ></div>
            )}
          </div>
          <div className="controls" ref={controlsRef}>
            <TopControls setPirate={setPirate} />
            <BottomControls
              video={video}
              handleSeekChange={handleSeekChange}
              prevEpisode={prevEpisode}
              nextEpisode={nextEpisode}
            />
          </div>
        </FullScreen>
      ) : (
        <div key={Info?.info?.kp}>
          <div
            id="yohoho"
            className="player"
            data-kinopoisk={Info.info.kp_id}
            data-resize="1"
            data-season={Playlist?.season}
            data-episode={Playlist?.episode}
          ></div>
          <button className="inside_player" onClick={() => setPirate(false)}>
            Перейти в дядькин плеер
          </button>
        </div>
      )}
    </section>
  );
});

export default Player;
