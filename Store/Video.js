import { makeAutoObservable } from "mobx";

class Video {

    url = null;
    urls = [];
    translation = { id: 'loading', name: 'loading' };

    constructor() {
        makeAutoObservable(this)
    }

    setUrl(url) {
        this.url = url;
    }

    setUrls(urls) {
        this.urls = urls;
    }

    setTranslation(translation) {
        this.translation = translation
    }
}

export default new Video()