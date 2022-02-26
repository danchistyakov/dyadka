import { MutableRefObject } from "react";
import { combine, createEvent, createStore } from "effector";
import { root } from "@models/Root";
import { createGate } from "effector-react";
import { setTranslation } from "@models/FilmData";
import { setEpisode } from "@models/Playlist";
import {
  formatProgress,
  formatTime,
} from "@components/Players/components/DyadkaPlayer/utils/PlayerUtils";

export const setVisibility = root.createEvent<boolean>();
export const setDuration = root.createEvent<number>();
export const setProgress = root.createEvent<any>();
export const setBuffering = root.createEvent<boolean>();
export const setControls = root.createEvent<boolean>();
export const setMute = root.createEvent<boolean>();
export const setPirate = root.createEvent<boolean>();
export const setPlaying = root.createEvent<boolean>();
export const negativePlaying = root.createEvent();
export const setSpeed = root.createEvent<number>();
export const setVolume = root.createEvent<number>();
export const setFullscreen = createEvent<boolean>();
export const enterFullscreen = createEvent();
export const exitFullscreen = createEvent();

export const playerContainerGate =
  createGate<MutableRefObject<HTMLInputElement | null>>();

export const controlsGate = createGate<MutableRefObject<HTMLInputElement | null>>();

export const playerGate = createGate<MutableRefObject<HTMLInputElement | null>>();

export const $controls =
  createStore<MutableRefObject<HTMLInputElement | null> | null>(null);

export const $playerContainer =
  createStore<MutableRefObject<HTMLInputElement | null> | null>(null);

export const $isVisible = createStore<boolean>(false).on(
  setVisibility,
  (_, value) => value
);

export const $progress = createStore<any>({ played: 0, playedFormatted: "0:00" }).on(
  setProgress,
  (_, data) => formatProgress(data)
);

export const $duration = createStore<string>("0:00").on(setDuration, (_, value) =>
  formatTime(value)
);

export const $isBuffering = root
  .createStore<boolean>(true)
  .on(setBuffering, (_, isBuffering: boolean) => isBuffering);

export const $isFullscreen = createStore<boolean>(false).on(
  setFullscreen,
  (_, value: boolean) => value
);

export const $isMuted = root
  .createStore<boolean>(false)
  .on(setMute, (_, isMuted: boolean) => isMuted);

export const $isPirate = root
  .createStore<boolean>(false)
  .on(setPirate, (_, isPirate: boolean) => isPirate);

export const $isPlaying = root
  .createStore<boolean>(true)
  .on(setPlaying, (_, isPlaying: boolean) => isPlaying)
  .on(negativePlaying, (isPlaying: boolean) => !isPlaying);

export const $speed = root
  .createStore<number>(1)
  .on(setSpeed, (_, speed: number) => speed);

export const $volume = root
  .createStore<number>(1)
  .on(setVolume, (_, volume: number) => volume);

export const $player = combine({
  duration: $duration,
  isBuffering: $isBuffering,
  isFullscreen: $isFullscreen,
  isMuted: $isMuted,
  isPirate: $isPirate,
  isPlaying: $isPlaying,
  playerContainer: $playerContainer,
  progress: $progress,
  speed: $speed,
  volume: $volume,
});
