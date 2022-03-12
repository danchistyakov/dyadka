import { MutableRefObject } from 'react';

export interface ToggleFullscreenParams {
  isFullscreen: boolean;
  fullscreenRef: MutableRefObject<HTMLInputElement | null>;
}
