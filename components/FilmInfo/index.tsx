import {FC, useState} from 'react';
import dynamic from 'next/dynamic';
import styles from './styles/Filminfo.module.scss';
import Icons from '../../assets/images/Icons';
import {useEvent, useStore} from 'effector-react/ssr';
import {$data} from '@models/FilmData';
import {setVisibility} from '@models/Player';

const FilmInfo: FC = () => {
    const AuthPopup = dynamic(() => import('@components/Cabinet/AuthPopup/AuthPopup'));
    const [authError, setAuthPopup] = useState(false);
    const data = useStore($data);
    const showPlayer = useEvent(setVisibility);
    const [desktopBackground, setDesktopBackground] = useState(
        `https://8b1a9ed1-9ef0-4a16-9948-a5123b2947e7.selcdn.net/insecure/plain/https://blackmedia.top/media/${data.kpId}/wide_app_cinema_media_${data.kpId}.jpg`
    );

    return (
        <section className={styles.container}>
            {authError && <AuthPopup setAuthPopup={setAuthPopup}/>}
            <div className={styles.preview}>
                <picture className={styles.hero_picture}>
                    <source
                        media='(max-width: 767px)'
                        srcSet={`https://cdn.statically.io/img/kinopoiskapiunofficial.tech/f=auto,q=50/images/posters/kp/${data.kpId}.jpg`}
                    />
                    <img
                        alt={data.nameRu}
                        src={desktopBackground}
                        className={styles.image}
                        onError={() => setDesktopBackground('/putin.jpg')}
                    />
                </picture>
                {/* {trailer && isBrowser && (
            <iframe
              width='900'
              height='506'
              className={styles.trailer}
              src={`https://www.youtube.com/embed/${trailer}?autoplay=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&loop=1&rel=0&modestbranding=1&showinfo=0&start=5&mute=1&playlist=${trailer}`}
              frameBorder='0'
              allowFullScreen
            ></iframe>
          )} */}
            </div>
            <div className={styles.info}>
                <button className={styles.button} onClick={() => showPlayer(true)}>
                    <Icons className={styles.icon} icon='PlayArrowIcon'/>
                    &nbsp;смотреть
                </button>
                <h1 className={styles.title}>{data.nameRu} смотреть онлайн</h1>
                <p className={styles.text}>{data.nameOriginal}</p>
                <p className={styles.text}>
                    {data.year} • {data.genres} • {data.countries} • {data.age}
                </p>
                <div className={styles.ratings}>
                    {data.rating.kp && (
                        <div className={styles.rating}>
                            <p className={styles.rating_value}>{data.rating.kp}</p>
                            <p className={styles.rating_name}>КиноПоиск</p>
                        </div>
                    )}
                    {data.rating.imdb && (
                        <div className={styles.rating}>
                            <p className={styles.rating_value}>{data.rating.imdb}</p>
                            <p className={styles.rating_name}>IMDb</p>
                        </div>
                    )}
                </div>
                <div className={styles.buttons}>
                    <button className={styles.button}>
                        <Icons className={styles.icon} icon='LikeIcon'/>
                    </button>
                    {/* {isFavorite && (
            <button
              className={styles.button}
            >
              <Icons className={styles.icon} icon='LikeActiveIcon' />
            </button>
          )} */}
                    <button className={styles.button}>
                        <Icons className={styles.icon} icon='ShareIcon'/>
                    </button>
                    <a href={`https://rutracker.org/forum/tracker.php?nm=${data.nameRu}`}>
                        <button className={styles.button}>
                            <Icons className={styles.icon} icon='DownloadIcon'/>
                        </button>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FilmInfo;
