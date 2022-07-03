import {MouseEvent, MutableRefObject} from 'react';
import {combine, createEvent, createStore} from 'effector';
import {root} from '@models/Root';
import {createGate} from 'effector-react';
import {formatProgress, formatTime} from '@components/Players/DyadkaPlayer/utils/PlayerUtils';

export const setVisibility = root.createEvent<boolean>();
export const setDuration = root.createEvent<number>();
export const setBuffering = root.createEvent<boolean>();
export const setControls = root.createEvent<boolean>();
export const setMute = root.createEvent<boolean>();
export const setPirate = root.createEvent<boolean>();
export const setPlaying = root.createEvent<boolean>();
export const negativePlaying = root.createEvent();
export const setCurrentTime = root.createEvent<any>();
export const setProgress = root.createEvent<any>();
export const setSeekValue = root.createEvent<MouseEvent<HTMLElement>>();
export const setSpeed = root.createEvent<number>();
export const setVolume = root.createEvent<number>();
export const setFullscreen = createEvent<boolean>();
export const toggleFullscreen = createEvent();

export const playerContainerGate = createGate<MutableRefObject<HTMLInputElement | null>>();
export const controlsGate = createGate<MutableRefObject<HTMLInputElement | null>>();
export const playerGate = createGate<MutableRefObject<HTMLInputElement | null>>();

export const $controls = createStore<MutableRefObject<HTMLInputElement | null> | null>(null);
export const $currentTime = createStore<number>(0)
    .on(setCurrentTime, (_, value) => value);
export const $duration = createStore<number>(0)
    .on(setDuration, (_, value) => value);
export const $playerContainer = createStore<MutableRefObject<HTMLInputElement | null> | null>(null);
export const $seekValue = createStore<number>(0)
    .on(setSeekValue, (_, e) => e.clientX / e.currentTarget.scrollWidth);
export const $isVisible = createStore<boolean>(false).on(setVisibility, (_, value) => value);
export const $progress = createStore<number>(0)
    .on(setProgress, (_, e) => e.clientX / e.currentTarget.scrollWidth);
export const $isBuffering = root.createStore<boolean>(true)
    .on(setBuffering, (_, isBuffering: boolean) => isBuffering);
export const $isFullscreen = createStore<boolean>(false)
    .on(setFullscreen, (_, value: boolean) => value);
export const $isMuted = root.createStore<boolean>(false)
    .on(setMute, (_, isMuted: boolean) => isMuted);
export const $isPirate = root.createStore<boolean>(false)
    .on(setPirate, (_, isPirate: boolean) => isPirate);
export const $isPlaying = root.createStore<boolean>(true)
    .on(setPlaying, (_, isPlaying: boolean) => isPlaying)
    .on(negativePlaying, (isPlaying: boolean) => !isPlaying);
export const $speed = root.createStore<number>(1).on(setSpeed, (_, speed: number) => speed);
export const $volume = root.createStore<number>(1).on(setVolume, (_, volume: number) => volume)


export const $player = combine({
    currentTime: $currentTime,
    duration: $duration,
    isBuffering: $isBuffering,
    isFullscreen: $isFullscreen,
    isMuted: $isMuted,
    isPirate: $isPirate,
    isPlaying: $isPlaying,
    playerContainer: $playerContainer,
    progress: $progress,
    seekValue: $seekValue,
    speed: $speed,
    volume: $volume,
});

//$progress.watch(console.log)