import React, { useState, useEffect } from 'react';
//import { BrowserRouter as Router, useHistory, NavLink } from "react-router-dom";
import Layout from '../Store/Layout';
import { observer } from 'mobx-react-lite';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper.min.css";
import SwiperCore, { Navigation } from "swiper/core";
import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import Link from 'next/link';
import style from '../styles/Header.module.sass';

SwiperCore.use([Navigation]);

//const breakpointsCategories = { 320: { slidesPerView: 5 }, 768: { slidesPerView: 17 } }
const breakpointsCategories = { 320: { slidesPerView: 'auto' }, 768: { slidesPerView: 'auto' } }

const navigationCategories = {
    nextEl: '.swiper-button-next.episodes',
    prevEl: '.swiper-button-prev.episodes',
}

const Header = observer(() => {

    const [nav, setNav] = useState(null);
    const [display, setDisplay] = useState(false);
    const [border, setBorder] = useState('');
    const [search, setSearch] = useState(['Загрузка...']);
    const [status, setStatus] = useState('Пустой поисковый запрос');
    const [input, setInput] = useState(null);
    //const history = useHistory();
    const history = {};
    useEffect(() => {
        const Nav = async () => {
            const response = await fetch('https://kinopoiskapiunofficial.tech/api/v2.1/films/filters', {
                headers: {
                    "X-API-KEY": "ceff3505-c77c-450a-8abb-aa29f638f5ee"
                }
            })
            const result = await response.json();
            setNav(result.genres)
        }
        Nav();
    }, [])

    /*useEffect(() => {
        const overflow = display === false ? 'auto' : 'hidden'
        document.body.style.overflowY = overflow;

    }, [display])*/

    const Fetch = async (input) => {
        setStatus('Загрузка...');
        const response = await fetch(`/api/search?q=${input}`);
        const result = await response.json();

        setSearch(result.search);

        setStatus(false);

        if (input.length < 1) {
            setSearch([]);
            setStatus('Пустой запрос');
        }

        if (result?.searchFilmsCountResult === 0 && result?.keyboard !== "") {
            setStatus('Ничего не найдено')
        }

    }

    return (
        <SkeletonTheme color="#202020" highlightColor="#444">
            <header className={style.header}>
                <div className={style.links}>
                    <Link href={'/'}><a className={style.logo}>Дядька в кино</a></Link>
                    <a className={style.ecosystem} href='https://dnazakaz.gq/' target='_blank' rel="noreferrer">#Назаказ</a>
                    <a className={style.ecosystem} href='https://namore.gq/' target='_blank' rel="noreferrer">#Наморе</a>
                </div>
                {(display || Layout?.container) && (<div className={style.search_fullscreen} onClick={() => { setDisplay(false); setBorder(''); Layout.setContainer(false); }}></div>)}
                <div className={style.search_container}>
                    <div className={`search${border}`}>
                        <input type="text" className={`search_input${border}`} onKeyDown={(e) => { e.code === 13 ? history.push(`/search/${input}/1`) : (<></>) }} onBlur={() => { setBorder(' opened') }} onChange={e => { setInput(e.target.value); setDisplay(true); setBorder(' opened'); Fetch(e.target.value); }} placeholder="Привет от дядьки! ❤️"></input>
                        {display && (<div className={style.search_results}>
                            {status && (<p className={style.loading}>{status}</p>)}
                            {search?.map((res, key) => (
                                <div className={style.search_result} key={key}>
                                    <Link draggable='false' href='/media/[id]' as={`/media/${res?.id}`}>
                                        <a className={style.search_result} key={key} onClick={() => { setDisplay(!display); setBorder('') }}>
                                            {res?.poster !== undefined && (<img className={style.result_image} alt={res?.title} src={res?.poster?.replace(40, 220)}></img>)}
                                            <div className={style.search_result_info}>
                                                <p>{res?.title}</p>
                                                {res?.rating !== undefined && (<p>Рейтинг: {res?.rating} ({res?.ratingVoteCount})</p>)}
                                                {res?.year !== undefined && (<p>Год: {res?.year}</p>)}
                                                {/*res?.countries[0].name !== undefined && (<p>Страна: {res?.countries[0].name}</p>)*/}
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                            ))}
                        </div>)}
                    </div>
                    <Link href={`/search/${input}/1`} onClick={() => { setDisplay(false); setBorder('') }}><a className={style.search_button}>Найти</a></Link>
                </div>

            </header>
            <nav className={style.nav}>
                {nav ?
                    <Swiper
                        freeMode={true}
                        navigation={navigationCategories}
                        breakpoints={breakpointsCategories}
                        //centeredSlidesBounds={true}
                        //centeredSlides={true}
                        className={style.categories}
                    >
                        {nav?.map((res, key) => (
                            <SwiperSlide className={style.categories_item} key={key}>
                                <Link as='/genre/[genre]' href={`/genre/${res?.genre}`} key={key} draggable='false' className={style.nav_element} activeClassName={style.pages_a_active}>{res?.genre}</Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    : <Skeleton className={style.categories_loader} count={1} duration={2} width={'100%'} />
                }
            </nav>
        </SkeletonTheme>
    )
}
)

export default Header