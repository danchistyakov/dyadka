import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useEpisodes from "../hooks/useEpisodes";
import { SeasonsProps } from "../interfaces/IPlaylist";
import styles from "../styles/Playlist.module.scss";
import EpisodesSlider from "./EpisodesSlider";

const navigationSeasons = {
  nextEl: ".swiper-button-next.seasons",
  prevEl: ".swiper-button-prev.seasons",
};

const SeasonsSlider: FC<SeasonsProps> = ({
  breakpointsSeasons,
  data,
  season,
  setSeason,
}) => {
  return (
    <>
      <Swiper
        breakpoints={breakpointsSeasons}
        centeredSlides={true}
        centeredSlidesBounds={true}
        className={styles.seasons}
        initialSlide={1}
        navigation={navigationSeasons}
      >
        <div className="swiper-button-prev seasons"></div>
        <div className="swiper-button-next seasons"></div>
        {data.map((res) => (
          <SwiperSlide
            className={styles.season_block}
            key={res.season}
            onClick={() => setSeason(res.season)}
          >
            <p
              className={`${styles.season}${
                res.season === season ? ` ${styles.active}` : ""
              }`}
            >
              {res.season}-й сезон
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
      <EpisodesSlider {...useEpisodes(data, season)} />
    </>
  );
};

export default SeasonsSlider;
