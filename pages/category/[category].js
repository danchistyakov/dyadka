import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import style from "../../styles/Genre.module.sass";
//import Navigation from "../../Components/Navigation";
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Genre = (data) => {
    /*const [result, setResult] = useState(null);
    const router = useRouter()
    const category = router.query.category;
    console.log(data)
    useEffect(() => {
        const Fetch = async () => {
            if (category !== undefined) {
                setResult({ items: [] })
                const response = await fetch(`/api/categories?category=${category}`);
                const result = await response.json();
                setResult(result)
            }
        }
        Fetch();
    }, [category])*/

    return (
        <div>
            <h1 className={style.genre_title}>{data?.data?.title}</h1>
            {/*(number > result?.pagesCount) && (<h1 className={style.genre_title}>Результатов поиска оказалось немного меньше :(</h1>)*/}
            <div className={style.genre_section}>
                {data?.data?.items.map((res, key) => (
                    <div className={style.genre_item} key={key}>
                        <Link href='/media/[id]' as={`/media/${res?.id}`}>
                            <a>
                                <LazyLoadImage className={style.genre_poster} alt={res?.title} src={`${res?.poster}`} effect="blur" />
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

export const getStaticProps = async (context) => {
    const category = context.params.category;
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const response = await fetch(`https://new.dyadka.gq/api/categories?category=${category}`);
    const data = await response.json();

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            data,
        },
    }
}

export const getStaticPaths = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export default Genre
