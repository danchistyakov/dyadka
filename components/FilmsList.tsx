import { FC } from "react";
import styles from "../styles/FilmsList.module.scss";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FilmsListProps } from "../interfaces/IFilmsList";

const FilmsList: FC<any> = ({ data, isLoading }) => {
  return (
    <div className={styles.container}>
      {!isLoading
        ? data.data?.map(({ kpId, poster, title }) => (
            <div className={styles.item} key={kpId}>
              <Link href={`/media/${kpId}`} passHref>
                <a>
                  <LazyLoadImage
                    alt={title}
                    className={styles.poster}
                    placeholderSrc={
                      "https://cdn.statically.io/img/i.pinimg.com/f=auto,q=60,h=300/originals/42/2f/83/422f83814d816e55ce6a633f35ec63a4.jpg"
                    }
                    src={poster}
                    wrapperClassName={styles.error}
                  />
                  <p className={styles.title}>{title}</p>
                </a>
              </Link>
            </div>
          ))
        : Array.from(Array(36), (_, i) => (
            <div>
              <div className={`${styles.loader} ${styles.poster}`} />
              <div className={`${styles.loader} ${styles.title}`} />
            </div>
          ))}
    </div>
  );
};

export default FilmsList;
