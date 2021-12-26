import { ChangeEvent } from "react";
import { FullScreenHandle } from "react-full-screen";
import { IMediaData } from "../../../interfaces/IMediaData";

export interface PlayerProps {
  data: IMediaData;
  fullScreenHandle: FullScreenHandle;
  isBuffering: boolean;
  isMuted: boolean;
  isPirate: boolean;
  isPlaying: boolean;
  handleBuffering: (value: boolean) => void;
  handleMute: (value: boolean) => void;
  handlePirate: (value: boolean) => void;
  handlePlaying: (value: boolean) => void;
  handleVolume: (e: ChangeEvent<HTMLInputElement>) => void;
  prevEpisode: (season: number, episode: number) => void;
  nextEpisode: (season: number, episode: number) => void;
  url: string;
  volume: number;
}
