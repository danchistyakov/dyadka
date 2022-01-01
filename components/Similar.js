import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import style from "../styles/Similar.module.sass";
import Layout from "../Store/Layout";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import Link from "next/link";

SwiperCore.use([Navigation]);

const breakpointsSimilar = {
  320: { slidesPerView: 3.5 },
  768: { slidesPerView: 7 },
};

const navigationSimilar = {
  nextEl: ".swiper-button-next.similar",
  prevEl: ".swiper-button-prev.similar",
};
var render = 0;

const Similar = (kp) => {
  render++;
  console.log("Количество рендерингов: " + render);
  const [similar, setSimilar] = useState(null);

  useEffect(() => {
    const Fetch = async () => {
      const response = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/${kp.kp}/similars`,
        {
          headers: {
            "X-API-KEY": "ceff3505-c77c-450a-8abb-aa29f638f5ee",
          },
        }
      );
      const result = await response.json();
      setSimilar(result?.items);
    };
    Fetch();
  }, [kp.kp]);

  const source = "kp";
  return (
    <section>
      {similar?.length > 0 && (
        <div className={style.similar_container}>
          <h3 className={style.section_title}>Похожие фильмы и сериалы</h3>
          <Swiper
            slidesPerView={7}
            freeMode={true}
            navigation={navigationSimilar}
            key={kp.kp}
            breakpoints={breakpointsSimilar}
            centeredSlidesBounds={true}
            centeredSlides={true}
            className={style.similar_feed}
          >
            <div className="swiper-button-prev similar"></div>
            <div className="swiper-button-next similar"></div>

            {similar?.map((res, key) => (
              <SwiperSlide
                className={style.similar_item}
                key={key}
                onClick={() => Layout.setWatch(false)}
              >
                <Link
                  href={{
                    pathname: `/media/${res?.filmId}`,
                    query: { source },
                  }}
                >
                  <a>
                    <LazyLoadImage
                      src={`https://cdn.statically.io/img/${res?.posterUrlPreview.slice(
                        8,
                        35
                      )}/f=auto,q=70/${res?.posterUrlPreview.slice(36)}`}
                      alt={res?.nameRu}
                      className={style.similar_poster}
                      //effect="blur"
                    />
                    <p className={style.similar_name}>{res?.nameRu}</p>
                  </a>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
};

export default Similar;
