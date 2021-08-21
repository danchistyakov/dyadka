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
//OF: https://strm.yandex.ru/vh-kp-converted/ott-content/14997747280932738777/hls/ysign1=ddc3711040b0655a9ee5f109c6743fbef84e6f5db2a6589b7f25514c258fb86f,abcID=1358,from=ott-kp,pfx,sfx,ts=612c954d/master_sdr_hd_avc_aac.m3u8?gzip=1
//UN: https://strm.yandex.ru/vh-kp-converted/ott-content/14997747280932738777/hls/ysign1=23d893fa3b77f42574c60a264d4dc3390f95fb24a4ecb8e805ec8e3d7e1e84bc,abcID=1358,from=ott-kp,pfx,sfx,ts=61050615/master_sdr_hd_avc_aac.m3u8?from=discovery&chunks=1&vsid=426fb41c77bbe07751e422c4b64aeba60f7131107342xWEBx6101x1627810205&t=1627810225108
const FilmInfo = observer(({ info }) => {
  console.log(info);
  const rezka = info.hdrezka;
  const kp = info.kinopoisk;

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
          id: rezka,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      data.exists ? setFavorite(true) : setFavorite(false);
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
  }, [rezka]);

  const Fav = async () => {
    if (!favorite) {
      const { data } = await axios.post(
        `${API_URL}/favorite`,
        {
          action: "add",
          email: "4i.danila@gmail.com",
          id: rezka,
          poster: `https://kinopoiskapiunofficial.tech/images/posters/kp_small/${kp}.jpg`,
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
          id: rezka,
          poster: `https://kinopoiskapiunofficial.tech/images/posters/kp_small/${kp}.jpg`,
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
  console.log(toJS(Info?.info));
  return (
    <section className={style.film_hero}>
      <div className={`${style.screen} ${expand ? style.expand : ""}`}>
        {!Layout?.watch ? (
          <div className={style.preview} key={kp}>
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
            {background === "video" &&
              isBrowser &&
              Info?.details?.videoURL?.hd !== undefined && (
                <ReactPlayer
                  url={
                    "https://strm.yandex.ru/vh-kp-converted/ott-content/14997747280932738777/hls/ysign1=ddc3711040b0655a9ee5f109c6743fbef84e6f5db2a6589b7f25514c258fb86f,abcID=1358,from=ott-kp,pfx,sfx,ts=612c954d/master_sdr_hd_avc_aac.m3u8?gzip=1"
                  }
                  muted={true}
                  playing={true}
                  loop={true}
                  volume={0}
                  width={"100vw"}
                  height={"140%"}
                  onError={() => setBackground("poster")}
                />
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
        <h1 className={style.film_title}>{info.title} смотреть онлайн</h1>
        <div>
          <p className={style.film_eng_title}>{info.origtitle}</p>
        </div>
        <div>
          {Info?.info?.year ? (
            <div className={style.film_info}>
              {
                <p>
                  {Info?.info?.year && <>{Info?.info?.year.slice(0, 4)} • </>}
                  {/*Info?.kp?.data?.premiereWorldCountry !== null && (<>{Info?.kp?.data?.premiereWorldCountry} • </>)*/}
                  {Info?.info?.genre !== undefined && (
                    <>{Info?.info?.genre} • </>
                  )}
                  {Info?.info?.country !== undefined && (
                    <>{Info?.info?.country} • </>
                  )}
                  {Info?.info?.ageLimits !== undefined && (
                    <>{Info?.info?.ageLimits}+</>
                  )}
                </p>
              }
            </div>
          ) : (
            <Skeleton
              className={style.film_info_loader}
              count={1}
              duration={2}
            />
          )}
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
