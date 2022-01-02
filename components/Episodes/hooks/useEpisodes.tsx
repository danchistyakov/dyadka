import { ISeason } from "../../../interfaces/IMediaData";
import Layout from "../../../Store/Layout";
import { EpisodesProps } from "../interfaces/IPlaylist";

const useEpisodes = (data: ISeason[], season: number): EpisodesProps => {
  const episodesData =
    data[season - 1]?.episodes.length || data[0]?.episodes.length;
  const slidesPerView = episodesData < 5 ? episodesData : 5;

  const breakpointsEpisodes = {
    320: { slidesPerView: 1.8 },
    768: { slidesPerView },
  };

  const changeEpisode = (episode: number) => {
    Layout.setWatch(true);
    window.scrollTo(0, 0);
  };

  return { breakpointsEpisodes, data, season, changeEpisode };
};

export default useEpisodes;
