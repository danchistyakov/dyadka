import React, { useState } from "react";
import style from "../styles/Menu.module.sass";
import Icons from "../Images/Icons";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import Auth from "../Store/Auth";
import { useRouter } from "next/router";

const Menu = observer(({ setOpen }) => {
  const nav = [
    { title: "Сейчас смотрят", link: "watching" },
    { title: "Новинки", link: "last" },
    { title: "Фильмы", link: "films" },
    { title: "Сериалы", link: "series" },
    { title: "Мультфильмы", link: "cartoons" },
    { title: "Телепередачи", link: "show" },
    { title: "Аниме", link: "animation" },
  ];
  const lklinks = [
    { link: "/my/favorites", title: "Избранное" },
    { link: "/my/featured", title: "Рекомендации" },
    { link: "/my/health", title: "Проверка систем" },
    { link: "/my/history", title: "История посещений" },
    { link: "/my/settings", title: "Настройки" },
  ];

  const [myOpened, setMyOpen] = useState(false);

  const Logout = async () => {
    setOpen(false);
    await Auth.logout();
  };

  return (
    <nav className={style.mobile_menu}>
      <div className={style.menu_items}>
        {nav.map((res, key) => (
          <Link
            href="/category/[category]"
            as={`/category/${res.link}`}
            key={key}
          >
            <a onClick={() => setOpen(false)}>
              <div className={style.menu_item}>{res.title}</div>
            </a>
          </Link>
        ))}
        {Auth.isAuth ? (
          <div className={style.menu_item} onClick={() => setMyOpen(!myOpened)}>
            <p>Личный кабинет</p>
            <Icons
              icon="ExpandIcon"
              className={`${style.arrow_icon}${
                !myOpened ? "" : ` ${style.expanded}`
              }`}
            />
          </div>
        ) : (
          <Link href="/auth">
            <a>
              <div className={style.menu_item} onClick={() => setOpen(false)}>
                Войти
              </div>
            </a>
          </Link>
        )}

        {myOpened && (
          <div className={style.lk_items}>
            {lklinks.map((res, key) => (
              <Link href={res.link} key={key}>
                <a
                  className={style.menu_subitem}
                  onClick={() => setOpen(false)}
                >
                  {res.title}
                </a>
              </Link>
            ))}
            <a className={style.menu_subitem} onClick={Logout}>
              Выйти
            </a>
          </div>
        )}
      </div>
    </nav>
  );
});
export default Menu;
