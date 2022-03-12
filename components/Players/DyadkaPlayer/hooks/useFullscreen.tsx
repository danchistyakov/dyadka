import React, { useCallback, useEffect } from 'react';
import fscreen from 'fscreen';
import { setFullscreen } from '@models/Player';
import { useEvent } from 'effector-react/ssr';

const useFullscreen = () => {
  const setFullscreenFn = useEvent(setFullscreen);
  const handleFullscreenChange = useCallback(() => {
    if (fscreen.fullscreenElement !== null) {
      setFullscreenFn(true);
    } else {
      setFullscreenFn(false);
    }
  }, []);

  useEffect(() => {
    fscreen.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => fscreen.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);
};

export default useFullscreen;
