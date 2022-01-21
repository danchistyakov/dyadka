import React, { useEffect, useState } from "react";
import style from "../../styles/Cabinet/Favorite.module.sass";
import Link from "next/link";
import { get } from "idb-keyval";
import Image from "next/image";
import Layout from "../../store/Layout";
import AdminMenu from "../../components/Cabinet/AdminMenu";
import { useRouter } from "next/router";
import Auth from "../../store/Auth";
import { observer } from "mobx-react-lite";
import axios from "axios";
import { API_URL } from "../../components/Cabinet/http";

const Favorite = observer(() => {
  const router = useRouter();
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    if (!Auth.isAuth && !Auth.loading) {
      router.push("/auth");
    }
  }, [Auth.isAuth]);

  useEffect(() => {
    /*const Favorite = async () => {
      const favorite = await get("Избранное");
      if (favorite !== undefined) {
        if (favorite.length > 0) {
          setFavorite(await get("Избранное"));
        }
      }
    };*/
    () => {
      Layout.setWatch("favs");
    };
    const Fetch = async () => {
      const { data } = await axios.post(
        `${API_URL}/favorites`,
        {
          action: "get",
          email: "4i.danila@gmail.com",
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setFavorite(data.favorites);
    };

    Fetch();
  }, []);

  return (
    <AdminMenu>
      <section className={style.favorite_section}>
        <p className={style.favorite_title}>Избранное</p>
        {!favorite && (
          <p className={style.favorite_noitems}>Пока здесь ничего нет :)</p>
        )}
        <div className={style.favorite}>
          {favorite?.map((res, key) => (
            <Link href="/[type]/[genre]/[id]" as={res?.slug} key={key}>
              <a onClick={() => Layout.setWatch("favs")}>
                <div className={style.favorite_item}>
                  {res?.blank && <p>{res?.blank}</p>}
                  <img
                    className={style.favorite_image}
                    alt={res?.title}
                    src={res?.poster}
                  />
                  <p className={style.favorite_name}>{res?.title}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </section>
    </AdminMenu>
  );
});

export default Favorite;
