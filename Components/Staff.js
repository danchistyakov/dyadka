import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import style from '../styles/Staff.module.sass';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper.min.css";

const breakpointsSimilar = { 320: { slidesPerView: 3.5 }, 768: { slidesPerView: 9 } };

const navigationSimilar = {
    nextEl: '.swiper-button-next.similar',
    prevEl: '.swiper-button-prev.similar',
}

const Staff = (kp) => {
    const [staff, setStaff] = useState(null);

    useEffect(() => {
        const Fetch = async () => {
            const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${kp.kp}`, {
                headers: {
                    "X-API-KEY": "ceff3505-c77c-450a-8abb-aa29f638f5ee"
                }
            });
            const result = await response.json();

            var directors = result?.filter(res => {
                if (res?.professionKey === 'DIRECTOR') {
                    return res
                }
            })
            var actors = result?.filter(res => {
                if (res?.professionKey === 'ACTOR') {
                    return res
                }
            })
            directors = directors.length > 3 ? directors.slice(0, 3) : directors;
            actors = actors.length > 10 ? actors.slice(0, 10) : actors
            setStaff(directors.concat(actors));
        }
        Fetch();
    }, [kp.kp])

    return (
        <section className={style.staff_container}>
            {staff?.length > 2 && (
                <Swiper
                    slidesPerView={7}
                    freeMode={true}
                    navigation={navigationSimilar}
                    breakpoints={breakpointsSimilar}
                    centeredSlidesBounds={true}
                    centeredSlides={true}
                    className={style.staff_feed}
                >
                    <div className='swiper-button-prev similar'></div>
                    <div className='swiper-button-next similar'></div>

                    {staff?.map((res, key) => (
                        <SwiperSlide key={kp.kp + key} className={style.staff_item}>
                            <LazyLoadImage
                                src={`https://cdn.statically.io/img/${res?.posterUrl.slice(8, 35)}/f=auto,q=60/${res?.posterUrl.slice(36)}`}
                                className={style.staff_poster}
                            //effect="blur"
                            />
                            <p className={style.staff_name}>{res?.nameRu}</p>
                            <p className={style.staff_role}>{res?.professionText}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>)}
        </section>
    )
}

export default Staff
