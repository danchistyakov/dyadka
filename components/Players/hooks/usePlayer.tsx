// import {useRouter} from 'next/router';
// import {ChangeEvent, useEffect, useState} from 'react';
// import {FullScreen, useFullScreenHandle} from 'react-full-screen';
// import {IMedia, IMediaData, ITranslation} from '../../../interfaces/IMediaData';
// import {PlayerProps} from '../interfaces/IPlayer';
// import GetUrl from './GetUrl';
import { MutableRefObject, useEffect, useRef } from "react";
import { $player } from "@models/Player";
import { useStore } from "effector-react/ssr";

const usePlayer = (controlsRef: MutableRefObject<HTMLInputElement | null>) => {
  const { isFullscreen, isPlaying } = useStore($player);
  const controlsTimeout = useRef(null);

  const onMouseMove = () => {
    clearTimeout(controlsTimeout.current);
    controlsRef.current.style.visibility = "visible";
    document.body.style.cursor = "auto";
    if (isFullscreen && isPlaying) {
      controlsTimeout.current = setTimeout(() => {
        controlsRef.current.style.visibility = "hidden";
        document.body.style.cursor = "none";
      }, 3000);
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      clearTimeout(controlsTimeout.current);
    }
    return () => clearTimeout(controlsTimeout.current);
  }, [isPlaying]);

  return {
    onMouseMove,
  };
};

export default usePlayer;
