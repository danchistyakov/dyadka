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

const Film = ({ film }) => {

    useEffect(() => {
        const Fetch = async () => {
            Layout.setWatch(false);
            Info.videoCDN(null);
            Info.setInfo(null);
            Info.setDetails(null);
            Video.setUrl(null);
            Playlist.setTranslations(null);
            if (film.hdrezka_id !== undefined) {
                Info.setInfo(film);
            }
        }
        Fetch();
    }, [film.hdrezka_id])

    if (film.kp !== undefined) {
        return (
            <SkeletonTheme color="#202020" highlightColor="#444">
                <Head>
                    <title>{`${film.title} — смотреть у Дядьки онлайн без регистрации и СМС`}</title>
                </Head>
                <FilmInfo hdrezka={film.hdrezka_id} kinopoisk={film.kp} />
                <div className={style.film_container} key={film.hdrezka_id}>
                    {film.serial && <Episodes kp={film.kp} />}
                    <Staff kp={film.kp} />
                    <Similar kp={film.kp} />
                </div>
            </SkeletonTheme>
        )
    } else {
        return (<ErrorPage statusCode={404} />)
    }
}

export const getServerSideProps = async (context) => {
    const id = context.params.id;
    const { source } = context.query;
    console.log(source)
    var film;

    if (source === undefined) {
        const response = await fetch(`https://d.appinfo.ml/ref/40/${id}`);
        film = await response.json();
    }

    if (source === 'kp') {
        const response = await fetch(`https://d.appinfo.ml/ref/15/${id}`);
        film = await response.json();
    }

    return {
        props: {
            film,
        },
    }
}

export default Film
