import { makeAutoObservable } from "mobx";

class Layout {
    watch = false
    player = false
    pirate = false
    trailer = true
    poster = false
    container = false

    constructor() {
        makeAutoObservable(this)
    }

    setWatch(watch) {
        this.watch = watch
    }

    setPlayer(player) {
        this.player = player
    }

    setPirate(pirate) {
        this.pirate = pirate
    }

    setContainer(container) {
        this.container = container
    }
}

export default new Layout()