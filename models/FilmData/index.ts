import { IMediaData, ISeason, ITranslation } from '@interfaces/IMediaData';
import { getData } from '@api/Endpoints';
import { root } from '@models/Root';
import { combine, createStore } from 'effector';

export const dataFx = root.createEffect<number, IMediaData, Error>({ handler: getData });
export const setTranslation = root.createEvent<ITranslation>();

export const $data = root
  .createStore<IMediaData | null>(null)
  .on(dataFx.doneData, (_, data) => data);

export const $kpId = root
  .createStore<number | null>(null)
  .on(dataFx.doneData, (_, data) => data.kpId);

export const $seasons = createStore<ISeason[]>([]).on(dataFx.doneData, (_, data) => data.playlist);

export const $translations = root
  .createStore<ITranslation[] | null>([])
  .on(dataFx.doneData, (_, data) => data.translations);

export const $translation = root
  .createStore<ITranslation | null>(null)
  .on(dataFx.doneData, (_, data) => data.translations[0])
  .on(setTranslation, (_, data) => data);

export const $translationsData = combine({
  translation: $translation,
  translations: $translations,
});
