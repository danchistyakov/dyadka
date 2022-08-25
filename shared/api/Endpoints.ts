import {getUrlsPayload, IMedia, IMediaData} from '@interfaces/IMediaData';
import {$api} from './ApiConfig';

export const getData = async (kpId: number): Promise<IMediaData> => {
    const {data} = await $api.post('/film', {
        kpId,
    });
    return data.data;
};

export const getUrl = async (body: getUrlsPayload): Promise<IMedia[]> => {
    const {data} = await $api.post('/geturl', {
        ...body,
    });
    return data.data;
};
