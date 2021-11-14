import React, { useEffect, useState, useRef } from "react";
import style from "../styles/Filminfo.module.sass";
import Layout from "../Store/Layout";
//import YouTube from 'react-youtube';
import { Img } from "react-image";
import { observer } from "mobx-react-lite";
import Player from "./Player";
import Icons from "../Images/Icons";
import { isBrowser, isMobile } from "react-device-detect";
import axios from "axios";
import { API_URL } from "../Components/Cabinet/http";
import Auth from "../Store/Auth";
import AuthPopup from "./Cabinet/AuthPopup";

const FilmInfo = observer(({ info, trailer }) => {
  const [favorite, setFavorite] = useState(false);
  const [width, setWidth] = useState(null);
  const [background, setBackground] = useState("poster");
  const [fallback, setFallback] = useState(false);
  const [authError, setAuthPopup] = useState(false);

  const handleWatch = () => {
    Layout.setWatch(true);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem("token")) {
        await Auth.checkAuth();
      }
    };

    checkAuth();
  }, [info.id]);

  useEffect(() => {
    const Favorite = async () => {
      if (Auth.isAuth) {
        const { data } = await axios.post(
          `${API_URL}/favorites`,
          {
            action: "check",
            email: "4i.danila@gmail.com",
            id: info.id,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        setFavorite(data.exists);
      }
    };
    Favorite();
  }, [info.id, Auth.isAuth]);

  const Fav = async () => {
    if (!Auth.isAuth) {
      return setAuthPopup(true);
    }

    if (!favorite) {
      const { data } = await axios.post(
        `${API_URL}/favorites`,
        {
          action: "add",
          email: "4i.danila@gmail.com",
          id: info.id,
          poster: `https://kinopoiskapiunofficial.tech/images/posters/kp_small/${info.kp_id}.jpg`,
          title: info.title,
          slug: info.slug,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (data.success) {
        setFavorite(true);
      }
    } else if (favorite) {
      const { data } = await axios.post(
        `${API_URL}/favorites`,
        {
          action: "remove",
          email: "4i.danila@gmail.com",
          id: info.id,
          poster: `https://kinopoiskapiunofficial.tech/images/posters/kp_small/${info.kp_id}.jpg`,
          title: info.title,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
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
      {authError && <AuthPopup setAuthPopup={setAuthPopup} />}
      <div className={`${style.screen} ${expand ? style.expand : ""}`}>
        {!Layout?.watch ? (
          <div className={style.preview} key={info.kp_id}>
            {!trailer && isBrowser && (
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
            {trailer && isBrowser && (
              <iframe
                width="900"
                height="506"
                className={style.trailer}
                src={`https://www.youtube.com/embed/${trailer}?autoplay=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&loop=1&rel=0&modestbranding=1&showinfo=0&start=5&mute=1&playlist=${trailer}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}
            {isMobile && (
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
            )}
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
        <h1 className={style.film_title}>{info.title} смотреть онлайн</h1>
        <div>
          <p className={style.film_eng_title}>{info.origtitle}</p>
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
