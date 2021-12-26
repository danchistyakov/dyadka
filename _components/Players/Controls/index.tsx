import { FC } from "react";
import { ControlsProps } from "./interfaces/IControls";
import TopControls from "./components/TopControls";
import BottomControls from "./components/BottomControls";
import useTopControls from "./hooks/useTopControls";
import useBottomControls from "./hooks/useBottomControls";

const Controls: FC<ControlsProps> = ({
  data,
  fullScreenHandle,
  isMuted,
  isPlaying,
  handleMute,
  handlePirate,
  handlePlaying,
  handleSeekChange,
  handleVolume,
  prevEpisode,
  nextEpisode,
  volume,
}) => {
  return (
    <>
      <TopControls {...useTopControls(data)} />
      {/*children*/}
      <BottomControls
        {...useBottomControls(
          fullScreenHandle,
          handleMute,
          handlePirate,
          handlePlaying,
          handleSeekChange,
          handleVolume,
          isMuted,
          isPlaying,
          data.seasons,
          prevEpisode,
          nextEpisode,
          volume
        )}
      />
    </>
  );
};

export default Controls;
