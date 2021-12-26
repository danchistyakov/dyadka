import { ISeason } from "../../../interfaces/IMediaData";
import Layout from "../../../Store/Layout";
import { EpisodesProps } from "../interfaces/IPlaylist";

const useEpisodes = (data: ISeason[], season: number): EpisodesProps => {
  const breakpointsEpisodes = {
    320: { slidesPerView: 1.8 },
    768: {
      slidesPerView: data.length < 5 ? data[season - 1].episodes.length : 5,
    },
  };
  const changeEpisode = (episode: number) => {
    Layout.setWatch(true);
    window.scrollTo(0, 0);
  };

  return { breakpointsEpisodes, data, season, changeEpisode };
};

export default useEpisodes;
