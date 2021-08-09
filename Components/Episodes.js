import React, { useState, useEffect } from 'react';
import style from '../styles/Episodes.module.sass';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Playlist from '../Store/Playlist';
import Info from '../Store/Info';
import Layout from '../Store/Layout';
import { observer } from 'mobx-react-lite';
import { get } from 'idb-keyval';
import { Swiper, SwiperSlide } from 'swiper/react';
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

const Episodes = observer((data) => {
    const kp = data.kp;
    const [season, setSeason] = useState(null);
    const [error, setError] = useState();
    const [length, setLength] = useState(9);

    useEffect(() => {
        setLength(Info?.playlist?.length < 9 ? Info?.playlist?.length : 9)
    }, [Info?.playlist?.length])

    const breakpointsSeasons = { 320: { slidesPerView: 3.5 }, 768: { slidesPerView: Info?.details?.totalSeasons < 9 ? Info?.details?.totalSeasons : 9 } };
    const breakpointsEpisodes = { 320: { slidesPerView: 1.8 }, 768: { slidesPerView: 4.9 } };

    useEffect(() => {
        const Season = async () => {
            var info = await get('Длительность');
            if (info?.length !== undefined && kp !== undefined) {
                var search = info.findIndex(item => item?.kinopoisk_id === kp);
                if (search !== -1) {
                    setSeason(Number(info[search]?.season));
                    Playlist.setSeason(info[search]?.season);
                    Playlist.setEpisode(info[search]?.episode);
                } else {
                    setSeason(1);
                    Playlist.setSeason(1);
                    Playlist.setEpisode(1);
                }
            }

            if (info?.length === undefined && kp !== undefined) {
                setSeason(1);
                Playlist.setSeason(1);
                Playlist.setEpisode(1);
            }
        }
        Season();
    }, [kp])

    const Error = () => {
        setError('error')
    }

    useEffect(() => {
        if (kp !== undefined) {
            const Fetch = async () => {
                const response = await fetch(`https://api.alloha.tv/?token=04941a9a3ca3ac16e2b4327347bbc1&kp=${kp}`);
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
    }, [kp])

    return (
        <section className={style.nav_section}>
            <Swiper
                initialSlide={Playlist?.season ? Playlist?.season - 1 : 1}
                freeMode={true}
                navigation={navigationSeasons}
                key={Info?.details?.totalSeasons}
                breakpoints={breakpointsSeasons}
                centeredSlidesBounds={true}
                centeredSlides={true}
                className={style.seasons}
            >
                <div className='swiper-button-prev seasons'></div>
                <div className='swiper-button-next seasons'></div>
                {Array.from(Array(Info?.details?.totalSeasons), (_, i) => i + 1).map((res, key) => (
                    <SwiperSlide className={style.season_block} key={Info?.details?.totalSeasons + key} onClick={() => { setSeason(res); setError() }}>
                        <p className={`${style.season}${res === season ? ` ${style.active}` : ''}`}>{res}-й сезон</p>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={style.episodes_section} key={Playlist?.episode}>
                <Swiper
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
                        <SwiperSlide className={style.episode} key={key} onClick={() => { Playlist.setSeason(season); Playlist.setEpisode(res?.episode); GetUrl(); Layout.setWatch(true); window.scrollTo(0, 0); }}>
                            <LazyLoadImage
                                src={`https://cdn.statically.io/img/blackmedia.top/f=auto,q=80/media/${kp}/preview_app_cinema_media_${kp}_s${season}e${res?.episode}.png`}
                                className={style.cover_section}
                                effect="blur"
                                alt=""
                                onError={Error}
                                wrapperClassName={error}
                                placeholderSrc={`https://cdn.statically.io/img/kinopoiskapiunofficial.tech/blackmedia.top/f=auto,q=100/images/posters/kp_small/${kp}.jpg`}
                            />
                            <p className={style.episode_number}>{res?.episode}-я серия</p>
                        </SwiperSlide>
                    )
                    )}
                </Swiper>
            </div>
        </section>
    )

}
)
export default Episodes
