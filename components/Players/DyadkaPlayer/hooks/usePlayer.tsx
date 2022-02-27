import { useEffect, useRef } from 'react';
import { $player } from '@models/Player';
import { useStore } from 'effector-react/ssr';
import useUpdateEffect from '@hooks/useUpdateEffect';

const usePlayer = () => {
  const { isFullscreen, isPlaying, seekValue } = useStore($player);
  const controlsTimeoutRef = useRef(null);
  const controlsRef = useRef(null);
  const playerRef = useRef(null);

  const onMouseMove = () => {
    clearTimeout(controlsTimeoutRef.current);
    controlsRef.current.style.visibility = 'visible';
    document.body.style.cursor = 'auto';
    if (isFullscreen && isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        controlsRef.current.style.visibility = 'hidden';
        document.body.style.cursor = 'none';
      }, 3000);
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      clearTimeout(controlsTimeoutRef.current);
    }
    return () => clearTimeout(controlsTimeoutRef.current);
  }, [isPlaying]);

  useUpdateEffect(() => {
    playerRef.current.seekTo(seekValue);
  }, [seekValue]);

  return {
    onMouseMove,
    controlsRef,
    playerRef,
  };
};

export default usePlayer;
