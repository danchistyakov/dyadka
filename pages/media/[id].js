import React, { useEffect, useState } from 'react';
import { SkeletonTheme } from "react-loading-skeleton";
import Staff from '../../Components/Staff';
import Episodes from '../../Components/Episodes';
import FilmInfo from '../../Components/FilmInfo';
import Similar from '../../Components/Similar';
import Info from '../../Store/Info';
import style from '../../styles/Film.module.sass';
import { useRouter } from 'next/router'

const Film = () => {
    const router = useRouter()
    const film = router.query.id;
    const [series, setSeries] = useState(false);

    useEffect(() => {
        const Fetch = async () => {
            if (film !== undefined) {
                const response = await fetch(`/api/film?id=${film}`);
                const result = await response.json();
                Info.setInfo(result.film);
                result.film.serial && setSeries(true);
            }
        }
        Fetch();
    }, [film])

    return (
        <SkeletonTheme color="#202020" highlightColor="#444">
            <FilmInfo film={film} />
            <div className={style.film_container}>
                {series && <Episodes />}
                {<Staff id={film} />}
                {<Similar id={film} />}
            </div>
        </SkeletonTheme>

    )
}


export default Film
