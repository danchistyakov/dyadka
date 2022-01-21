export interface IMedia {
  quality: string;
  streams: string[];
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
  origTitle: string;
  playlist: ISeason[];
  posterBig: string;
  ratings: {
    kinopoisk: string;
    imdb: string;
  };
  similar: SimilarItem[];
  staff: StaffItem[];
  title: string;
  translations: ITranslation[];
  urls: IMedia[] | null;
  year: number;
}
