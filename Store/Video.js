import { makeAutoObservable } from "mobx";

class Video {
  url = null;
  urls = [];
  translation = { id: "loading", name: "loading" };

  constructor() {
    makeAutoObservable(this);
  }

  setUrl(url) {
    this.url = url;
  }

  setUrls(urls) {
    this.urls = urls;
  }

  setTranslation(id, name) {
    this.translation = { id: id, name: name };
  }
}

export default new Video();
