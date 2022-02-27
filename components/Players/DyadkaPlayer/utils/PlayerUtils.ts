import { KeyboardEvent, MutableRefObject } from "react";
import { negativePlaying } from "@models/Player";
import fscreen from "fscreen";

export const formatTime = (data: number): string => {
  const date = new Date(data * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  if (hours) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

export const formatProgress = (data: any) => {
  const { played, playedSeconds } = data;
  const playedFormatted = formatTime(playedSeconds);
  return { played, playedFormatted };
};

export const onEnterFullscreen = (
  fullscreenRef: MutableRefObject<HTMLInputElement | null>
): boolean => {
  if (fscreen.fullscreenElement) {
    fscreen.exitFullscreen();
  }
  fscreen.requestFullscreen(fullscreenRef.current);

  return true;
};

export const onExitFullscreen = (
  fullscreenRef: MutableRefObject<HTMLInputElement | null>
): boolean => {
  if (fscreen.fullscreenElement === fullscreenRef.current) {
    fscreen.exitFullscreen();
  }
  return false;
};

export const showPlayer = (): boolean => {
  window.scroll(0, 0);
  return true;
};

export const onKeyboard = (e: KeyboardEvent<HTMLDivElement>, playerRef) => {
  if (e.code === "Space") {
    e.preventDefault();
    negativePlaying();
  }

  if (e.code === "ArrowLeft") {
    e.preventDefault();
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
  }

  if (e.code === "ArrowRight") {
    e.preventDefault();
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
  }

  if (e.code === "ArrowUp") {
    e.preventDefault();
    // PlayerControls.setMute(false);
    // if (Volume.volume <= 0.95) {
    //   Volume.setVolume((Number(Volume.volume) + 0.05).toFixed(2));
    // } else {
    //   Volume.setVolume(1);
    // }
  }

  if (e.code === "ArrowDown") {
    e.preventDefault();
    // if (Volume.volume >= 0.05) {
    //   Volume.setVolume(Number(Volume.volume - 0.05).toFixed(2));
    // } else {
    //   Volume.setVolume(0);
    //   PlayerControls.setMute(true);
    // }
  }
};
