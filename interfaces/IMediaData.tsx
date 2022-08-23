export interface PlaylistStatus {
  seasons: ISeason[];
  season: number;
  episode: number;
}

export interface IMedia {
  quality: string;
  streams: string[];
}

export interface getUrlsPayload {
  kpId: number;
  translation: number;
  isSeries: boolean;
  season?: number;
  episode?: number;
}

export interface getUrlsData {
  urls: IMedia[];
}

export interface IEpisode {
  episode: number;
  poster: string;
}

export interface ISeason {
  season: number;
  episodes: IEpisode[];
  length: number;
}

export interface ITranslation {
  id: number;
  title: string;
}

export interface SimilarItem {
  kpId: number;
  poster: string;
  title: string;
}

export interface StaffItem {
  kpId: number;
  poster: string;
  role: string;
  title: string;
}

export interface IMediaData {
  age: string;
  countries: string;
  description: string;
  genres: string;
  id: number;
  isSeries: boolean;
  kpId: number;
  nameOriginal: string;
  playlist: ISeason[];
  posterBig: string;
  rating: {
    kp: string;
    imdb: string;
  };
  similar: SimilarItem[];
  staff: StaffItem[];
  nameRu: string;
  translations: ITranslation[];
  urls: IMedia[] | null;
  year: number;
}
