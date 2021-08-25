import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import Auth from "../../Store/Auth";
import Link from "next/link";
import style from "../../styles/Cabinet/CabinetMenu.module.sass";
import { useRouter } from "next/router";

const CabinetMenu = observer(() => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const profileModal = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"));
      Auth.checkAuth();
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const onClick = (e) =>
      profileModal.current?.contains(e.target) || setVisible(false);
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const links = [
    { link: "/my/favorites", title: "Избранное" },
    { link: "/my/featured", title: "Рекомендации" },
    { link: "/my/health", title: "Проверка систем" },
    { link: "/my/history", title: "История посещений" },
    { link: "/my/settings", title: "Настройки" },
  ];

  const Logout = () => {
    Auth.logout();
    router.push("/auth");
  };

  if (loading) {
    return <a className={style.header_button}>Загрузка...</a>;
  } else {
    return (
      <div>
        {!Auth.isAuth ? (
          <Link href="/auth">
            <a className={style.header_button}>Вход | Регистрация</a>
          </Link>
        ) : (
          <a
            className={style.header_button}
            ref={profileModal}
            onClick={(e) => {
              e.stopPropagation();
              setVisible(!visible);
            }}
          >
            Привет!
          </a>
        )}
        {visible && (
          <div className={style.popup}>
            {links.map((res, key) => (
              <Link href={res.link}>
                <a className={style.popup_item} key={key}>
                  {res.title}
                </a>
              </Link>
            ))}
            <p className={style.popup_item} onClick={Logout}>
              Выход
            </p>
          </div>
        )}
      </div>
    );
  }
});

export default CabinetMenu;
