import { FC } from "react";
import styles from "../styles/FilmsList.module.scss";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FilmsListProps } from "../interfaces/IFilmsList";

const FilmsList: FC<any> = ({ data, isLoading }) => {
  return (
    <div className={styles.container}>
      {!isLoading
        ? data.map(({ poster, title, slug }, key) => (
            <div className={styles.item} key={key}>
              <Link href="/[type]/[genre]/[id]" as={slug} passHref>
                <a>
                  <LazyLoadImage
                    className={styles.poster}
                    alt={title}
                    src={poster}
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
