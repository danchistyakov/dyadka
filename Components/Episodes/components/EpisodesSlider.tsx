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
            initialSlide={1}
            freeMode={true}
            navigation={navigationEpisodes}
            breakpoints={breakpointsEpisodes}
            centeredSlidesBounds={true}
            centeredSlides={true}
            className={style.episodes}
          >
            <div className="swiper-button-prev episodes"></div>
            <div className="swiper-button-next episodes"></div>

            {data[season - 1].episodes.map((item, key) => (
              <SwiperSlide
                className={style.episode}
                key={key}
                //onClick={() => changeEpisode(item.number)}
              >
                <Link
                  href={{
                    pathname,
                    query: { ...query, season, episode: item.number },
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
                    //onError={Error}
                    wrapperClassName="error"
                    placeholderSrc="/putin.jpg"
                  />
                </Link>
                <p className={style.episode_number}>{item.number}-я серия</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    );
  }
);
export default EpisodesSlider;
