import { getUrlsData, getUrlsPayload, IMediaData } from '@interfaces/IMediaData';
import { $api } from './ApiConfig';

export const getData = async (kpId: number): Promise<IMediaData> => {
  const { data } = await $api.post('/film', {
    kpId,
  });
  return data;
};

export const getUrl = async (body: getUrlsPayload): Promise<getUrlsData> => {
  const { data } = await $api.post('/geturl', {
    ...body,
  });
  return data;
};
