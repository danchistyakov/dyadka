import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, { Navigation } from "swiper/core";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import style from "../styles/Header.module.sass";
import Icons from "../Images/Icons";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import CabinetMenu from "./Cabinet/CabinetMenu";

SwiperCore.use([Navigation]);

const breakpointsCategories = {
  320: { slidesPerView: "auto" },
  768: { slidesPerView: "auto" },
};

const navigationCategories = {
  nextEl: ".swiper-button-next.episodes",
  prevEl: ".swiper-button-prev.episodes",
};

const Header = () => {
  const nav = [
    { title: "Сейчас смотрят", link: "watching" },
    { title: "Новинки", link: "last" },
    { title: "Фильмы", link: "films" },
    { title: "Сериалы", link: "series" },
    { title: "Мультфильмы", link: "cartoons" },
    { title: "Телепередачи", link: "show" },
    { title: "Аниме", link: "animation" },
  ];

  return (
    <header className={style.header}>
      <div className={style.links}>
        <Link href={"/"}>
          <a className={style.logo}>Дядька в кино</a>
        </Link>
        <div className={style.header_icons}>
          <Link href="/search">
            <a className={style.header_icon}>
              <Icons icon="SearchIcon" />
            </a>
          </Link>
          <Link href="/favorites">
            <a className={style.header_icon}>
              <Icons icon="BookmarkIcon" />
            </a>
          </Link>
          <Link href="/auth">
            <a className={style.header_icon}>
              <Icons icon="PersonIcon" />
            </a>
          </Link>
        </div>
      </div>
      <nav className={style.nav}>
        <Swiper
          freeMode={true}
          slidesPerView="auto"
          navigation={navigationCategories}
          breakpoints={breakpointsCategories}
          className={style.categories_slider}
        >
          {nav?.map((res, key) => (
            <SwiperSlide className={style.categories_item} key={key}>
              <Link
                href="/category/[category]"
                as={`/category/${res?.link}`}
                key={key}
                draggable="false"
                className={style.nav_element}
                activeClassName={style.pages_a_active}
              >
                {res?.title}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={style.categories}>
          {nav?.map((res, key) => (
            <div className={style.categories_item} key={key}>
              <Link
                href="/category/[category]"
                as={`/category/${res?.link}`}
                key={key}
                draggable="false"
                className={style.nav_element}
                activeClassName={style.pages_a_active}
              >
                {res?.title}
              </Link>
            </div>
          ))}
        </div>
      </nav>
      <Link href="/search">
        <a className={style.search_icon}>
          <Icons icon="SearchIcon" />
        </a>
      </Link>
      <Link href="/favorites">
        <a className={style.header_button}>Избранное</a>
      </Link>
      <CabinetMenu />
    </header>
  );
};

export default Header;
