import { makeAutoObservable } from "mobx";

class Volume {
    volume = 1

    constructor() {
        makeAutoObservable(this)
    }

    setVolume(volume) {
        this.volume = volume;
    }
}

export default new Volume()