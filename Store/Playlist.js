import { makeAutoObservable } from "mobx";

class Playlist {
  season = null;
  episode = 1;
  id = 1;
  quality = null;
  playlist = null;
  speed = 1;
  urls = null;
  translations = null;
  translation = "loading";
  url = null;
  last = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSeason(season) {
    this.season = season;
  }

  setEpisode(episode) {
    this.episode = episode;
  }

  setId(id) {
    this.id = id;
  }

  setQuality(quality) {
    this.quality = quality;
  }

  autoNext(playlist) {
    this.playlist = playlist;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  setTranslations(translations) {
    this.translations = translations;
  }

  setLast(last) {
    this.last = last;
  }
}

export default new Playlist();
