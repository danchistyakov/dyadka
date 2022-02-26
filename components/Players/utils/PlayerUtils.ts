import { negativePlaying } from "@models/Player";
import fscreen from "fscreen";
import { KeyboardEvent, MutableRefObject } from "react";

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
