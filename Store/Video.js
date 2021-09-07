import { makeAutoObservable } from "mobx";

class Video {
  url = null;
  urls = [];
  translation = { id: "loading", name: "loading", params: "loading" };

  constructor() {
    makeAutoObservable(this);
  }

  setUrl(url) {
    this.url = url;
  }

  setUrls(urls) {
    this.urls = urls;
  }

  setTranslation(id, name, params) {
    this.translation = { id, name, params };
  }
}

export default new Video();
