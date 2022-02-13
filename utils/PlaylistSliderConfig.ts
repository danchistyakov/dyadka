import {IEpisode, ISeason} from '@interfaces/IMediaData';

export const breakpointsSeasons = (playlist: ISeason[]) => ({
  320: {slidesPerView: 3.5},
  768: {
    slidesPerView: playlist.length < 9 ? playlist.length : 9,
  },
});

export const breakpointsEpisodes = (episodes: IEpisode[]) => ({
  320: {slidesPerView: 1.8},
  768: {slidesPerView: episodes.length < 5 ? episodes.length : 5},
})