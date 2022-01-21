import { makeAutoObservable } from "mobx";

class Info {
  details = null;
  videocdn = null;
  info = null;
  kinopoisk = null;
  playlist = [];
  token = null;
  source = null;

  constructor() {
    makeAutoObservable(this);
  }

  setDetails(details) {
    this.details = details;
  }

  videoCDN(data) {
    this.videocdn = data;
  }

  setPlaylist(playlist) {
    this.playlist = playlist;
  }

  setInfo(data) {
    this.info = data;
  }

  setKinopoisk(data) {
    this.kinopoisk = data;
  }

  setToken(token) {
    this.token = token;
  }

  setSource(source) {
    this.source = source;
  }
}

export default new Info();
