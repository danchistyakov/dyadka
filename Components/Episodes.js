import React, { useState, useEffect } from "react";
import style from "../styles/Episodes.module.sass";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Playlist from "../Store/Playlist";
import Info from "../Store/Info";
import Layout from "../Store/Layout";
import { observer } from "mobx-react-lite";
import { get } from "idb-keyval";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { GetUrl } from "./GetUrl";

SwiperCore.use([Navigation]);

const navigationSeasons = {
  nextEl: ".swiper-button-next.seasons",
  prevEl: ".swiper-button-prev.seasons",
};

const navigationEpisodes = {
  nextEl: ".swiper-button-next.episodes",
  prevEl: ".swiper-button-prev.episodes",
};

const Episodes = observer(({ info }) => {
  const [season, setSeason] = useState(null);
  const [error, setError] = useState();
  const [length, setLength] = useState(9);

  useEffect(() => {
    setLength(Info?.playlist?.length < 9 ? Info?.playlist?.length : 9);
  }, [Info?.playlist?.length]);

  const breakpointsSeasons = {
    320: { slidesPerView: 3.5 },
    768: {
      slidesPerView:
        Info?.details?.totalSeasons < 9 ? Info?.details?.totalSeasons : 9,
    },
  };
  const breakpointsEpisodes = {
    320: { slidesPerView: 1.8 },
    768: { slidesPerView: 4.9 },
  };

  useEffect(() => {
    const Season = async () => {
      var Info = await get("Длительность");
      if (info.kp_id && Info) {
        var search = Info?.findIndex(
          (item) => item?.kinopoisk_id === info.kp_id
        );

        if (search !== -1) {
          setSeason(Number(Info[search]?.season));
          Playlist.setSeason(Info[search]?.season);
          Playlist.setEpisode(Info[search]?.episode);
        } else {
          setSeason(1);
          Playlist.setSeason(1);
          Playlist.setEpisode(1);
        }
      } else {
        setSeason(1);
        Playlist.setSeason(1);
        Playlist.setEpisode(1);
      }
    };
    Season();
  }, [info.kp_id]);

  const Error = () => {
    setError("error");
  };

  return (
    <section className={style.nav_section}>
      <Swiper
        initialSlide={Playlist?.season ? Playlist?.season - 1 : 1}
        freeMode={true}
        navigation={navigationSeasons}
        breakpoints={breakpointsSeasons}
        centeredSlidesBounds={true}
        centeredSlides={true}
        className={style.seasons}
      >
        <div className="swiper-button-prev seasons"></div>
        <div className="swiper-button-next seasons"></div>
        {info.seasons.map((res, key) => (
          <SwiperSlide
            className={style.season_block}
            key={season + key}
            onClick={() => {
              setSeason(res.season);
              setError();
            }}
          >
            {console.log(res.season)}

            <p
              className={`${style.season}${
                res.season === season ? ` ${style.active}` : ""
              }`}
            >
              {res.season}-й сезон
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={style.episodes_section} key={Playlist?.episode}>
        <Swiper
          initialSlide={
            Playlist?.season === season && Playlist?.episode !== null
              ? Playlist?.episode - 1
              : 0
          }
          freeMode={true}
          navigation={navigationEpisodes}
          breakpoints={breakpointsEpisodes}
          centeredSlidesBounds={true}
          centeredSlides={true}
          className={style.episodes}
        >
          <div className="swiper-button-prev episodes"></div>
          <div className="swiper-button-next episodes"></div>

          {info?.seasons[season - 1]?.episodes.map((episode, key) => (
            <SwiperSlide
              className={style.episode}
              key={key}
              onClick={() => {
                Playlist.setSeason(season);
                Playlist.setEpisode(episode);
                GetUrl();
                Layout.setWatch(true);
                window.scrollTo(0, 0);
              }}
            >
              <LazyLoadImage
                src={`https://cdn.statically.io/img/blackmedia.top/f=auto,q=80/media/${info.kp_id}/preview_app_cinema_media_${info.kp_id}_s${season}e${episode}.png`}
                className={style.cover_section}
                effect="blur"
                alt=""
                onError={Error}
                wrapperClassName={error}
                placeholderSrc={`https://cdn.statically.io/img/kinopoiskapiunofficial.tech/blackmedia.top/f=auto,q=100/images/posters/kp_small/${info.kp_id}.jpg`}
              />
              <p className={style.episode_number}>{episode}-я серия</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
});
export default Episodes;
