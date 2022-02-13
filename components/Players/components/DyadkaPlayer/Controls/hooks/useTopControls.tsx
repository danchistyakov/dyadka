import {useEffect, useState, useRef} from 'react';
import {useRouter} from 'next/router';
import {TopControlsProps} from '../interfaces/IControls';
import {IMediaData} from '@interfaces/IMediaData';

const useTopControls = (data: IMediaData): TopControlsProps => {
  const router = useRouter();
  const {pathname, query} = router;
  const {season, episode} = query;
  const {isSeries, title, translations} = data;
  const [isContinuing, setContinuing] = useState<boolean>(false);
  const [isListVisible, setListVisibility] = useState<boolean>(false);
  const [translation, setTranslation] = useState<string>(data.translations[0].title);

  const translateModal = useRef(null);

  useEffect(() => {
    const onClick = (e) =>
      translateModal.current?.contains(e.target) || setListVisibility(false);
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
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
    if (translations.length > 1) {
      setListVisibility((prev) => !prev);
    }
  };

  const handleTranslation = (translationId: number, title: string) => {
    router.push(
      {
        pathname,
        query: {...query, translationId},
      },
      undefined,
      {shallow: true}
    );
    setTranslation(title);
    setListVisibility(false);
  };

  return {
    handleContinue,
    handleList,
    handleTranslation,
    isContinuing,
    isListVisible,
    isSeries,
    season: Number(season),
    episode: Number(episode),
    title,
    translation,
    translations: data.translations,
  };
};

export default useTopControls;
