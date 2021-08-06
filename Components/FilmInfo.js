import React, { useEffect, useState, useRef } from 'react';
import style from '../styles/Filminfo.module.sass';
import Skeleton from "react-loading-skeleton";
import PlayerOptions from '../Store/PlayerOptions';
import { set, get } from 'idb-keyval';
import Playlist from '../Store/Playlist';
import Info from '../Store/Info';
import Layout from '../Store/Layout';
//import YouTube from 'react-youtube';
import { Img } from 'react-image';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import Player from './Player';
import Icons from '../Images/Icons';
import Video from '../Store/Video';
import ReactPlayer from 'react-player';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";

const FilmInfo = observer((data) => {
    const rezka = data.hdrezka;
    const kp = data.kinopoisk;

    const [add, setAdd] = useState(false);
    const [width, setWidth] = useState(null);
    const [background, setBackground] = useState('video');
    const [error, setError] = useState();

    const handleWatch = () => {
        Layout.setWatch(true);
        window.scrollTo(0, 0)
    }

    useEffect(() => {
        const Favorite = async () => {
            var arr = await get('Избранное');
            if (arr?.find(item => item.id === rezka) === undefined) {
                setAdd(false)
            } else {
                setAdd(true)
            }
        }
        Favorite();

        const easyWatch = async () => {
            var arr = await get('Длительность');
            var search = arr?.findIndex(item => item?.kinopoisk_id === kp);
            try {
                if (arr[search]?.translationId !== undefined && arr[search]?.translationName !== undefined) {
                    Video.setTranslation(arr[search]?.translationId, arr[search]?.translationName);
                } else {
                    Video.setTranslation(null, null);
                }
            }
            catch (err) {
                Video.setTranslation(null, null);
            }
        }

        easyWatch();

    }, [rezka])

    useEffect(() => {
        const Details = async () => {
            const response = await fetch(`/api/details?id=${kp}`);
            const result = await response.json();
            Info.setDetails(result.details);
        }
        Details();
    }, [kp])

    useEffect(() => {
        const Episodes = async () => {
            const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${kp}`, {
                headers: {
                    'X-API-KEY': 'ceff3505-c77c-450a-8abb-aa29f638f5ee'
                }
            })
            const result = await response.json();
            Info.setKinopoisk(result?.data);
        }
        Episodes();
    }, [kp]);

    const Fav = async () => {
        var arr = await get('Избранное');

        if (arr.find(item => item.id === rezka) === undefined) {
            if (arr === undefined) {
                arr = [];
                arr.push({ name: Info?.info?.title, poster: `https://kinopoiskapiunofficial.tech/images/posters/kp_small/${kp}.jpg`, id: rezka });
                set('Избранное', arr);
                setAdd(true)
            } else {
                if (arr?.find(item => item.id === rezka) === undefined) {
                    arr.push({ name: Info?.info?.title, poster: `https://kinopoiskapiunofficial.tech/images/posters/kp_small/${kp}.jpg`, id: rezka });
                    set('Избранное', arr);
                    setAdd(true)
                }
            }
        } else {
            arr.reduce((resarr, res, index) => {
                if (res.id === rezka) {
                    arr.splice(index, 1)
                }
            }, [])
            set('Избранное', arr);
            setAdd(false)
        }
    }

    const expand = Layout?.watch ? true : false;

    const Error = () => {
        setError('error')
    }

    return (
        <section className={style.film_hero}>
            <div className={`${style.screen} ${expand ? style.expand : ''}`}>
                {!Layout?.watch ? (<div className={style.preview} key={kp}>
                    <BrowserView>
                        {background === 'poster' && (
                            <div className={style.hero_poster} ref={node => setWidth(node?.offsetWidth)}>
                                <picture className={style.hero_picture}>
                                    <source media="(max-width: 767px)" srcSet={`https://cdn.statically.io/img/blackmedia.top/f=auto,w=${width},q=100/media/${kp}/big_app_cinema_media_${kp}_big.jpg`} />
                                    <source media="(min-width: 767px)" srcSet={`https://cdn.statically.io/img/blackmedia.top/f=auto,w=${width},q=70/media/${kp}/wide_app_cinema_media_${kp}.jpg`} />
                                    <Img
                                        src={[`https://cdn.statically.io/img/blackmedia.top/f=auto,w=${width},q=70/media/${kp}/wide_app_cinema_media_${kp}.jpg`, 'https://tangerine.gq/putin1.jpg']}
                                        className={style.hero_poster_img}
                                    />
                                </picture>
                            </div>
                        )}
                        {background === 'video' && Info?.details?.videoURL?.hd !== undefined && (
                            <ReactPlayer
                                url={Info?.details?.videoURL?.hd + '?from=discovery&chunks=1&vsid=426fb41c77bbe07751e422c4b64aeba60f7131107342xWEBx6101x1627810205&t=1627810225108'}
                                muted={true}
                                playing={true}
                                loop={true}
                                volume={0}
                                width={'100vw'}
                                height={'140%'}
                                onError={() => setBackground('poster')}
                            />
                        )}
                    </BrowserView>
                    <MobileView>
                        <picture className={style.hero_picture}>
                            <source media="(max-width: 767px)" srcSet={`https://cdn.statically.io/img/blackmedia.top/f=auto,w=${width},q=100/media/${kp}/big_app_cinema_media_${kp}_big.jpg`} />
                            <source media="(min-width: 767px)" srcSet={`https://cdn.statically.io/img/blackmedia.top/f=auto,w=${width},q=70/media/${kp}/wide_app_cinema_media_${kp}.jpg`} />
                        </picture>
                        <Img
                            src={[`https://cdn.statically.io/img/blackmedia.top/f=auto,w=${width},q=70/media/${kp}/wide_app_cinema_media_${kp}.jpg`, 'https://tangerine.gq/putin1.jpg']}
                            className={style.hero_poster_img}
                        />
                    </MobileView>
                </div>)
                    :
                    (<div className={style.film_player}>
                        <Player />
                    </div>)}
            </div>
            <div className={style.film_content}>
                {!Layout?.watch && (<button className={style.film_info_watch} onClick={handleWatch}><Icons className={style.film_info_icon} icon='PlayArrowIcon' /> &nbsp;смотреть</button>)}
                {Info?.info?.title ? <h1 className={style.film_title}>{Info?.info?.title} смотреть онлайн</h1> :
                    <><Skeleton className={style.film_title_loader} count={1} duration={2} />
                        <Skeleton className={style.film_subtitle_loader} count={1} duration={2} width={'70%'} /></>}
                <div><p className={style.film_eng_title}>{Info?.info?.etitle}</p></div>
                <div>
                    {Info?.info?.year ?
                        <div className={style.film_info}>{(<p>{Info?.info?.year && (<>{Info?.info?.year.slice(0, 4)} • </>)}
                            {/*Info?.kp?.data?.premiereWorldCountry !== null && (<>{Info?.kp?.data?.premiereWorldCountry} • </>)*/}
                            {Info?.info?.genre !== undefined && (<>{Info?.info?.genre} • </>)}
                            {Info?.info?.country !== undefined && (<>{Info?.info?.country} • </>)}
                            {Info?.info?.ageLimits !== undefined && (<>{Info?.info?.ageLimits}+</>)}
                        </p>)}</div>
                        : <Skeleton className={style.film_info_loader} count={1} duration={2} />}
                </div>
                <div className={style.rating_block}>
                    <div className={style.rating_item}>
                        {Info?.details?.ratingData?.rating !== undefined ? <p className={style.rating_value}>{Info?.details?.ratingData?.rating}</p> : <Skeleton className={style.rating_value_loader} count={1} duration={2} />}
                        {Info?.details?.ratingData?.rating !== undefined ? <p className={style.rating_name}>КиноПоиск</p> : <Skeleton className={style.rating_name_loader} count={1} duration={2} />}
                    </div>
                    <div className={style.rating_item}>
                        {Info?.details?.ratingData?.ratingIMDb !== undefined ? <p className={style.rating_value}>{Info?.details?.ratingData?.ratingIMDb}</p> : <Skeleton className={style.rating_value_loader} count={1} duration={2} />}
                        {Info?.details?.ratingData?.ratingIMDb !== undefined ? <p className={style.rating_name}>IMDb</p> : <Skeleton className={style.rating_name_loader} count={1} duration={2} />}
                    </div>
                </div>
                <div className={style.buttons_block}>
                    {!add && (<button onClick={() => { Fav(); }} className={style.film_info_button}><Icons className={style.film_info_icon} icon='LikeIcon' /></button>)}
                    {add && (<button onClick={() => { Fav(); }} className={style.film_info_button}><Icons className={style.film_info_icon} icon='LikeActiveIcon' /></button>)}
                    <button className={style.film_info_button}><Icons className={style.film_info_icon} icon='ShareIcon' /></button>
                    <a href="https://my-files.su/Save/jmodpm/debug.json"><button className={style.film_info_button}><Icons className={style.film_info_icon} icon='DownloadIcon' /></button></a>
                </div>
            </div>
        </section>
    )
}
)

export default FilmInfo
