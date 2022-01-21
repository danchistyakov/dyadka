import {useRouter} from 'next/router';
import {ChangeEvent, useEffect, useState} from 'react';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';
import {IMediaData, ITranslation} from '../../../interfaces/IMediaData';
import Volume from '../../../store/Volume';
import {PlayerProps} from '../interfaces/IPlayer';
import GetUrl from './GetUrl';

const usePlayer = (data: IMediaData): PlayerProps => {
  const [isBuffering, setBuffering] = useState<boolean>(true);
  const [isMuted, setMute] = useState<boolean>(false);
  const [isPlaying, setPlaying] = useState(true);
  const [isPirate, setPirate] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);
  const [volume, setVolume] = useState<number>(100);
  const fullScreenHandle = useFullScreenHandle();
  const router = useRouter();
  const {pathname, query} = router;
  const {translationId, season, episode} = query;

  const handleBuffering = (value: boolean) => {
    setBuffering(value);
  };

  const handlePirate = (value: boolean) => {
    setPirate(value);
  };

  const handlePlaying = (value: boolean) => {
    setPlaying(value);
  };

  const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const handleMute = (value: boolean) => {
    setMute(value);
  };

  const prevEpisode = (season: number, episode: number) => {
    if (episode > 1) {
      return router.push(
        {
          pathname,
          query: {...query, episode: episode - 1},
        },
        undefined,
        {shallow: true}
      );
    }
    if (season > 1) {
      return router.push(
        {
          pathname,
          query: {...query, season: season - 1, episode: 1},
        },
        undefined,
        {shallow: true}
      );
    }

    return;
  };

  const nextEpisode = (season: number, episode: number) => {
    const seasonsAmount = data.playlist.length;
    const seasonLength = data.playlist[season - 1].episodes.length;

    if (episode < seasonLength) {
      return router.push(
        {
          pathname,
          query: {...query, episode: episode + 1},
        },
        undefined,
        {shallow: true}
      );
    }

    if (season >= seasonsAmount) {
      return;
    }

    if (episode >= seasonLength) {
      return router.push(
        {
          pathname,
          query: {...query, season: season + 1, episode: 1},
        },
        undefined,
        {shallow: true}
      );
    }
  };

  useEffect(() => {
    const Fetch = async () => {
      setUrl(null);
      setBuffering(true);
      let translationData: ITranslation;
      let translation: number;
      if (translationId) {
        translation = Number(translationId);
        translationData = data.translations.find(
          (item) => item.id === Number(translationId)
        );
      } else {
        if (data.isSeries) {
          translation = data.translations[0].id;
        }
        translation = data.translations[0].id;
        translationData = data.translations[0];
      }
      let urlString;
      if (!translationData && !data.isSeries) {
        urlString = data.urls[0].streams[0];
      } else {
        urlString = await GetUrl(
          data.kpId,
          data.isSeries,
          season || '1',
          episode || '1',
          translation
        );
      }

      setUrl(urlString);
      setPlaying(true);
    };
    Fetch();
  }, [data, translationId, season, episode]);

  useEffect(() => {
    if (!fullScreenHandle.active) {
      document.body.style.cursor = 'auto';
    }
  }, [fullScreenHandle.active]);

  return {
    data,
    isBuffering,
    isMuted,
    isPirate,
    isPlaying,
    handleBuffering,
    handleMute,
    handlePirate,
    handlePlaying,
    handleVolume,
    prevEpisode,
    nextEpisode,
    fullScreenHandle,
    url,
    volume,
  };
};

export default usePlayer;
