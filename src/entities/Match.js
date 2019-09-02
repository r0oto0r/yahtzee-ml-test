class Match {
    constructor(id = 0, players = [new Player()], finished = true) {
        this.id = id;
        this.players = players;
        this.finished = finished;
    }

    get id() {
        return this.id;
    }

    set id(id) {
        this.id = id;
    }

    get players() {
        return this.players;
    }

    set players(players) {
        this.players = players;
    }

    get finished() {
        return this.finished;
    }

    set finished(finished) {
        this.finished = finished;
    }
}

export default Match;
