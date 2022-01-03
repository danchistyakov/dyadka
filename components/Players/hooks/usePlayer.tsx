import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { IMediaData, ITranslation } from "../../../interfaces/IMediaData";
import Volume from "../../../Store/Volume";
import { PlayerProps } from "../interfaces/IPlayer";
import GetUrl from "./GetUrl";

const usePlayer = (data: IMediaData): PlayerProps => {
  const [isBuffering, setBuffering] = useState<boolean>(true);
  const [isMuted, setMute] = useState<boolean>(false);
  const [isPlaying, setPlaying] = useState(true);
  const [isPirate, setPirate] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);
  const [volume, setVolume] = useState<number>(100);
  const fullScreenHandle = useFullScreenHandle();
  const router = useRouter();
  const { pathname, query } = router;
  const { translationId, season, episode } = query;

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
          query: { ...query, episode: episode - 1 },
        },
        undefined,
        { shallow: true }
      );
    }
    if (season > 1) {
      return router.push(
        {
          pathname,
          query: { ...query, season: season - 1, episode: 1 },
        },
        undefined,
        { shallow: true }
      );
    }

    return;
  };

  const nextEpisode = (season: number, episode: number) => {
    const seasonsAmount = data.seasons.length;
    const seasonLength = data.seasons[season - 1].episodes.length;

    if (episode < seasonLength) {
      return router.push(
        {
          pathname,
          query: { ...query, episode: episode + 1 },
        },
        undefined,
        { shallow: true }
      );
    }

    if (season >= seasonsAmount) {
      return;
    }

    if (episode >= seasonLength) {
      return router.push(
        {
          pathname,
          query: { ...query, season: season + 1, episode: 1 },
        },
        undefined,
        { shallow: true }
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
        translationData = data.translations.list.find(
          (item) => item.id === Number(translationId)
        );
      } else {
        if (data.isSeries) {
          translation =
            data.translations.list[0].id || data.translations.default.id;
        }
        translation =
          data.translations.list[0].id || data.translations.default.id;
        translationData = data.translations.list[0];
      }
      let urlString;
      if (!translationData && !data.isSeries) {
        urlString = data.media[0].urls[0];
      } else {
        urlString = await GetUrl(
          data,
          Number(season) || 1,
          Number(episode) || 1,
          translation,
          translationData
        );
      }

      setUrl(urlString);
      setPlaying(true);
    };
    Fetch();
  }, [data, translationId, season, episode]);

  useEffect(() => {
    if (!fullScreenHandle.active) {
      document.body.style.cursor = "auto";
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
