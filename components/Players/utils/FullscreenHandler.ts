import fscreen from 'fscreen';
import {MutableRefObject} from 'react';


export const onEnterFullscreen = (fullscreenRef: MutableRefObject<HTMLInputElement | null>): boolean  => {
  if (fscreen.fullscreenElement) {
     fscreen.exitFullscreen();
  }
  fscreen.requestFullscreen(fullscreenRef.current);

  return true
};

export const onExitFullscreen = (fullscreenRef: MutableRefObject<HTMLInputElement | null>): boolean => {
  if (fscreen.fullscreenElement === fullscreenRef.current) {
    fscreen.exitFullscreen();
  }
  return false
};