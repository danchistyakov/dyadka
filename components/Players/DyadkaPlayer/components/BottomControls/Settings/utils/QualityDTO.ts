import { IMedia } from '@interfaces/IMediaData';

export const QualityDTO = (data: IMedia[]) =>
  data.map(({ quality }, key) => ({ id: key, value: quality }));
