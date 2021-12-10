import { useState, useEffect } from "react";
import { SeasonsProps } from "../interfaces/IPlaylist";

const useSeasons = (data): SeasonsProps => {
  const [season, setSeason] = useState<number>(1);
  const breakpointsSeasons = {
    320: { slidesPerView: 3.5 },
    768: {
      slidesPerView: data.length < 9 ? data.length : 9,
    },
  };

  return { breakpointsSeasons, data, season, setSeason };
};

export default useSeasons;