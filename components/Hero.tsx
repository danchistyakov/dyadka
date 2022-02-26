import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import styles from "../styles/Hero.module.scss";
import { Lazy } from "swiper";
import Link from "next/link";

SwiperCore.use([Lazy]);
SwiperCore.use([Navigation]);

const navigationSlider = {
  prevEl: ".swiper-button-prev.slider",
  nextEl: ".swiper-button-next.slider",
};

const Hero = ({ data }) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1.1}
      centeredSlides={true}
      navigation={navigationSlider}
      loop={true}
    >
      <div className="swiper-button-prev slider"></div>
      <div className="swiper-button-next slider"></div>
      {data.map((res) => (
        <SwiperSlide className={styles.hero_slide} key={res.kinopoisk_id}>
          <Link href={`/media/${res.kinopoisk_id}`} passHref>
            <a className={styles.container}>
              <div className={styles.bg}>
                <picture>
                  <source
                    media="(max-width: 767px)"
                    srcSet={`https://cdn.statically.io/img/blackmedia.top/f=auto,w=1920,q=60${res.posters.big}`}
                  />
                  <img
                    className={`${styles.hero_img} swiper-lazy`}
                    src={`https://cdn.statically.io/img/blackmedia.top/f=auto,w=1920,q=60${res.posters.wide}`}
                  />
                </picture>
              </div>
              <div className={styles.slide_info}>
                <p className={styles.item_title}>{res.title}</p>
                <p
                  className={styles.item_description}
                  dangerouslySetInnerHTML={{ __html: res.description }}
                ></p>
              </div>
            </a>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
