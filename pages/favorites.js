import React, { useEffect, useState } from "react";
import style from "../styles/Favorite.module.sass";
import Link from "next/link";
import { get } from "idb-keyval";
import Image from "next/image";

const Favorites = () => {
  const [favorite, setFavorite] = useState([{ blank: "Пока здесь пусто :(" }]);

  useEffect(() => {
    const Favorite = async () => {
      const favorite = await get("Избранное");
      if (favorite !== undefined) {
        if (favorite.length > 0) {
          setFavorite(await get("Избранное"));
        }
      }
    };
    Favorite();
  }, []);

  return (
    <section className={style.favorite_section}>
      <p className={style.favorite_title}>
        Избранное (скоро данный раздел будет удалён)
      </p>
      <div className={style.favorite}>
        {favorite?.map((res, key) => (
          <Link href="/media/[id]" as={`/media/${res?.id}`} key={key}>
            <a>
              <div className={style.favorite_item}>
                {res?.blank && <p>{res?.blank}</p>}
                <img
                  className={style.favorite_image}
                  alt={res?.name}
                  src={res?.poster}
                />
                <p className={style.favorite_name}>{res?.name}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Favorites;
