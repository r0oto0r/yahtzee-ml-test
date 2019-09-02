import ScoreBoard from './ScoreBoard';
import Roll from './Roll';

class Turn {
    constructor(nr = 0, scoreBoard = new ScoreBoard(), rolls = [new Roll()]) {
        this.nr = nr;
        this.scoreBoard = scoreBoard;
        this.rolls = rolls;
    }

    get nr() {
        return this.nr;
    }

    set nr(nr) {
        this.nr = nr;
    }

    get scoreBoard() {
        return this.scoreBoard;
    }

    set scoreBoard(scoreBoard) {
        this.scoreBoard = scoreBoard;
    }

    get rolls() {
        return this.rolls;
    }

    set rolls(rolls) {
        this.rolls = rolls;
    }
}

export default Turn;
