import { FC, useEffect, useState } from 'react';
import styles from '../styles/Filminfo.module.sass';
import Layout from '../../../store/Layout';
import Image from 'next/image';
import Icons from '../../../images/Icons';
import { isBrowser, isMobile } from 'react-device-detect';
import Auth from '../../../store/Auth';
import AuthPopup from '../../Cabinet/AuthPopup';
import { useEvent, useStore } from 'effector-react/ssr';
import { $data } from '@models/FilmData';
import { setVisibility } from '@models/Player';

const trailer = false;

const FilmInfo: FC = () => {
  const [isFavorite, setFavorite] = useState(false);
  const [width, setWidth] = useState(null);
  const [background, setBackground] = useState('poster');
  const [authError, setAuthPopup] = useState(false);
  const data = useStore($data);
  const showPlayer = useEvent(setVisibility);
  const [desktopBackground, setDesktopBackground] = useState(
    `https://cdn.statically.io/img/blackmedia.top/f=auto,q=70/media/${data.kpId}/wide_app_cinema_media_${data.kpId}.jpg`
  );

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem('token')) {
        await Auth.checkAuth();
      }
    };

    checkAuth();
  }, [data.id]);

  useEffect(() => {
    const Favorite = async () => {
      /*if (Auth.isAuth) {
          const { data } = await axios.post(
            `${API_URL}/favorites`,
            {
              action: "check",
              email: "4i.danila@gmail.com",
              id: data.id,
            },
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );

          setFavorite(result.exists);
        }*/
    };
    Favorite();
  }, [data.id, Auth.isAuth]);

  const expand = Layout?.watch ? true : false;

  return (
    <section className={styles.film_hero}>
      {authError && <AuthPopup setAuthPopup={setAuthPopup} />}
      <div className={`${styles.screen} ${expand ? styles.expand : ''}`}>
        <div className={styles.preview}>
          {!trailer && isBrowser && (
            <div className={styles.hero_poster}>
              <picture className={styles.hero_picture}>
                <source
                  media='(max-width: 767px)'
                  srcSet={`https://cdn.statically.io/img/kinopoiskapiunofficial.tech/f=auto,q=50/images/posters/kp/${data.kpId}.jpg`}
                />
                <img
                  alt={data.title}
                  src={desktopBackground}
                  className={styles.hero_poster_img}
                  onError={() => setDesktopBackground('/putin.jpg')}
                />
              </picture>
            </div>
          )}
          {trailer && isBrowser && (
            <iframe
              width='900'
              height='506'
              className={styles.trailer}
              src={`https://www.youtube.com/embed/${trailer}?autoplay=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&loop=1&rel=0&modestbranding=1&showinfo=0&start=5&mute=1&playlist=${trailer}`}
              frameBorder='0'
              allowFullScreen
            ></iframe>
          )}
          {isMobile && (
            <picture className={styles.hero_picture}>
              <source
                media='(max-width: 767px)'
                srcSet={`https://cdn.statically.io/img/blackmedia.top/f=auto,${
                  width ? `w=${width},` : ''
                }q=100/media/${data.kpId}/big_app_cinema_media_${data.kpId}_big.jpg`}
              />
              <source
                media='(min-width: 767px)'
                srcSet={`https://cdn.statically.io/img/blackmedia.top/f=auto,${
                  width ? `w=${width},` : ''
                }q=70/media/${data.kpId}/wide_app_cinema_media_${data.kpId}.jpg`}
              />
              <img
                alt={data.title}
                src={desktopBackground}
                className={styles.hero_poster_img}
                onError={() => setDesktopBackground('/putin.jpg')}
              />
            </picture>
          )}
        </div>
      </div>
      <div className={styles.film_content}>
        <button className={styles.film_info_watch} onClick={() => showPlayer(true)}>
          <Icons className={styles.film_info_icon} icon='PlayArrowIcon' />
          &nbsp;смотреть
        </button>
        <h1 className={styles.film_title}>{data.title} смотреть онлайн</h1>
        <div>
          <p className={styles.film_eng_title}>{data.origTitle}</p>
        </div>
        <div>
          <div className={styles.film_info}>
            <p>
              {data.year} • {data.genres} • {data.countries} • {data.age}
            </p>
          </div>
        </div>
        <div className={styles.rating_block}>
          {data.ratings.kinopoisk && (
            <div className={styles.rating_item}>
              <p className={styles.rating_value}>{data.ratings.kinopoisk}</p>
              <p className={styles.rating_name}>КиноПоиск</p>
            </div>
          )}
          {data.ratings.imdb && (
            <div className={styles.rating_item}>
              <p className={styles.rating_value}>{data.ratings.imdb}</p>
              <p className={styles.rating_name}>IMDb</p>
            </div>
          )}
        </div>
        <div className={styles.buttons_block}>
          {!isFavorite && (
            <button
              /*onClick={() => {
                handleFav(data, isFavorite, setAuthPopup, setFavorite);
              }}*/
              className={styles.film_info_button}
            >
              <Icons className={styles.film_info_icon} icon='LikeIcon' />
            </button>
          )}
          {isFavorite && (
            <button
              /*onClick={() => {
                handleFav(data, isFavorite, setAuthPopup, setFavorite);
              }}*/
              className={styles.film_info_button}
            >
              <Icons className={styles.film_info_icon} icon='LikeActiveIcon' />
            </button>
          )}
          <button className={styles.film_info_button}>
            <Icons className={styles.film_info_icon} icon='ShareIcon' />
          </button>
          <a href={`https://rutracker.org/forum/tracker.php?nm=${data.title}`}>
            <button className={styles.film_info_button}>
              <Icons className={styles.film_info_icon} icon='DownloadIcon' />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FilmInfo;
