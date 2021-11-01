import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import Info from "../Store/Info";
import Playlist from "../Store/Playlist";
import { get, set } from "idb-keyval";
import PlayerControls from "../Store/PlayerControls";
import style from "../styles/TopControls.module.sass";
import Icons from "../Images/Icons";
import Video from "../Store/Video";
import { GetUrl } from "./GetUrl";

const TopControls = observer(() => {
  const [translations, setTranslations] = useState(null);
  const [continueTime, setContinueTime] = useState(false);
  const translateModal = useRef(null);

  useEffect(() => {
    const onClick = (e) =>
      translateModal.current?.contains(e.target) || setTranslations(false);
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
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
  }, [Info?.info?.kp]);

  const handleContinue = async () => {
    const info = await get("Длительность");
    const search = info?.findIndex(
      (item) => item?.kinopoisk_id === Info?.info?.kp
    );
    const time = info[search]?.currentTime;
    Playlist.setLast(time);
    setContinueTime(false);
  };

  const handleTranslation = async (id, name, params) => {
    setTranslations(!translations);
    const options = params ? params : null;
    if (Video.translation.id !== id) {
      Video.setTranslation(id, name, options);
      await GetUrl();
    }
  };

  return (
    <div className={style.top_controls}>
      <div className={style.top_left}>
        {Info?.info?.series && (
          <p className={style.episode_info}>
            {Info?.info?.title}. Сезон {Playlist?.season}. Серия{" "}
            {Playlist?.episode}
          </p>
        )}

        {continueTime !== false && (
          <button onClick={handleContinue} className={style.button_continue}>
            Продолжить
          </button>
        )}
      </div>
      <div className={style.top_right} key={translations}>
        <div
          className={style.translation_preview}
          onClick={(e) => {
            e.stopPropagation();
            Playlist?.translations?.length > 1 &&
              setTranslations(!translations);
          }}
        >
          {Video?.translation?.name}
          {Playlist?.translations?.length > 1 &&
            (translations ? (
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
        {translations && Playlist?.translations?.length > 1 && (
          <div className={style.translations_list} ref={translateModal}>
            {Playlist?.translations?.map((res, key) => (
              <span
                className={style.translation_item}
                onClick={() =>
                  Info.info.series
                    ? handleTranslation(res?.id, res?.name)
                    : handleTranslation(res?.id, res?.name, res?.params)
                }
                key={res?.id}
              >
                {res?.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default TopControls;
