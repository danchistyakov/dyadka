import { useEffect, useRef } from 'react';
import { $player } from '@models/Player';
import { useStore } from 'effector-react/ssr';
import useUpdateEffect from '@hooks/useUpdateEffect';

const usePlayer = () => {
  const { isFullscreen, isPlaying, seekValue } = useStore($player);
  const controlsTimeoutRef = useRef(null);
  const controlsRef = useRef(null);
  const playerRef = useRef(null);

  const hideControls = () => {
    if (isFullscreen && isPlaying) {
      //controlsRef.current.style.opacity = '0';
      controlsRef.current.classList.add('hidden');
      //controlsRef.current.style.visibility = 'hidden';
      document.body.style.cursor = 'none';
    }
  };

  const showControls = () => {
    clearTimeout(controlsTimeoutRef.current);
    //controlsRef.current.style.opacity = '1';
    controlsRef.current.classList.remove('hidden');
    //controlsRef.current.style.visibility = 'visible';
    document.body.style.cursor = 'auto';
  };

  const onMouseMove = () => {
    showControls();
    if (isFullscreen && isPlaying) {
      controlsTimeoutRef.current = setTimeout(hideControls, 3000);
    }
  };

  useEffect(() => {
    if (!isPlaying || !isFullscreen) {
      showControls();
    } else {
      controlsTimeoutRef.current = setTimeout(hideControls, 3000);
    }
    return () => clearTimeout(controlsTimeoutRef.current);
  }, [isFullscreen, isPlaying]);

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
