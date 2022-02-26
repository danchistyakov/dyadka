import { getUrlsData, getUrlsPayload, IMedia } from "@interfaces/IMediaData";
import { getUrl } from "@api/Endpoints";
import { root } from "@models/Root";
import { setTranslation } from "@models/FilmData";
import { setEpisode } from "@models/Playlist";
import { combine } from "effector";

export const getUrlsFx = root.createEffect<getUrlsPayload, getUrlsData, Error>(
  getUrl
);

export const $urls = root
  .createStore<IMedia[]>([])
  .on(getUrlsFx.doneData, (_, { urls }) => urls);

export const $url = root
  .createStore<string | null>(null)
  .on(getUrlsFx.doneData, (_, data) => data.urls[0].streams[0]);

export const $video = combine({
  url: $url,
  urls: $urls,
});
