import React, { useEffect } from 'react';
import { SkeletonTheme } from "react-loading-skeleton";
import Staff from '../../Components/Staff';
import Episodes from '../../Components/Episodes';
import FilmInfo from '../../Components/FilmInfo';
import Similar from '../../Components/Similar';
import Info from '../../Store/Info';
import Video from '../../Store/Video';
import Layout from '../../Store/Layout';
import Playlist from '../../Store/Playlist';
import style from '../../styles/Film.module.sass';
import ErrorPage from 'next/error';
import Head from 'next/head';

const Film = (film) => {

    useEffect(() => {
        const Fetch = async () => {
            Layout.setWatch(false);
            Info.videoCDN(null);
            Info.setInfo(null);
            Info.setDetails(null);
            Video.setUrl(null);
            Playlist.setTranslations(null);
            if (film.film.hdrezka_id !== undefined) {
                Info.setInfo(film.film);
            }
        }
        Fetch();
    }, [film.film.hdrezka_id])

    if (film.film.kp !== undefined) {
        return (
            <SkeletonTheme color="#202020" highlightColor="#444">
                <Head>
                    <title>{`${film?.film?.title} — смотреть у Дядьки онлайн без регистрации и СМС`}</title>
                </Head>
                <FilmInfo hdrezka={film.film.hdrezka_id} kinopoisk={film.film.kp} />
                <div className={style.film_container} key={film.film.hdrezka_id}>
                    {film.film.serial && <Episodes kp={film.film.kp} />}
                    <Staff kp={film.film.kp} />
                    <Similar kp={film.film.kp} />
                </div>
            </SkeletonTheme>
        )
    } else {
        return (<ErrorPage statusCode={404} />)
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const response = await fetch(`https://d.appinfo.ml/ref/40/${id}`);
    const film = await response.json();

    return {
        props: {
            film,
        },
    }
}

export const getStaticPaths = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export default Film
