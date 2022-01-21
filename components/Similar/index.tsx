import { FC, useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import style from "./styles/Similar.module.sass";
import Layout from "../../store/Layout";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import Link from "next/link";
import { SimilarProps } from "./interfaces/ISimilar";

SwiperCore.use([Navigation]);

const breakpointsSimilar = {
  320: { slidesPerView: 3.5 },
  768: { slidesPerView: 7 },
};

const navigationSimilar = {
  nextEl: ".swiper-button-next.similar",
  prevEl: ".swiper-button-prev.similar",
};

const Similar: FC<SimilarProps> = ({ data }) => {
  return (
    <section>
      {data?.length > 0 && (
        <div className={style.similar_container}>
          <h3 className={style.section_title}>Похожие фильмы и сериалы</h3>
          <Swiper
            slidesPerView={7}
            freeMode={true}
            navigation={navigationSimilar}
            breakpoints={breakpointsSimilar}
            centeredSlidesBounds={true}
            centeredSlides={true}
            className={style.similar_feed}
          >
            <div className="swiper-button-prev similar"></div>
            <div className="swiper-button-next similar"></div>

            {data?.map(({ kpId, poster, title }) => (
              <SwiperSlide
                className={style.similar_item}
                key={kpId}
                onClick={() => Layout.setWatch(false)}
              >
                <Link href={`/media/${kpId}`} passHref>
                  <a>
                    <LazyLoadImage
                      src={poster}
                      alt={title}
                      className={style.similar_poster}
                    />
                    <p className={style.similar_name}>{title}</p>
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
