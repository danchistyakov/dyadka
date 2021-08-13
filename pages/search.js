import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from '../styles/Search.module.sass';
import Icons from '../Images/Icons';
import axios from 'axios';
import useDebounce from '../Hooks/useDebounce';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Search = ({ results }) => {
    const router = useRouter();
    const [result, setResult] = useState(results.data);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState(results.query);

    const debouncedQuery = useDebounce(query, 500);

    useEffect(async () => {
        if (query) {
            setLoading(true);
            router.push({
                pathname: '/search',
                query: { q: query },
            }, undefined, { shallow: true })
            const response = await axios.get(`/api/search?q=${query}`);
            setResult(response.data.search);
            setLoading(false);
        } else {
            //setResult([]);
        }

        if (result?.searchFilmsCountResult === 0 && result?.keyboard !== "") {
            setResult([]);
        }

    }, [debouncedQuery])


    return (
        <section className={style.search_section}>
            <div className={style.search_container}>
                <div className={style.input_block}>
                    <span className={style.search_icon}><Icons icon='SearchIcon' /></span>
                    <input type="text" value={query} className={style.search_input} onChange={e => { setQuery(e.target.value) }} placeholder="Привет от дядьки! ❤️"></input>
                </div>
                <div className={style.search_results}>
                    {!loading ? result?.map((res, key) => (
                        <div className={style.search_result} key={debouncedQuery + key}>
                            <Link draggable='false' href='/media/[id]' as={`/media/${res?.id}`}>
                                <a className={style.search_result}>
                                    <LazyLoadImage className={style.result_image} alt={res?.title} src={`https://cdn.statically.io/img/static.hdrezka.ac/f=auto,q=100/${res?.poster?.substring(26)}`} />
                                    <div className={style.search_result_info}>
                                        <p className={style.result_title}>{res?.title}</p>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    ))
                        :
                        (<></>)
                    }
                </div>
            </div>
        </section>
    )
}

export const getServerSideProps = async (context) => {
    const { q } = context.query;

    var data;
    var query;

    if (!q) {
        const response = await fetch('https://new.dyadka.gq/api/categories?category=watching');
        data = (await response.json()).items;
        query = '';
    } else {
        const response = await fetch(`https://new.dyadka.gq/api/search?q=${encodeURIComponent(q)}`);
        data = (await response.json()).search;
        query = q;
    }

    const results = Object.assign({ data }, { query });
    console.log(results);

    return {
        props: {
            results,
        },
    }
}

export default Search
