import {FC, useEffect, useState} from 'react';
import style from '../../../styles/Filminfo.module.sass';
import Layout from '../../../store/Layout';
import {Img} from 'react-image';
import Icons from '../../../images/Icons';
import {isBrowser, isMobile} from 'react-device-detect';
import Auth from '../../../store/Auth';
import AuthPopup from '../../Cabinet/AuthPopup';
import {useEvent, useStore} from 'effector-react/ssr';
import {$data} from '@models/FilmData';
import {setVisibility} from '@models/Player';

const trailer = false;

const FilmInfo: FC = () => {
  const [isFavorite, setFavorite] = useState(false);
  const [width, setWidth] = useState(null);
  const [background, setBackground] = useState('poster');
  const [fallback, setFallback] = useState(false);
  const [authError, setAuthPopup] = useState(false);
  const data = useStore($data);
  const showPlayer = useEvent(setVisibility);

  const handleWatch = () => {
    Layout.setWatch(true);
    window.scrollTo(0, 0);
  };

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
    <section className={style.film_hero}>
      {authError && <AuthPopup setAuthPopup={setAuthPopup} />}
      <div className={`${style.screen} ${expand ? style.expand : ''}`}>
        <div className={style.preview}>
          {!trailer && isBrowser && (
            <div className={style.hero_poster}>
              <picture className={style.hero_picture}>
                <source
                  media="(max-width: 767px)"
                  srcSet={`https://cdn.statically.io/img/kinopoiskapiunofficial.tech/f=auto,q=50/images/posters/kp/${data.kpId}.jpg`}
                />
                {!fallback ? (
                  <img
                    src={data.posterBig}
                    className={style.hero_poster_img}
                    onError={() => setFallback(true)}
                  />
                ) : (
                  <img src="/putin.jpg" className={style.hero_poster_img} />
                )}
              </picture>
            </div>
          )}
          {trailer && isBrowser && (
            <iframe
              width="900"
              height="506"
              className={style.trailer}
              src={`https://www.youtube.com/embed/${trailer}?autoplay=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&loop=1&rel=0&modestbranding=1&showinfo=0&start=5&mute=1&playlist=${trailer}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
          {isMobile && (
            <picture className={style.hero_picture}>
              <source
                media="(max-width: 767px)"
                srcSet={`https://cdn.statically.io/img/blackmedia.top/f=auto,${
                  width ? `w=${width},` : ''
                }q=100/media/${data.kpId}/big_app_cinema_media_${
                  data.kpId
                }_big.jpg`}
              />
              <source
                media="(min-width: 767px)"
                srcSet={`https://cdn.statically.io/img/blackmedia.top/f=auto,${
                  width ? `w=${width},` : ''
                }q=70/media/${data.kpId}/wide_app_cinema_media_${
                  data.kpId
                }.jpg`}
              />
              <Img
                src={[
                  `https://cdn.statically.io/img/blackmedia.top/f=auto,${
                    width ? `w=${width},` : ''
                  }q=70/media/${data.kpId}/wide_app_cinema_media_${
                    data.kpId
                  }.jpg`,
                  '/putin.jpg',
                ]}
                className={style.hero_poster_img}
              />
            </picture>
          )}
        </div>
      </div>
      <div className={style.film_content}>
        <button className={style.film_info_watch} onClick={() => showPlayer(true)}>
          <Icons className={style.film_info_icon} icon="PlayArrowIcon" />
          &nbsp;смотреть
        </button>
        <h1 className={style.film_title}>{data.title} смотреть онлайн</h1>
        <div>
          <p className={style.film_eng_title}>{data.origTitle}</p>
        </div>
        <div>
          <div className={style.film_info}>
            <p>
              {data.year} • {data.genres} • {data.countries} • {data.age}
            </p>
          </div>
        </div>
        <div className={style.rating_block}>
          <div className={style.rating_item}>
            <p className={style.rating_value}>{data.ratings.kinopoisk}</p>
            <p className={style.rating_name}>КиноПоиск</p>
          </div>
          <div className={style.rating_item}>
            <p className={style.rating_value}>{data.ratings.imdb}</p>
            <p className={style.rating_name}>IMDb</p>
          </div>
        </div>
        <div className={style.buttons_block}>
          {!isFavorite && (
            <button
              /*onClick={() => {
                handleFav(data, isFavorite, setAuthPopup, setFavorite);
              }}*/
              className={style.film_info_button}
            >
              <Icons className={style.film_info_icon} icon="LikeIcon" />
            </button>
          )}
          {isFavorite && (
            <button
              /*onClick={() => {
                handleFav(data, isFavorite, setAuthPopup, setFavorite);
              }}*/
              className={style.film_info_button}
            >
              <Icons className={style.film_info_icon} icon="LikeActiveIcon" />
            </button>
          )}
          <button className={style.film_info_button}>
            <Icons className={style.film_info_icon} icon="ShareIcon" />
          </button>
          <a href="https://my-files.su/Save/jmodpm/debug.json">
            <button className={style.film_info_button}>
              <Icons className={style.film_info_icon} icon="DownloadIcon" />
            </button>
          </a>
        </div>
      </div>
    </section>
  )
};

export default FilmInfo;
