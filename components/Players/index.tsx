import React from "react";
import DyadkaPlayer from "./DyadkaPlayer";
import PiratePlayer from "./PiratePlayer";
import { useStore } from "effector-react";
import { $player } from "@models/Player";

const Players = () => {
  const { isPirate } = useStore($player);

  return isPirate ? <PiratePlayer /> : <DyadkaPlayer />;
};

export default Players;
