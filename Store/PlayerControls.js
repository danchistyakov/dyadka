import { makeAutoObservable } from "mobx";

class PlayerControls {
    playing = true
    fullscreen = false
    played = 0
    currentTime = 0
    currentDuration = 0
    mute = false

    constructor() {
        makeAutoObservable(this)
    }

    setPlaying(playing) {
        this.playing = playing
    }

    setFullscreen(fullscreen) {
        this.fullscreen = fullscreen
    }

    setPlayed(played) {
        this.played = played
    }

    setCurrentTime(currentTime) {
        this.currentTime = currentTime
    }

    setCurrentDuration(currentDuration) {
        this.currentDuration = currentDuration
    }

    setMute(mute) {
        this.mute = mute
    }

    setSettings(settings) {
        this.settings = settings
    }
}

export default new PlayerControls()