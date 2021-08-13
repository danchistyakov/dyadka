import React, { useEffect, useState } from 'react';
import style from "../../styles/Search.module.sass";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Search = (result) => {
    console.log(result)
    const router = useRouter()
    const search = router.query.query;
    return (
        <div>
            {result.search.length > 0 ?
                <h1 className={style.search_title}>Результаты поиска по запросу: {search}</h1>
                :
                <h1 className={style.search_title}>По запросу: {search} ничего не нашлось. Попробуйте изменить поисковый запрос</h1>
            }
            {/*(search === 'null' || search === ' ') && (<h1 className={style.search_title}>Пустой поисковый запрос</h1>)*/}
            {/*(search !== 'null' && search !== ' ' && (Number(number) > Number(result?.pagesCount))) && (<h1 className={style.genre_title}>Результатов поиска оказалось немного меньше :(</h1>)*/}

            <div>
                <div className={style.search_section}>
                    {result?.search?.map((res, key) => (
                        <div className={style.search_item} key={search + key}>
                            <Link href={`/media/${res?.id}`}>
                                <a>
                                    <LazyLoadImage
                                        src={res?.poster}
                                        alt={res?.title}
                                        className={style.search_image}
                                        effect="blur"
                                    />
                                    <div className={style.item_title}>
                                        <p>{res?.title}</p>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
            {/*<Navigation number={result?.pagesCount} />*/}
        </div>
    )
}

export const getStaticProps = async (context) => {
    const query = context.params.query;
    const response = await fetch(`https://new.dyadka.gq/api/search?q=${encodeURI(query)}`);
    const search = (await response.json()).search;

    return {
        props: {
            search,
        },
    }
}

export const getStaticPaths = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export default Search
