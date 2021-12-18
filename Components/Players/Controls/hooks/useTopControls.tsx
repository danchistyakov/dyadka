import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { TopControlsProps } from "../interfaces/IControls";
import { IMediaData } from "../../../../interfaces/IMediaData";

const useTopControls = (data: IMediaData): TopControlsProps => {
  const router = useRouter();
  const { pathname, query } = router;
  const { season, episode, translationId } = query;
  const { isSeries, title, translations } = data;
  const { name: defaultTranslation } = data.translations.list.find(
    (item) => item.id === Number(translationId)
  );
  const [isContinuing, setContinuing] = useState<boolean>(false);
  const [isListVisible, setListVisibility] = useState<boolean>(false);
  const [translationName, setTranslationName] = useState<string>(
    defaultTranslation || data.translations.list[0].name
  );

  const translateModal = useRef(null);

  useEffect(() => {
    const onClick = (e) =>
      translateModal.current?.contains(e.target) || setListVisibility(false);
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const handleContinue = () => {
    setContinuing(false);
    /*const info = await get("Длительность");
    const search = info?.findIndex(
      (item) => item?.kinopoisk_id === Info?.info?.kp
    );
    const time = info[search]?.currentTime;
    setContinueTime(false);*/
  };

  const handleList = (e) => {
    e.stopPropagation();
    if (translations.list.length > 1) {
      setListVisibility((prev) => !prev);
    }
  };

  const handleTranslation = (translationId: number, name: string, params) => {
    router.push(
      {
        pathname,
        query: { ...query, translationId },
      },
      undefined,
      { shallow: true }
    );
    setTranslationName(name);
    setListVisibility(false);
  };

  return {
    isContinuing,
    isListVisible,
    isSeries,
    season: Number(season),
    episode: Number(episode),
    handleContinue,
    handleList,
    handleTranslation,
    title,
    translations,
    translationName,
  };
};

export default useTopControls;
