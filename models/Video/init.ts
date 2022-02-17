import { sample } from "effector";
import { $data, $kpId, $translation } from "@models/FilmData";
import { $episode, $season } from "@models/Playlist";
import { getUrlsPayload } from "@interfaces/IMediaData";
import { $url, getUrlsFx } from "@models/Video";
import { $isBuffering, $isPlaying, playerContainerGate } from "@models/Player";

sample({
  clock: [playerContainerGate.open, $translation, $episode],
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
