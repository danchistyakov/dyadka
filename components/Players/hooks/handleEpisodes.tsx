import { Dispatch, SetStateAction } from "react";
import Info from "../../../store/Info";

export const prevEpisode = async (
  season: number,
  episode: number,
  setSeason: Dispatch<SetStateAction<number>>,
  setEpisode: Dispatch<SetStateAction<number>>,
  setPlaying: Dispatch<SetStateAction<boolean>>
) => {
  /*if (season === 1 && episode === 1) {
      return playerRef.current.seekTo(0);
    }*/
  //Video.setUrl(null);

  if (episode > 1) {
    setEpisode((prev) => prev + 1);
    //await GetUrl();
    return setPlaying(true);
  }

  if (season > 1) {
    setSeason((prev) => prev - 1);
    setEpisode(1);
    //await GetUrl();
    return setPlaying(true);
  }
};

export const nextEpisode = async (
  season: number,
  episode: number,
  seasonLength: number,
  seriesLength: number,
  setSeason: Dispatch<SetStateAction<number>>,
  setEpisode: Dispatch<SetStateAction<number>>,
  setPlaying: Dispatch<SetStateAction<boolean>>
) => {
  //Video.setUrl(null);
  if (episode < seasonLength) {
    setEpisode((prev) => prev + 1);
    //await GetUrl();
    return setPlaying(true);
  }
  if (season < seriesLength) {
    setSeason((prev) => prev + 1);
    setEpisode(1);
    //await GetUrl();
    return setPlaying(true);
  }
};
