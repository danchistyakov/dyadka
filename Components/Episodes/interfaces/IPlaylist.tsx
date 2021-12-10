import { Dispatch, SetStateAction } from "react";
import { SwiperOptions } from "swiper";
import { IEpisode, ISeason } from "../../../Interfaces/IMediaData";

interface Breakpoints {
  [width: number]: SwiperOptions;
  [ratio: string]: SwiperOptions;
}
export interface PlaylistProps {
  data: ISeason[];
}

export interface SeasonsProps {
  breakpointsSeasons: Breakpoints;
  data: ISeason[];
  season: number;
  setSeason: Dispatch<SetStateAction<number>>;
}

export interface EpisodesProps {
  breakpointsEpisodes: Breakpoints;
  data: ISeason[];
  season: number;
  changeEpisode: (episode: number) => void;
}
