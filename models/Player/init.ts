import { forward, sample } from 'effector';
import {
  $controls,
  $isFullscreen,
  $playerContainer,
  controlsGate,
  playerContainerGate,
  toggleFullscreen,
} from '@models/Player';
import { onToggleFullscreen } from '@components/Players/DyadkaPlayer/utils/PlayerUtils';

forward({ from: playerContainerGate.state, to: $playerContainer });
forward({ from: controlsGate.state, to: $controls });

sample({
  clock: toggleFullscreen,
  source: { isFullscreen: $isFullscreen, fullscreenRef: $playerContainer },
  fn: (sourceData) => onToggleFullscreen(sourceData),
});

// sample({
//   clock: exitFullscreen,
//   source: $playerContainer,
//   fn: onExitFullscreen,
//   target: $isFullscreen,
// });
