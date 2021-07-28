import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import style from "../../styles/Genre.module.sass";
//import Navigation from "../../Components/Navigation";
import Link from 'next/link';
import Image from 'next/image';

const Genre = () => {
    const [result, setResult] = useState(null);
    const router = useRouter()
    const category = router.query.category;
    const number = 1;
    useEffect(() => {
        const Fetch = async () => {
            const response = await fetch(`/api/categories?category=${category}`);
            const result = await response.json();
            setResult(result)
        }
        Fetch();
    }, [category, number])

    return (
        <div>
            <h1 className={style.genre_title}>{result?.title}</h1>
            {/*(number > result?.pagesCount) && (<h1 className={style.genre_title}>Результатов поиска оказалось немного меньше :(</h1>)*/}
            <div className={style.genre_section}>
                {result?.items.map((res, key) => (
                    <div className={style.genre_item} key={key}>
                        <Link href='/media/[id]' as={`/media/${res?.id}`}>
                            <a>
                                <img className={style.genre_poster} alt={res?.title} src={`${res?.poster}`} />
                                <div className={style.item_title}>
                                    <p>{res?.title}</p>
                                </div>
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
            {/*<Navigation number={result?.pagesCount} />*/}
        </div >
    )
}

export default Genre
