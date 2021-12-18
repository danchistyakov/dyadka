import { FC } from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/TopControls.module.scss";
import Icons from "../../../../Images/Icons";
import { useRouter } from "next/router";
import { TopControlsProps } from "../interfaces/IControls";

const TopControls: FC<TopControlsProps> = ({
  isContinuing,
  isListVisible,
  isSeries,
  season,
  episode,
  handleContinue,
  handleList,
  handleTranslation,
  title,
  translations,
  translationName,
}) => {
  const { query } = useRouter();
  /*useEffect(() => {
    const BookMarks = async () => {
      if (
        Info?.info?.kp !== undefined &&
        (await get("Длительность")) !== undefined
      ) {
        const info = await get("Длительность");
        const search = info?.findIndex(
          (item) => item?.kinopoisk_id === Info?.info?.kp
        );
        search !== -1 &&
          info[search]?.season === Playlist?.season &&
          info[search]?.episode === Playlist?.episode &&
          info[search]?.currentTime !== undefined &&
          setContinueTime(true);
      }
    };
    BookMarks();
  }, [Info?.info?.kp]);*/

  return (
    <div className={styles.top_controls}>
      <div className={styles.top_left}>
        <p className={styles.episode_info}>
          {isSeries ? `${title}. Сезон ${season}. Серия ${episode}` : title}
        </p>

        {isContinuing && (
          <button onClick={handleContinue} className={styles.button_continue}>
            Продолжить
          </button>
        )}
      </div>
      <div className={styles.top_right}>
        <div className={styles.translation_preview} onClick={handleList}>
          {translationName}
          {translations.list.length > 1 &&
            (isListVisible ? (
              <Icons
                icon="ExpandLessIcon"
                className={styles.translations_icon}
              />
            ) : (
              <Icons
                icon="ExpandMoreIcon"
                className={styles.translations_icon}
              />
            ))}
        </div>
        {isListVisible && translations.list.length > 1 && (
          <div className={styles.translations_list} /*ref={translateModal}*/>
            {translations.list.map((res) => (
              <span
                className={styles.translation_item}
                onClick={() => handleTranslation(res.id, res.name, res.params)}
                key={res.id}
              >
                {res.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(TopControls);
