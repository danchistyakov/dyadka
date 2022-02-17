import React, { useEffect, useRef, useState } from "react";
import { useEvent, useList, useStore } from "effector-react/ssr";
import styles from "../styles/Translations.module.scss";
import Icons from "../../../../../../images/Icons";
import { $translations, $translationsData, setTranslation } from "@models/FilmData";

const Translations = () => {
  const [isVisible, setVisibility] = useState<boolean>(false);
  const { translation, translations } = useStore($translationsData);
  const onTranslation = useEvent(setTranslation);
  const translateModal = useRef(null);

  const handleList = (e) => {
    e.stopPropagation();
    if (translations.length > 1) {
      setVisibility((prev) => !prev);
    }
  };

  useEffect(() => {
    const onClick = (e) =>
      translateModal.current?.contains(e.target) || setVisibility(false);
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const translationsUI = useList($translations, ({ id, title }) => (
    <span
      className={styles.item}
      onClick={() => {
        onTranslation({ id, title });
        setVisibility(false);
      }}
    >
      {title}
    </span>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.selector} onClick={handleList}>
        <p>{translation.title}</p>
        {translations.length > 1 &&
          (isVisible ? (
            <Icons icon="ExpandLessIcon" className={styles.icon} />
          ) : (
            <Icons icon="ExpandMoreIcon" className={styles.icon} />
          ))}
      </div>
      {isVisible && translations.length > 1 && (
        <div className={styles.list} ref={translateModal}>
          {translationsUI}
        </div>
      )}
    </div>
  );
};

export default Translations;
