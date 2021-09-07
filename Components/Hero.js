import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import style from "../styles/Hero.module.sass";
import { Lazy } from "swiper";

SwiperCore.use([Lazy]);
SwiperCore.use([Navigation]);

const navigationSlider = {
  prevEl: ".swiper-button-prev.slider",
  nextEl: ".swiper-button-next.slider",
};

const Hero = ({ data }) => {
  const source = "kp";
  return (
    <div>
      <Swiper
        spaceBetween={20}
        slidesPerView={1.1}
        centeredSlides={true}
        navigation={navigationSlider}
        loop={true}
      >
        <div className="swiper-button-prev slider"></div>
        <div className="swiper-button-next slider"></div>

        {data.map((res, key) => (
          <SwiperSlide className={style.hero_slide} key={key}>
            <Link
              href={{
                pathname: `/media/${res.kinopoisk_id}`,
                query: { source },
              }}
            >
              <a>
                <picture>
                  <source
                    media="(max-width: 767px)"
                    srcSet={`https://cdn.statically.io/img/blackmedia.top/f=auto,w=1920,q=60${res.posters.big}`}
                  />
                  <img
                    //className={style.hero_img}
                    className={`${style.hero_img} swiper-lazy`}
                    src={`https://cdn.statically.io/img/blackmedia.top/f=auto,w=1920,q=60${res.posters.wide}`}
                  />
                </picture>
                <div className={style.slide_info}>
                  <p className={style.item_title}>{res.title}</p>
                  <p className={style.item_description}>{res.description}</p>
                  {/*<p>{res.premier_year}</p>
                            <div className={style.slide_genres}>
                                {res.genres.map((item, key) => (
                                    <p>{item.name}{res.genres.length - key !== 1 ? ',' : ''}&nbsp;</p>
                                ))}
                                </div>*/}
                </div>
              </a>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
