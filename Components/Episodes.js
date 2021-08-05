import React, { useState, useEffect } from 'react';
import style from '../styles/Episodes.module.sass';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Playlist from '../Store/Playlist';
import Info from '../Store/Info';
import PlayerOptions from '../Store/PlayerOptions';
import Layout from '../Store/Layout';
import { observer } from 'mobx-react-lite';
import { get } from 'idb-keyval';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper.min.css";
import SwiperCore, { Navigation } from "swiper/core";
import { GetUrl } from './GetUrl';

SwiperCore.use([Navigation]);

const navigationSeasons = {
    nextEl: '.swiper-button-next.seasons',
    prevEl: '.swiper-button-prev.seasons',
}

const navigationEpisodes = {
    nextEl: '.swiper-button-next.episodes',
    prevEl: '.swiper-button-prev.episodes',
}

const Episodes = observer(() => {

    const [season, setSeason] = useState(null);
    const [error, setError] = useState();
    const [length, setLength] = useState(9);

    useEffect(() => {
        Info?.playlist?.length !== undefined && setLength(Info?.playlist?.length < 9 ? Info?.playlist?.length : 9)
    }, [Info?.playlist?.length])

    const breakpointsSeasons = { 320: { slidesPerView: 3.5 }, 768: { slidesPerView: length } };
    const breakpointsEpisodes = { 320: { slidesPerView: 1.8 }, 768: { slidesPerView: 4.9 } };

    useEffect(() => {
        const Season = async () => {
            var info = await get('Длительность');
            if (info?.length !== undefined && Info?.info?.kp !== undefined) {
                var search = info.findIndex(item => item?.kinopoisk_id === Info?.info?.kp);
                if (search !== -1) {
                    setSeason(Number(info[search]?.season));
                    Playlist.setSeason(info[search]?.season);
                    Playlist.setEpisode(info[search]?.episode);
                    //setSeason(info[search]?.season);

                } else {
                    setSeason(1);
                    Playlist.setSeason(1);
                    Playlist.setEpisode(1);
                }
            }

            if (info?.length === undefined && Info?.info?.kp !== undefined) {
                setSeason(1);
                Playlist.setSeason(1);
                Playlist.setEpisode(1);
            }
        }
        Season();
    }, [Info?.info?.kp])

    const Error = () => {
        setError('error')
    }

    useEffect(() => {
        if (Info?.info?.kp !== undefined) {
            const Fetch = async () => {
                const response = await fetch(`https://api.alloha.tv/?token=04941a9a3ca3ac16e2b4327347bbc1&kp=${Info?.info?.kp}`);
                const data = await response.json();
                const seasons = data.data.seasons;
                const result = Object.keys(seasons).map((key) => (
                    {
                        episodes: Object.keys(seasons[key].episodes).map((res) => (
                            seasons[key].episodes[res]
                        )),
                        season: Number(key)
                    }
                ));
                Info.setPlaylist(result);
            }

            Fetch();
        }
    }, [Info?.info?.kp])

    return (
        <SkeletonTheme color="#202020" highlightColor="#444">
            <section className={style.nav_section} key={[length, Playlist?.season]}>
                {Info?.kinopoisk?.seasons !== undefined ?
                    <Swiper
                        initialSlide={Playlist?.season ? Playlist?.season - 1 : 1}
                        freeMode={true}
                        navigation={navigationSeasons}
                        key={Info?.kinopoisk?.seasons}
                        breakpoints={breakpointsSeasons}
                        centeredSlidesBounds={true}
                        centeredSlides={true}
                        className={style.seasons}
                    >
                        <div className='swiper-button-prev seasons'></div>
                        <div className='swiper-button-next seasons'></div>
                        {Info?.playlist?.map((res, key) => (
                            <SwiperSlide className={style.season_block} key={key} onClick={() => { setSeason(res?.season); setError() }}>
                                <p className={`${style.season}${res?.season === season ? ` ${style.active}` : ''}`}>{res?.season}-й сезон</p>
                            </SwiperSlide> || <Skeleton count={1} duration={2} width={'10vw'} height={'2vw'} style={{ marginRight: '1vw' }} />
                        ))}
                    </Swiper> : <></>
                }
                <div className={style.episodes_section} key={Playlist?.episode}>
                    <Swiper
                        key={Info?.kinopoisk}
                        initialSlide={(Playlist?.season === season && Playlist?.episode !== null) ? Playlist?.episode - 1 : 0}
                        freeMode={true}
                        navigation={navigationEpisodes}
                        breakpoints={breakpointsEpisodes}
                        centeredSlidesBounds={true}
                        centeredSlides={true}
                        className={style.episodes}
                    >
                        <div className='swiper-button-prev episodes'></div>
                        <div className='swiper-button-next episodes'></div>

                        {Info?.playlist[season - 1]?.episodes.map((res, key) => (
                            <SwiperSlide className={style.episode} key={key} onClick={() => { Playlist.setSeason(season); Playlist.setEpisode(res?.episode); GetUrl(); PlayerOptions.setWatch(true); Layout.setTrailer(false); Layout.setPoster(false); window.scrollTo(0, 0); }}>
                                <LazyLoadImage
                                    src={`https://cdn.statically.io/img/blackmedia.top/f=auto,q=80/media/${Info?.info?.kp}/preview_app_cinema_media_${Info?.info?.kp}_s${season}e${res?.episode}.png`}
                                    className={style.cover_section}
                                    effect="blur"
                                    onError={Error}
                                    wrapperClassName={error}
                                    placeholderSrc={`https://cdn.statically.io/img/kinopoiskapiunofficial.tech/blackmedia.top/f=auto,q=100/images/posters/kp_small/${Info?.info?.kp}.jpg`}
                                />
                                {/*<p className={style.duration}>{parseInt(res?.media[0].duration / 60)}:{res?.media[0].duration % 60 < 10 ? '0' + (res?.media[0].duration % 60) : res?.media[0].duration % 60}</p>*/}
                                {(<p className={style.episode_number}>{res?.episode}-я серия</p> || <Skeleton count={1} duration={2} width={'7vw'} height={'1.5vw'} style={{ marginTop: '1vw' }} />)}
                            </SwiperSlide>
                        )
                        )}
                    </Swiper>
                </div>
            </section>
        </SkeletonTheme>
    )

}
)
export default Episodes
