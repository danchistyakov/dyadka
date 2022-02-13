import {PlaylistStatus} from '@interfaces/IMediaData';
import {setSeason} from '@models/Playlist';

export const prevEpisode = (data: PlaylistStatus): number => {
  const {seasons, season, episode} = data;

  if (episode > 1) {
    return episode - 1
  }

  if (season > 1) {
    setSeason(season - 1);
    const episodes = seasons[season - 2].episodes;
    return episodes[episodes.length - 1].episode;
  }

  return episode
};

export const nextEpisode = (data: PlaylistStatus): number => {
  const {seasons, season, episode} = data;
  const seriesLength = seasons.length;
  const seasonLength = seasons[season - 1].episodes.length;

  if (episode < seasonLength) {
    return episode + 1;
  }

  if (season < seriesLength) {
    setSeason(season + 1);
    return 1;
  }

  return episode
};
