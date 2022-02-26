import React from "react";
import DyadkaPlayer from "./components/DyadkaPlayer";
import { useStore } from "effector-react";
import { $player } from "@models/Player";
import PiratePlayer from "@components/Players/components/PiratePlayer";

const Players = () => {
  const { isPirate } = useStore($player);

  return isPirate ? <PiratePlayer /> : <DyadkaPlayer />;
};

export default Players;
