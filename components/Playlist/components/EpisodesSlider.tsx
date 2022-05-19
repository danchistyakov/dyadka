import {FC} from "react";
import style from "../styles/Playlist.module.scss";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation} from "swiper/core";
import {useEvent, useStore} from "effector-react/ssr";
import {breakpointsEpisodes} from "../utils/PlaylistSliderConfig";
import {$episode, $episodes, $playlistData, $season, setEpisode} from "@models/Playlist";
import {$kpId} from "@models/FilmData";

SwiperCore.use([Navigation]);

const navigationEpisodes = {
    nextEl: ".swiper-button-next.episodes",
    prevEl: ".swiper-button-prev.episodes",
};

const EpisodesSlider: FC = () => {
    const kpId = useStore($kpId);
    const episodes = useStore($episodes);
    const {season, episode} = useStore($playlistData);
    const setEpisodeFn = useEvent(setEpisode);

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

                    {episodes.map((item, key) => (
                        <SwiperSlide
                            className={style.episode}
                            key={key}
                            onClick={() => setEpisodeFn(item.episode)}
                        >
                            <LazyLoadImage
                                src={`https://8b1a9ed1-9ef0-4a16-9948-a5123b2947e7.selcdn.net/insecure/rs:fill:220:125/plain/https://blackmedia.top/media/${kpId}/preview_app_cinema_media_${kpId}_s${season}e${item.episode}.png`}
                                className={style.cover_section}
                                effect="blur"
                                alt=""
                                wrapperClassName="error"
                                placeholderSrc="/putin.jpg"
                            />
                            <p className={style.episode_number}>{item.episode}-я серия</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default EpisodesSlider;
