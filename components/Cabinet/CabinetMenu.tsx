import { FC, useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import Auth from "../../store/Auth";
import Link from "next/link";
import style from "../../styles/Cabinet/CabinetMenu.module.scss";
import AuthPopup from "./AuthPopup/AuthPopup";

const CabinetMenu: FC = observer(() => {
  const [authpopup, setAuthPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const profileModal = useRef(null);

  useEffect(() => {
    const Check = async () => {
      if (localStorage.getItem("token")) {
        await Auth.checkAuth();
      }

      setLoading(false);
    };
    Check();
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

  const Logout = async () => {
    await Auth.logout();
  };

  if (loading) {
    return <a className={style.header_button}>Загрузка...</a>;
  } else {
    return (
      <>
        {!Auth.isAuth ? (
          <div
            className={style.header_button}
            onClick={() => setAuthPopup(true)}
          >
            Вход | Регистрация
          </div>
        ) : (
          <div
            className={style.header_button}
            ref={profileModal}
            onClick={(e) => {
              e.stopPropagation();
              setVisible(!visible);
            }}
          >
            Привет, {Auth.user?.firstname}!
          </div>
        )}
        {visible && (
          <div className={style.popup}>
            {links.map((res, key) => (
              <Link href={res.link} key={key}>
                <a className={style.popup_item}>{res.title}</a>
              </Link>
            ))}
            <p className={style.popup_item} onClick={Logout}>
              Выход
            </p>
          </div>
        )}
        {authpopup && <AuthPopup setAuthPopup={setAuthPopup} />}
      </>
    );
  }
});

export default CabinetMenu;
