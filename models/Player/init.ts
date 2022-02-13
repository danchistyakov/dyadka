import {forward, sample} from 'effector';
import {onEnterFullscreen, onExitFullscreen} from '@components/Players/utils/FullscreenHandler';
import {
  $isFullscreen,
  $playerContainer,
  enterFullscreen,
  exitFullscreen,
  playerContainerGate,
} from '@models/Player';

forward({from: playerContainerGate.state, to: $playerContainer});

sample({
  clock: enterFullscreen,
  source: $playerContainer,
  fn: onEnterFullscreen,
  target: $isFullscreen,
})

sample({
  clock: exitFullscreen,
  source: $playerContainer,
  fn: onExitFullscreen,
  target: $isFullscreen,
})