import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "../styles/Playlist.module.scss";
import { useEvent, useStore } from "effector-react/ssr";
import { $season, setSeason } from "@models/Playlist";
import { breakpointsSeasons } from "../utils/PlaylistSliderConfig";
import { $seasons } from "@models/FilmData";

const navigationSeasons = {
  nextEl: ".swiper-button-next.seasons",
  prevEl: ".swiper-button-prev.seasons",
};

const SeasonsSlider: FC = () => {
  const seasons = useStore($seasons);
  const currentSeason = useStore($season);
  const onSeason = useEvent(setSeason);

  return (
    <>
      <Swiper
        breakpoints={breakpointsSeasons(seasons)}
        centeredSlides={true}
        centeredSlidesBounds={true}
        className={styles.seasons}
        initialSlide={1}
        navigation={navigationSeasons}
      >
        <div className="swiper-button-prev seasons"></div>
        <div className="swiper-button-next seasons"></div>
        {seasons.map((res) => (
          <SwiperSlide
            className={styles.season_block}
            key={res.season}
            onClick={() => onSeason(res.season)}
          >
            <p
              className={`${styles.season}${
                res.season === currentSeason ? ` ${styles.active}` : ""
              }`}
            >
              {res.season}-й сезон
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SeasonsSlider;
