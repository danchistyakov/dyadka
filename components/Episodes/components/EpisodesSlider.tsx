import { FC } from "react";
import style from "../styles/Playlist.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Playlist from "../../../Store/Playlist";
import { observer } from "mobx-react-lite";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { EpisodesProps } from "../interfaces/IPlaylist";
import Link from "next/link";
import { useRouter } from "next/router";

SwiperCore.use([Navigation]);

const navigationEpisodes = {
  nextEl: ".swiper-button-next.episodes",
  prevEl: ".swiper-button-prev.episodes",
};

const EpisodesSlider: FC<EpisodesProps> = observer(
  ({ breakpointsEpisodes, data, season, changeEpisode }) => {
    const { pathname, query } = useRouter();

    return (
      <section>
        <div className={style.episodes_section} key={season}>
          <Swiper
            breakpoints={breakpointsEpisodes}
            centeredSlides={true}
            centeredSlidesBounds={true}
            className={style.episodes}
            initialSlide={1}
            navigation={navigationEpisodes}
          >
            <div className="swiper-button-prev episodes"></div>
            <div className="swiper-button-next episodes"></div>

            {(data[season - 1]?.episodes || data[0]?.episodes).map(
              (item, key) => (
                <SwiperSlide
                  className={style.episode}
                  key={key}
                  onClick={() => changeEpisode(item.episode)}
                >
                  <Link
                    href={{
                      pathname,
                      query: { ...query, season, episode: item.episode },
                    }}
                    passHref
                    shallow
                    replace
                  >
                    <LazyLoadImage
                      src={item.poster}
                      className={style.cover_section}
                      effect="blur"
                      alt=""
                      wrapperClassName="error"
                      placeholderSrc="/putin.jpg"
                    />
                  </Link>
                  <p className={style.episode_number}>{item.episode}-я серия</p>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
      </section>
    );
  }
);
export default EpisodesSlider;
