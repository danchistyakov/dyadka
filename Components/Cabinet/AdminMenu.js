import React from "react";
import style from "../../styles/Cabinet/AdminMenu.module.sass";
import Link from "next/link";

const AdminMenu = ({ children }) => {
  const links = [
    { link: "/my/favorites", title: "Избранное" },
    { link: "/my/featured", title: "Рекомендации" },
    { link: "/my/health", title: "Проверка систем" },
    { link: "/my/history", title: "История посещений" },
    { link: "/my/settings", title: "Настройки" },
  ];

  return (
    <section className={style.my_section}>
      <div className={style.sidebar}>
        {links.map((res, key) => (
          <Link href={res.link} key={key}>
            <a className={style.sidebar_item}>{res.title}</a>
          </Link>
        ))}
      </div>
      <div>{children}</div>
    </section>
  );
};

export default AdminMenu;
