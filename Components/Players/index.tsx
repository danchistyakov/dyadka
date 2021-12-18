import React from "react";
import Player from "./components/Player";
import usePlayer from "./hooks/usePlayer";

const Players = ({ data }) => {
  return <Player {...usePlayer(data)} />;
};

export default Players;
