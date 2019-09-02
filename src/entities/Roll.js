import Dice, { createRandomDice } from './Dice';

export const MAX_DICES = 5;

class Roll {
    constructor(dices = []) {
        this.dices = dices;
    }

    get dices() {
        return this.dices;
    }

    set dices(dices) {
        this.dices = dices;
    }

    get lastRoll() {
        return this.dices[this.dices.length - 1];
    }

    static rollDices() {
        const { dices } = this;
        let roll = new Roll();
        for (const dice in dices) {
            roll.dices.push(keepOrRollDice(dice));
        }
        return roll;
    }

    keepOrRollDice(oldDice) {
        return oldDice.keep ? new Dice(oldDice.value) : Dice.createRandomDice();
    }
}

export default Roll;
