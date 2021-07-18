import React, { useEffect, useState } from 'react'
import style from "../../styles/Search.module.sass";
import Link from 'next/link';
//import Navigation from "./Components/Navigation";
import { useRouter } from 'next/router'

const Search = () => {
    const [result, setResult] = useState(null);
    const router = useRouter()
    const search = router.query.query;

    useEffect(() => {
        const Fetch = async () => {
            //&page=${number}
            const response = await fetch(`/api/search?q=${search}`);
            const result = await response.json();
            setResult(result)
        }
        Fetch();
    }, [search])

    return (
        <div>
            {search !== 'null' && search !== ' ' && (<h1 className={style.search_title}>Результаты поиска по запросу: {search}</h1>)}
            {(search === 'null' || search === ' ') && (<h1 className={style.search_title}>Пустой поисковый запрос</h1>)}
            {/*(search !== 'null' && search !== ' ' && (Number(number) > Number(result?.pagesCount))) && (<h1 className={style.genre_title}>Результатов поиска оказалось немного меньше :(</h1>)*/}

            {search !== 'null' && search !== ' ' && (<div>
                <div className={style.search_section}>
                    {result?.search?.map((res, key) => (
                        <div className={style.search_item} key={key}>
                            <Link href={`/media/${res?.id}`}>
                                <a>
                                    <img src={res?.poster} alt={res?.title} className={style.search_image} />
                                    <div className={style.item_title}>
                                        <p>{res?.title}</p>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>)}
            {/*<Navigation number={result?.pagesCount} />*/}
        </div>
    )
}

export default Search
