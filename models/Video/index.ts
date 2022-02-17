import { getUrlsData, getUrlsPayload, IMedia } from "@interfaces/IMediaData";
import { getUrl } from "@api/Endpoints";
import { root } from "@models/Root";
import { setTranslation } from "@models/FilmData";
import { setEpisode } from "@models/Playlist";
import { combine } from "effector";

// export const setTranslation = createEvent<number>();
// export const setQualityId = createEvent<number>();
// export const setUrl = createEvent<number>();
// export const setUrls = createEvent<IMedia[]>();
//
// export const PlayerGate = createGate("Player Gate");
//
export const getUrlsFx = root.createEffect<getUrlsPayload, getUrlsData, Error>(
  getUrl
);
//
// export const $translation = createStore<number>(1)
//   .on(setTranslation, (_, translation: number) => translation);
//
// export const $qualityId = createStore<number>(0)
//   .on(setQualityId, (_, qualityId: number) => qualityId);

export const $urls = root
  .createStore<IMedia[]>([])
  .on(getUrlsFx.doneData, (_, { urls }) => urls);
//
export const $url = root
  .createStore<string | null>(null)
  .on(getUrlsFx.doneData, (_, data) => data.urls[0].streams[0]);

// export const $kpId = createStore<number>(306084);
//
// export const $combinedPayload = combine({kpId: $kpId, translation: $translation, season: $season, episode: $episode});
//
export const $video = combine({
  url: $url,
  urls: $urls,
});
