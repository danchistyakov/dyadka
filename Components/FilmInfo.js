import React, { useEffect, useState, useRef } from "react";
import style from "../styles/Filminfo.module.sass";
import Skeleton from "react-loading-skeleton";
import PlayerOptions from "../Store/PlayerOptions";
import { set, get } from "idb-keyval";
import Playlist from "../Store/Playlist";
import Info from "../Store/Info";
import Layout from "../Store/Layout";
//import YouTube from 'react-youtube';
import { Img } from "react-image";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import Player from "./Player";
import Icons from "../Images/Icons";
import Video from "../Store/Video";
import ReactPlayer from "react-player";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import axios from "axios";
import { API_URL } from "../Components/Cabinet/http";

const FilmInfo = observer(({ info, trailer }) => {
  const [favorite, setFavorite] = useState(false);
  const [width, setWidth] = useState(null);
  const [background, setBackground] = useState("video");
  const [fallback, setFallback] = useState(false);

  const handleWatch = () => {
    Layout.setWatch(true);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const Favorite = async () => {
      const { data } = await axios.post(
        `${API_URL}/favorite`,
        {
          action: "check",
          email: "4i.danila@gmail.com",
          id: info.id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setFavorite(data.exists);
    };
    Favorite();

    const easyWatch = async () => {
      var arr = await get("Длительность");
      var search = arr?.findIndex((item) => item?.kinopoisk_id === kp);
      try {
        if (
          arr[search]?.translationId !== undefined &&
          arr[search]?.translationName !== undefined
        ) {
          Video.setTranslation(
            arr[search]?.translationId,
            arr[search]?.translationName
          );
        } else {
          Video.setTranslation(null, null);
        }
      } catch (err) {
        Video.setTranslation(null, null);
      }
    };

    easyWatch();
  }, [info.id]);

  /*useEffect(() => {
    const Details = async () => {
      const response = await fetch(`/api/details?id=${info.kp_id}`);
      const result = await response.json();
      Info.setDetails(result.details);
    };
    Details();
  }, [info.kp_id]);*/

  const Fav = async () => {
    if (!favorite) {
      const { data } = await axios.post(
        `${API_URL}/favorite`,
        {
          action: "add",
          email: "4i.danila@gmail.com",
          id: info.id,
          poster: `https://kinopoiskapiunofficial.tech/images/posters/kp_small/${info.kp_id}.jpg`,
          title: Info?.info?.title,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (data.success) {
        setFavorite(true);
      }
    } else if (favorite) {
      const { data } = await axios.post(
        `${API_URL}/favorite`,
        {
          action: "remove",
          email: "4i.danila@gmail.com",
          id: info.id,
          poster: `https://kinopoiskapiunofficial.tech/images/posters/kp_small/${info.kp_id}.jpg`,
          title: Info?.info?.title,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (data.success) {
        setFavorite(false);
      }
    }
  };

  const expand = Layout?.watch ? true : false;

  return (
    <section className={style.film_hero}>
      <div className={`${style.screen} ${expand ? style.expand : ""}`}>
        {!Layout?.watch ? (
          <div className={style.preview} key={info.kp_id}>
            {background === "poster" && isBrowser && (
              <div className={style.hero_poster}>
                <picture className={style.hero_picture} key={fallback}>
                  <source
                    media="(max-width: 767px)"
                    srcSet={`https://cdn.statically.io/img/kinopoiskapiunofficial.tech/f=auto,q=50/images/posters/kp/${info.kp_id}.jpg`}
                  />
                  {!fallback ? (
                    <img
                      src={`https://cdn.statically.io/img/blackmedia.top/f=auto,q=50/media/${info.kp_id}/wide_app_cinema_media_${info.kp_id}.jpg`}
                      className={style.hero_poster_img}
                      onError={() => setFallback(true)}
                    />
                  ) : (
                    <img
                      src={"https://tangerine.gq/putin1.jpg"}
                      className={style.hero_poster_img}
                    />
                  )}
                </picture>
              </div>
            )}
            {background === "video" && isBrowser && (
              <iframe
                width="900"
                height="506"
                className={style.trailer}
                src={`https://www.youtube.com/embed/${trailer}?autoplay=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&loop=1&rel=0&modestbranding=1&showinfo=0&start=5&mute=1&playlist=${trailer}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}
            <MobileView>
              <picture className={style.hero_picture}>
                <source
                  media="(max-width: 767px)"
                  srcSet={`https://cdn.statically.io/img/blackmedia.top/f=auto,w=${width},q=100/media/${info.kp_id}/big_app_cinema_media_${info.kp_id}_big.jpg`}
                />
                <source
                  media="(min-width: 767px)"
                  srcSet={`https://cdn.statically.io/img/blackmedia.top/f=auto,w=${width},q=70/media/${info.kp_id}/wide_app_cinema_media_${info.kp_id}.jpg`}
                />
                <Img
                  src={[
                    `https://cdn.statically.io/img/blackmedia.top/f=auto,w=${width},q=70/media/${info.kp_id}/wide_app_cinema_media_${info.kp_id}.jpg`,
                    "https://tangerine.gq/putin1.jpg",
                  ]}
                  className={style.hero_poster_img}
                />
              </picture>
            </MobileView>
          </div>
        ) : (
          <div className={style.film_player}>
            <Player />
          </div>
        )}
      </div>
      <div className={style.film_content}>
        {!Layout?.watch && (
          <button className={style.film_info_watch} onClick={handleWatch}>
            <Icons className={style.film_info_icon} icon="PlayArrowIcon" />{" "}
            &nbsp;смотреть
          </button>
        )}
        {Info?.info?.title ? (
          <h1 className={style.film_title}>
            {Info?.info?.title} смотреть онлайн
          </h1>
        ) : (
          <>
            <Skeleton
              className={style.film_title_loader}
              count={1}
              duration={2}
            />
            <Skeleton
              className={style.film_subtitle_loader}
              count={1}
              duration={2}
              width={"70%"}
            />
          </>
        )}
        <div>
          <p className={style.film_eng_title}>{Info?.info?.etitle}</p>
        </div>
        <div>
          <div className={style.film_info}>
            <p>
              {info.year} • {info.genres} • {info.country} • {info.age}
            </p>
          </div>
        </div>
        <div className={style.rating_block}>
          <div className={style.rating_item}>
            <p className={style.rating_value}>{info.ratings.kinopoisk}</p>
            <p className={style.rating_name}>КиноПоиск</p>
          </div>
          <div className={style.rating_item}>
            <p className={style.rating_value}>{info.ratings.imdb}</p>
            <p className={style.rating_name}>IMDb</p>
          </div>
        </div>
        <div className={style.buttons_block}>
          {!favorite && (
            <button
              onClick={() => {
                Fav();
              }}
              className={style.film_info_button}
            >
              <Icons className={style.film_info_icon} icon="LikeIcon" />
            </button>
          )}
          {favorite && (
            <button
              onClick={() => {
                Fav();
              }}
              className={style.film_info_button}
            >
              <Icons className={style.film_info_icon} icon="LikeActiveIcon" />
            </button>
          )}
          <button className={style.film_info_button}>
            <Icons className={style.film_info_icon} icon="ShareIcon" />
          </button>
          <a href="https://my-files.su/Save/jmodpm/debug.json">
            <button className={style.film_info_button}>
              <Icons className={style.film_info_icon} icon="DownloadIcon" />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
});

export default FilmInfo;
