import { sample } from 'effector';
import { $data, $kpId, $translation } from '@models/FilmData';
import { $episode, $season } from '@models/Playlist';
import { getUrlsPayload } from '@interfaces/IMediaData';
import { $quality, $url, $urls, getUrlsFx } from '@models/Video';
import { $isBuffering, $isPlaying, playerContainerGate } from '@models/Player';

sample({
  clock: [$translation, $episode],
  source: {
    data: $data,
    kpId: $kpId,
    translation: $translation,
    season: $season,
    episode: $episode,
  },
  fn: ({ data, kpId, translation, season, episode }, _): getUrlsPayload => ({
    isSeries: data.isSeries,
    kpId,
    translation: translation.id,
    season,
    episode,
  }),
  target: getUrlsFx,
});

sample({
  clock: [$translation, $episode],
  fn: () => null,
  target: $url,
});

sample({
  clock: [$translation, $episode],
  fn: () => true,
  target: [$isBuffering, $isPlaying],
});

sample({
  clock: [$quality],
  source: { quality: $quality, urls: $urls },
  fn: ({ quality, urls }): string => urls[quality].streams[0],
  target: $url,
});
