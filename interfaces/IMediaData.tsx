interface IMedia {
  quality: string;
  urls: string[];
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
  episode: string;
  title: string;
  season: string;
}

export interface ISimilar {
  kpId: number;
  poster: string;
  title: string;
}

export interface IStaff {
  kpId: number;
  poster: string;
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
  media: IMedia[] | null;
  origTitle: string;
  posterBig: string;
  ratings: {
    kinopoisk: string;
    imdb: string;
  };
  similars: ISimilar[];
  staff: IStaff[];
  title: string;
  translations: ITranslation[];
  seasons: ISeason[];
  year: number;
}
