import {FC} from 'react';
import style from '../styles/Playlist.module.scss';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation} from 'swiper/core';
import {useEvent, useStore} from 'effector-react/ssr';
import {breakpointsEpisodes} from '@app/utils/PlaylistSliderConfig';
import {$episode, $episodes, setEpisode} from '@models/Playlist';

SwiperCore.use([Navigation]);

const navigationEpisodes = {
  nextEl: '.swiper-button-next.episodes',
  prevEl: '.swiper-button-prev.episodes',
};

const EpisodesSlider: FC = () => {
  const episodes = useStore($episodes)
  const episode = useStore($episode);
  const setEpisodeFn = useEvent(setEpisode)

  return (
    <section>
      <div className={style.episodes_section}>
        <Swiper
          breakpoints={breakpointsEpisodes(episodes)}
          centeredSlides={true}
          centeredSlidesBounds={true}
          className={style.episodes}
          initialSlide={episode - 1}
          navigation={navigationEpisodes}
        >
          <div className="swiper-button-prev episodes"></div>
          <div className="swiper-button-next episodes"></div>

          {episodes.map(
            (item, key) => (
              <SwiperSlide
                className={style.episode}
                key={key}
                onClick={() => setEpisodeFn(item.episode)}
              >
                <LazyLoadImage
                  src={item.poster}
                  className={style.cover_section}
                  effect="blur"
                  alt=""
                  wrapperClassName="error"
                  placeholderSrc="/putin.jpg"
                />
                <p className={style.episode_number}>{item.episode}-я серия</p>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default EpisodesSlider;
