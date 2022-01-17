import { ChangeEvent } from "react";
import { FullScreenHandle } from "react-full-screen";
import { IMediaData, ITranslation } from "../../../../interfaces/IMediaData";

export interface ControlsProps {
  //children: JSX.Element;
  data: IMediaData;
  fullScreenHandle: FullScreenHandle;
  isMuted: boolean;
  isPlaying: boolean;
  handleMute: (value: boolean) => void;
  handlePirate: (value: boolean) => void;
  handlePlaying: (value: boolean) => void;
  handleSeekChange: (e: any, newValue: number) => void;
  handleVolume: (e: ChangeEvent<HTMLInputElement>) => void;
  prevEpisode: (season: number, episode: number) => void;
  nextEpisode: (season: number, episode: number) => void;
  volume: number;
}

export interface TopControlsProps {
  isSeries: boolean;
  title: string;
  season: number;
  episode: number;
  translations: ITranslation[];
  isContinuing: boolean;
  handleContinue: () => void;
  handleList: (e: any) => void;
  handleTranslation: (id: number, name: string, params) => void;
  isListVisible: boolean;
  translationName: string;
}

export interface BottomControlsProps {
  fullScreenHandle: FullScreenHandle;
  isMuted: boolean;
  prevEpisode: (season: number, episode: number) => void;
  nextEpisode: (season: number, episode: number) => void;
  handleMute: (value: boolean) => void;
  handlePirate: (value: boolean) => void;
  handlePlaying: (value: boolean) => void;
  handleSeekChange: (e: any, newValue: number) => void;
  handleVolume: (e: ChangeEvent<HTMLInputElement>) => void;
  isPlaying: boolean;
  volume: number;
}
