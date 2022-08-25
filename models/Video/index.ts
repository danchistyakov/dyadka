import {getUrlsPayload, IMedia} from '@interfaces/IMediaData';
import {getUrl} from '../../shared/api/Endpoints';
import {root} from '@models/Root';
import {combine, createEvent} from 'effector';

export const getUrlsFx = root.createEffect<getUrlsPayload, IMedia[], Error>(getUrl);

export const setQuality = createEvent<number>();

export const $quality = root.createStore<number>(0).on(setQuality, (_, quality) => quality);
export const $urls = root.createStore<IMedia[]>([]).on(getUrlsFx.doneData, (_, streams) => streams);

export const $url = root
    .createStore<string | null>(null)
    .on(getUrlsFx.doneData, (_, data) => data[0].streams[0]);