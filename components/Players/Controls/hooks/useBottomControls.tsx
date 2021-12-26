import { ChangeEvent } from "react";
import { BottomControlsProps } from "../interfaces/IControls";
import { ISeason } from "../../../../interfaces/IMediaData";
import { FullScreenHandle } from "react-full-screen";

const useBottomControls = (
  fullScreenHandle: FullScreenHandle,
  handleMute: (value: boolean) => void,
  handlePirate: (value: boolean) => void,
  handlePlaying: (value: boolean) => void,
  handleSeekChange: (e: any, newValue: number) => void,
  handleVolume: (e: ChangeEvent<HTMLInputElement>) => void,
  isMuted: boolean,
  isPlaying: boolean,
  playlist: ISeason[],
  prevEpisode: (season: number, episode: number) => void,
  nextEpisode: (season: number, episode: number) => void,
  volume: number
): BottomControlsProps => {
  return {
    fullScreenHandle,
    isMuted,
    prevEpisode,
    nextEpisode,
    handleMute,
    handlePirate,
    handlePlaying,
    handleSeekChange,
    handleVolume,
    isPlaying,
    volume,
  };
};

export default useBottomControls;
