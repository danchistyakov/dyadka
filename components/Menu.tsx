import { FC, useState } from "react";
import style from "../styles/Menu.module.scss";
import Icons from "../images/Icons";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import Auth from "../store/Auth";
import { useRouter } from "next/router";

const Menu: FC<any> = ({ setOpen }) => {
  const nav = [
    { title: "Сейчас смотрят", href: "watching" },
    { title: "Новинки", href: "last" },
    { title: "Фильмы", href: "films" },
    { title: "Сериалы", href: "series" },
    { title: "Мультфильмы", href: "cartoons" },
    { title: "Телепередачи", href: "show" },
    { title: "Аниме", href: "animation" },
  ];
  const lklinks = [
    { href: "/my/favorites", title: "Избранное" },
    { href: "/my/featured", title: "Рекомендации" },
    { href: "/my/health", title: "Проверка систем" },
    { href: "/my/history", title: "История посещений" },
    { href: "/my/settings", title: "Настройки" },
  ];

  const [myOpened, setMyOpen] = useState(false);
  const { pathname } = useRouter();

  const Logout = async () => {
    setOpen(false);
    await Auth.logout();
  };

  return (
    <nav className={style.mobile_menu}>
      <div className={style.menu_items}>
        {nav.map(({ href, title }, key) => (
          <Link href={`/category/${href}`} key={key} passHref>
            <a onClick={() => setOpen(false)}>
              <div className={style.menu_item}>{title}</div>
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
            {lklinks.map(({ href, title }, key) => (
              <Link href={href} key={key}>
                <a
                  className={style.menu_subitem}
                  onClick={() => setOpen(false)}
                >
                  {title}
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
};
export default observer(Menu);
