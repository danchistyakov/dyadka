import { useRef, useState } from "react";
import { useFullScreenHandle } from "react-full-screen";
import PlayerControls from "../../../Store/PlayerControls";
import Volume from "../../../Store/Volume";

let timer;
const usePlayer = () => {
  const [isPlaying, setPlaying] = useState<boolean>(true);
  const playerContainer = useRef(null);
  const playerRef = useRef(null);
  const controlsRef = useRef(null);
  const fullScreenHandle = useFullScreenHandle();

  const onClickHandler = (e, action) => {
    clearTimeout(timer);
    if (e.detail === 1) {
      timer = setTimeout(() => setPlaying((prev) => !prev), 200);
    } else if (e.detail === 2) {
      if (action === "rewind") {
        playerRef.current.getCurrentTime() > 5
          ? playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5)
          : playerRef.current.seekTo(0);
      }
      if (action === "forward") {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
      }
    }
  };

  const handleKeys = (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      PlayerControls.setPlaying(!PlayerControls?.playing);
    }

    if (e.code === "ArrowLeft") {
      e.preventDefault();
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
    }

    if (e.code === "ArrowRight") {
      e.preventDefault();
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
    }

    if (e.code === "ArrowUp") {
      e.preventDefault();
      PlayerControls.setMute(false);
      if (Volume.volume <= 0.95) {
        Volume.setVolume((Number(Volume.volume) + 0.05).toFixed(2));
      } else {
        Volume.setVolume(1);
      }
    }

    if (e.code === "ArrowDown") {
      e.preventDefault();
      if (Volume.volume >= 0.05) {
        Volume.setVolume(Number(Volume.volume - 0.05).toFixed(2));
      } else {
        Volume.setVolume(0);
        PlayerControls.setMute(true);
      }
    }
  };

  return { onClickHandler };
};

export default usePlayer;
