import { root } from "@models/Root";
import { combine } from "effector";
import { IEpisode, ISeason } from "@interfaces/IMediaData";

export const setSeason = root.createEvent<number>();
export const setEpisode = root.createEvent<number>();
export const setEpisodes = root.createEvent<ISeason>();
export const setPrevEpisode = root.createEvent();
export const setNextEpisode = root.createEvent();

export const $season = root
  .createStore<number>(1)
  .on(setSeason, (_, season) => season);

export const $episodes = root
  .createStore<IEpisode[]>([])
  .on(setEpisodes, (_, season) => season.episodes);

export const $episode = root
  .createStore<number>(1)
  .on(setEpisode, (_, episode) => episode);

export const $playlistData = combine({
  season: $season,
  episode: $episode,
});
