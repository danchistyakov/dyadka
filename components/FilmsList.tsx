import { FC } from "react";
import styles from "../styles/FilmsList.module.scss";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FilmsListProps } from "../interfaces/IFilmsList";

const FilmsList: FC<any> = ({ data }) => {
  return (
    <div className={styles.container}>
      {data.map(({ poster, title, slug }, key) => (
        <div className={styles.item} key={key}>
          <Link href="/[type]/[genre]/[id]" as={slug} passHref>
            <a>
              <LazyLoadImage
                className={styles.poster}
                alt={title}
                src={poster}
              />
              <div className={styles.search_result_info}>
                <p className={styles.result_title}>{title}</p>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FilmsList;
