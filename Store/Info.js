import { makeAutoObservable } from "mobx";

class Info {

    details = null
    videocdn = null
    info = null
    kinopoisk = null

    constructor() {
        makeAutoObservable(this)
    }

    setDetails(details) {
        this.details = details
    }

    videoCDN(data) {
        this.videocdn = data
    }

    setInfo(data) {
        this.info = data
    }

    setKinopoisk(data) {
        this.kinopoisk = data
    }
}

export default new Info()