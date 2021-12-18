import { Dispatch, FC, SetStateAction, useEffect } from "react";

interface PiratePlayerProps {
  kpId: number;
  season: number;
  episode: number;
  handlePirate: (value: boolean) => void;
}

const PiratePlayer: FC<PiratePlayerProps> = ({
  kpId,
  season,
  episode,
  handlePirate,
}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//yohoho.cc/yo.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [kpId]);

  return (
    <div>
      <div
        id="yohoho"
        className="player"
        data-kinopoisk={kpId}
        data-resize="1"
        data-season={season}
        data-episode={episode}
      ></div>
      <button className="inside_player" onClick={() => handlePirate(false)}>
        Перейти в дядькин плеер
      </button>
    </div>
  );
};

export default PiratePlayer;
