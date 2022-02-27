import { forward, sample } from "effector";
import {
  onEnterFullscreen,
  onExitFullscreen,
} from "@components/Players/DyadkaPlayer/utils/PlayerUtils";
import {
  $controls,
  $isFullscreen,
  $playerContainer,
  controlsGate,
  enterFullscreen,
  exitFullscreen,
  playerContainerGate,
} from "@models/Player";

forward({ from: playerContainerGate.state, to: $playerContainer });
forward({ from: controlsGate.state, to: $controls });

sample({
  clock: enterFullscreen,
  source: $playerContainer,
  fn: onEnterFullscreen,
  target: $isFullscreen,
});

sample({
  clock: exitFullscreen,
  source: $playerContainer,
  fn: onExitFullscreen,
  target: $isFullscreen,
});
