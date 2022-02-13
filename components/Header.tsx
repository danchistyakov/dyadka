import { FC, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Header.module.scss";
import Icons from "../images/Icons";
import CabinetMenu from "./Cabinet/CabinetMenu";
import Menu from "./Menu";
import AuthPopup from "./Cabinet/AuthPopup";

const Header: FC = () => {
  const nav = [
    {
      title: "Сейчас смотрят",
      href: "/category/watching",
      as: "/category/[category]",
    },
    { title: "Новинки", href: "/category/last", as: "/category/[category]" },
    { title: "Фильмы", href: "/films", as: "/[type]" },
    { title: "Сериалы", href: "/series", as: "/[type]" },
    { title: "Мультфильмы", href: "/cartoons", as: "/[type]" },
    {
      title: "Телепередачи",
      href: "/show",
      as: "/[type]",
    },
    { title: "Аниме", href: "/animation", as: "/[type]" },
  ];

  const [opened, setOpen] = useState<boolean>(false);
  const [authPopup, setAuthPopup] = useState<boolean>(false);
  const { asPath } = useRouter();
  return (
    <header className={styles.container}>
      {authPopup && <AuthPopup setAuthPopup={setAuthPopup} />}
      <>
        {!opened ? (
          <Icons
            icon="MenuIcon"
            onClick={() => setOpen(true)}
            className={styles.menu_icon}
          />
        ) : (
          <Icons
            icon="CloseIcon"
            onClick={() => setOpen(false)}
            className={styles.menu_icon}
          />
        )}
        {opened && <Menu setOpen={setOpen} />}
        <Link href={"/"}>
          <a className={styles.logo}>Дядька в кино</a>
        </Link>
        <div className={styles.icons}>
          <Link href="/search">
            <a className={styles.icon}>
              <Icons icon="SearchIcon" />
            </a>
          </Link>
          <Link href="/favorites">
            <a className={styles.icon}>
              <Icons icon="BookmarkIcon" />
            </a>
          </Link>
          <span className={styles.icon} onClick={() => setAuthPopup(true)}>
            <Icons icon="PersonIcon" />
          </span>
        </div>
      </>
      <nav className={styles.nav}>
        <div className={styles.categories}>
          {nav?.map(({ href, title }, key) => (
            <div key={key}>
              <Link href={href} passHref>
                <a
                  className={`${styles.item}${
                    asPath === href ? ` ${styles.item_active}` : ""
                  }`}
                >
                  {title}
                </a>
              </Link>
            </div>
          ))}
        </div>
      </nav>
      <Link href="/search">
        <a className={styles.search_icon}>
          <Icons icon="SearchIcon" />
        </a>
      </Link>
      <Link href="/favorites">
        <a
          className={`${styles.item}${
            asPath === "/favorites" ? ` ${styles.item_active}` : ""
          }`}
        >
          Избранное
        </a>
      </Link>
      <CabinetMenu />
    </header>
  );
};

export default Header;
