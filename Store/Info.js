import { makeAutoObservable } from "mobx";

class Info {

    details = null
    videocdn = null
    info = null
    kinopoisk = null
    playlist = []

    constructor() {
        makeAutoObservable(this)
    }

    setDetails(details) {
        this.details = details
    }

    videoCDN(data) {
        this.videocdn = data
    }

    setPlaylist(playlist) {
        this.playlist = playlist
    }

    setInfo(data) {
        this.info = data
    }

    setKinopoisk(data) {
        this.kinopoisk = data
    }
}

export default new Info()