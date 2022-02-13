import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import style from "./styles/Staff.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { StaffProps } from "./interfaces/IStaff";
import {useStore} from 'effector-react/ssr';
import {$data} from '@models/FilmData';

const breakpointsSimilar = {
  320: { slidesPerView: 3.5 },
  768: { slidesPerView: 9 },
};

const navigationSimilar = {
  nextEl: ".swiper-button-next.similar",
  prevEl: ".swiper-button-prev.similar",
};

const Staff: FC = () => {
  const {staff} = useStore($data);

  return (
    <section className={style.container}>
      <Swiper
        slidesPerView={7}
        freeMode={true}
        navigation={navigationSimilar}
        breakpoints={breakpointsSimilar}
        centeredSlidesBounds={true}
        centeredSlides={true}
        className={style.feed}
      >
        <div className="swiper-button-prev similar"></div>
        <div className="swiper-button-next similar"></div>

        {staff?.map(({ kpId, poster, role, title }) => (
          <SwiperSlide key={kpId} className={style.item}>
            <LazyLoadImage src={poster} className={style.poster} />
            <p className={style.name}>{title}</p>
            <p className={style.role}>{role}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Staff;
