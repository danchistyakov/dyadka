import {combine, sample} from 'effector';
import {$seasons} from '@models/FilmData';
import {ISeason} from '@interfaces/IMediaData';
import {showPlayer} from '@components/Players/utils/showPlayer';
import {setVisibility} from '@models/Player';
import {nextEpisode, prevEpisode} from '@components/Players/utils/changeEpisode';
import {
  $episode,
  $season,
  setEpisode,
  setEpisodes,
  setNextEpisode,
  setPrevEpisode,
  setSeason
} from '@models/Playlist';

sample({
  clock: [$seasons, setSeason],
  source: combine({season: $season, seasons: $seasons}),
  fn: (({season, seasons}, _): ISeason => seasons[season - 1]),
  target: setEpisodes,
})

sample({
  clock: setEpisode,
  source: $episode,
  fn: showPlayer,
  target: setVisibility,
})

sample({
  clock: setPrevEpisode,
  source: {seasons: $seasons, season: $season, episode: $episode},
  fn: ((sourceData): number => prevEpisode(sourceData)),
  target: setEpisode,
})

sample({
  clock: setNextEpisode,
  source: {seasons: $seasons, season: $season, episode: $episode},
  fn: ((sourceData): number => nextEpisode(sourceData)),
  target: setEpisode,
})