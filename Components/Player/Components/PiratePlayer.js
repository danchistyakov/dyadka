import React from "react";

const PiratePlayer = () => {
  return (
    <div key={Info?.info?.kp}>
      <div
        id="yohoho"
        className="player"
        data-kinopoisk={Info.info.kp_id}
        data-resize="1"
        data-season={Playlist?.season}
        data-episode={Playlist?.episode}
      ></div>
      <button className="inside_player" onClick={() => setPirate(false)}>
        Перейти в дядькин плеер
      </button>
    </div>
  );
};

export default PiratePlayer;
