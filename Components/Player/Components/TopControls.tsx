import {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from "react";
import { observer } from "mobx-react-lite";
import Info from "../../../Store/Info";
import Playlist from "../../../Store/Playlist";
import { get, set } from "idb-keyval";
import style from "../../../styles/TopControls.module.sass";
import Icons from "../../../Images/Icons";
import { IMediaData, ITranslation } from "../../../Interfaces/IMediaData";

interface TopControlsProps {
  season: number;
  episode: number;
  data: IMediaData;
  translation: ITranslation;
  setTranslation: Dispatch<SetStateAction<ITranslation>>;
}

const TopControls: FC<TopControlsProps> = observer(
  ({ season, episode, data, translation, setTranslation }) => {
    const [continueTime, setContinueTime] = useState(false);
    const [isListVisible, setListVisibility] = useState(false);
    const { translations } = data;

    const translateModal = useRef(null);

    useEffect(() => {
      const onClick = (e) =>
        translateModal.current?.contains(e.target) || setListVisibility(false);
      document.addEventListener("click", onClick);
      return () => document.removeEventListener("click", onClick);
    }, []);

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

    const handleContinue = async () => {
      const info = await get("Длительность");
      const search = info?.findIndex(
        (item) => item?.kinopoisk_id === Info?.info?.kp
      );
      const time = info[search]?.currentTime;
      Playlist.setLast(time);
      setContinueTime(false);
    };

    const handleList = (e) => {
      e.stopPropagation();
      if (translations.list.length > 1) {
        setListVisibility((prev) => !prev);
      }
    };

    const handleTranslation = (id: number, name: string, params) => {
      setListVisibility(false);
      setTranslation({ id, name, params });
    };

    return (
      <div className={style.top_controls}>
        <div className={style.top_left}>
          <p className={style.episode_info}>
            {Info?.info?.series
              ? `${data.title}. Сезон ${season}. Серия ${episode}`
              : data.title}
          </p>

          {continueTime !== false && (
            <button onClick={handleContinue} className={style.button_continue}>
              Продолжить
            </button>
          )}
        </div>
        <div className={style.top_right}>
          <div className={style.translation_preview} onClick={handleList}>
            {translation.name}
            {translations.list.length > 1 &&
              (isListVisible ? (
                <Icons
                  icon="ExpandLessIcon"
                  className={style.translations_icon}
                />
              ) : (
                <Icons
                  icon="ExpandMoreIcon"
                  className={style.translations_icon}
                />
              ))}
          </div>
          {isListVisible && translations.list.length > 1 && (
            <div className={style.translations_list} ref={translateModal}>
              {translations.list.map((res) => (
                <span
                  className={style.translation_item}
                  onClick={() =>
                    handleTranslation(res.id, res.name, res.params)
                  }
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
  }
);

export default TopControls;
