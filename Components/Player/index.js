import React, { useState, useEffect, useRef } from "react";
import TopControls from "../TopControls";
import BottomControls from "../BottomControls";
import axios from "axios";
import { toJS } from "mobx";
import Playlist from "../../Store/Playlist";
import Auth from "../../Store/Auth";
import Info from "../../Store/Info";
import PlayerControls from "../../Store/PlayerControls";
import PlayerOptions from "../../Store/PlayerOptions";
import { observer } from "mobx-react-lite";
import ReactPlayer from "react-player";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { GetUrl } from "../GetUrl";
import Video from "../../Store/Video";
import { isMobile } from "react-device-detect";
import Volume from "../../Store/Volume";
import Icons from "../../Images/Icons";
import { throttle } from "throttle-debounce";

var timer;

const Player = observer(() => {
  const [count, setCount] = useState(1);
  const [pirate, setPirate] = useState(false);
  const playerContainer = useRef(null);
  const playerRef = useRef(null);
  const controlsRef = useRef(null);
  const video = useFullScreenHandle();
  const send = throttle(5000, () => sendTime(PlayerControls?.currentTime));

  PlayerControls.setCurrentDuration(
    playerRef.current ? playerRef.current.getDuration() : "00:00"
  );

  useEffect(() => {
    const videoInit = async () => {
      if (Auth.isAuth && Info.info.id) {
        const { data } = await axios.post(
          "http://localhost:5000/timestamp",
          {
            action: "get",
            email: Auth.user.email,
            id: Info.info.id,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (data.success) {
          const transName = toJS(Playlist.translations).find(
            (x) => x.id === data.info.translation
          ).name;
          console.log(transName);
          Video.setTranslation(data.info.translation, transName, null);
          if (Info.info.translations.default.id !== data.info.translation) {
            await GetUrl();
          }
          Playlist.setQuality(
            Video.urls[data.info.quality].quality,
            data.info.quality
          );
          playerRef.current.seekTo(data.info.time);
        } else {
          Video.setTranslation(
            info.translations.default.id,
            info.translations.default.name
          );
        }
      }
    };
    videoInit();
  }, [Info?.info?.id]);

  const sendTime = async (time) => {
    const { data } = axios.post(
      "http://localhost:5000/timestamp",
      {
        action: "add",
        email: Auth.user.email,
        id: Info.info.id,
        season: Playlist.season,
        episode: Playlist.episode,
        time,
        translation: Number(Video.translation.id),
        quality: Playlist.quality.id || 0,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  };

  useEffect(() => {
    const Quality = async () => {
      if (Playlist.quality?.id !== null && Playlist.quality?.id !== undefined) {
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

  const prevEpisode = async () => {
    if (Playlist?.season !== 1 && Playlist?.episode !== 1) {
      Video.setUrl(null);
    } else {
      playerRef.current.seekTo(0);
    }

    if (Playlist?.episode > 1) {
      Playlist.setEpisode(Number(Playlist?.episode) - 1);
      await GetUrl();
      PlayerControls.setPlaying(true);
    } else {
      if (Playlist?.season > 1) {
        Playlist.setSeason(Number(Playlist?.season) - 1);
        Playlist.setEpisode(1);
        await GetUrl();
        PlayerControls.setPlaying(true);
      }
    }
  };

  const nextEpisode = async () => {
    Video.setUrl(null);
    const playlist = toJS(Info?.info.seasons);
    if (Playlist?.episode < playlist[Playlist?.season - 1].episodes.length) {
      Playlist.setEpisode(Number(Playlist?.episode) + 1);
      await GetUrl();
      PlayerControls.setPlaying(true);
    } else {
      if (Playlist?.season < playlist.length) {
        Playlist.setSeason(Number(Playlist?.season) + 1);
        Playlist.setEpisode(1);
        await GetUrl();
        PlayerControls.setPlaying(true);
      }
    }
  };

  useEffect(() => {
    if (pirate) {
      const script = document.createElement("script");
      script.src = "//yohoho.cc/yo.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [Info.info?.kp_id, pirate]);

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
            <TopControls />
            <BottomControls
              video={video}
              handleSeekChange={handleSeekChange}
              prevEpisode={prevEpisode}
              nextEpisode={nextEpisode}
              setPirate={setPirate}
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
