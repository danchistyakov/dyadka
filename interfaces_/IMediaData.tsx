interface IMedia {
  quality: string;
  urls: string[];
}

export interface IEpisode {
  number: number;
  poster: string;
}

export interface ISeason {
  season: 1;
  episodes: IEpisode[];
  length: number;
}

export interface ITranslation {
  id: number;
  name: string;
  params: { is_camrip: string; is_ads: string; is_director: string } | null;
}

export interface ITranslations {
  list: ITranslation[];
  default: ITranslation;
}

export interface IMediaData {
  age: string;
  country: string;
  genres: string;
  id: number;
  kp_id: number;
  media: IMedia[] | null;
  origtitle: string;
  ratings: {
    kinopoisk: string;
    imdb: string;
  };
  isSeries: boolean;
  slug: string;
  title: string;
  token: string;
  translations: ITranslations;
  seasons: ISeason[];
  year: string;
}
