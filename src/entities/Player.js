import Turn from './Turn';

class Player {
    constructor(pos = 0, turns = [new Turn()]) {
        this.pos = pos;
        this.turns = turns;
    }

    get pos() {
        return this.pos;
    }

    set pos(pos) {
        this.pos = pos;
    }

    get turns() {
        return this.turns;
    }

    set turns(turns) {
        this.turns = turns;
    }
}

export default Player;
