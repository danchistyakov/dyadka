import React, { useEffect } from 'react';
import { SkeletonTheme } from "react-loading-skeleton";
import Staff from '../../Components/Staff';
import Episodes from '../../Components/Episodes';
import FilmInfo from '../../Components/FilmInfo';
import Similar from '../../Components/Similar';
import Info from '../../Store/Info';
import style from '../../styles/Film.module.sass';
import ErrorPage from 'next/error';
import Head from 'next/head'

const Film = (film) => {
    const id = film.film.hdrezka_id;

    useEffect(() => {
        const Fetch = async () => {
            if (id !== undefined) {
                Info.setInfo(film.film);
            }
        }
        Fetch();
    }, [id])

    if (film.film.kp !== undefined) {
        return (
            <SkeletonTheme color="#202020" highlightColor="#444">
                <Head>
                    <title>{`${film?.film?.title} — смотреть у Дядьки онлайн без регистрации и СМС`}</title>
                </Head>
                <FilmInfo film={id} />
                <div className={style.film_container} key={film.film.hdrezka_id}>
                    {film.film.serial && <Episodes />}
                    <Staff />
                    <Similar />
                </div>
            </SkeletonTheme>
        )
    } else {
        return (<ErrorPage statusCode={404} />)
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const response = await fetch(`https://d.appinfo.ml/ref/40/${id}`);
    const film = await response.json();

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
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
