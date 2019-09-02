class Dice {
    constructor(value = 0, keep = false) {
        this.value = value;
        this.keep = keep;
    }

    get value() {
        return this.value;
    }

    set value(value) {
        this.value = value;
    }

    get keep() {
        return this.keep;
    }

    set keep(keep) {
        this.keep = keep;
    }

    static getRandomInt(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    static createRandomDice(max) {
        return new Dice(Dice.getRandomInt(max), Dice.getRandomInt(2) === 1);
    }
}

export default Dice;
