import React, { useState } from "react";
import Link from "next/link";
import style from "../styles/Header.module.sass";
import Icons from "../Images/Icons";
import CabinetMenu from "./Cabinet/CabinetMenu";
import Menu from "./Menu";

const Header = () => {
  const nav = [
    {
      title: "Сейчас смотрят",
      link: "/category/watching",
      as: "/category/[category]",
    },
    { title: "Новинки", link: "/category/last", as: "/category/[category]" },
    { title: "Фильмы", link: "/films", as: "/[type]" },
    { title: "Сериалы", link: "/series", as: "/[type]" },
    { title: "Мультфильмы", link: "/cartoons", as: "/[type]" },
    {
      title: "Телепередачи",
      link: "/show",
      as: "/[type]",
    },
    { title: "Аниме", link: "/animation", as: "/[type]" },
  ];

  const [opened, setOpen] = useState(false);

  return (
    <header className={style.header}>
      <div className={style.links}>
        {!opened ? (
          <Icons
            icon="MenuIcon"
            onClick={() => setOpen(true)}
            className={style.menu_icon}
          />
        ) : (
          <Icons
            icon="CloseIcon"
            onClick={() => setOpen(false)}
            className={style.close_icon}
          />
        )}
        {opened && <Menu setOpen={setOpen} />}
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
        <div className={style.categories}>
          {nav?.map((res, key) => (
            <Link
              href={res.as}
              as={res.link}
              key={key}
              draggable="false"
              className={style.nav_element}
              activeClassName={style.pages_a_active}
            >
              <a>
                <div className={style.categories_item} key={key}>
                  {res?.title}
                </div>
              </a>
            </Link>
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
