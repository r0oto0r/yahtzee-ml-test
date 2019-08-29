import uuid from 'uuid/v5';

const MAX_NUMBER_ROLLS = 3;

const initialRoll = {
    dice0: 0,
    dice1: 0,
    dice2: 0,
    dice3: 0,
    dice4: 0
};

const initialTurn = {
    nr: 0,
    scoreBoard: {
        upper: {
            aces: undefined,
            twos: undefined,
            threes: undefined,
            fours: undefined,
            fives: undefined,
            sixes: undefined
        },
        lower: {
            threeOfAKind: undefined,
            fourOfAKind: undefined,
            fullHouse: undefined,
            smallStraight: undefined,
            largeStraight: undefined,
            yahtzee: undefined,
            chance: undefined
        },
        bonus: undefined
    },
    rolls: [],
    score: 0
};

const initialPlayer = {
    pos: 0,
    turns: []
};

const initialMatch = {
    id: 0,
    players: [],
    finished: true
};

function scoreBoardFull(scoreBoard) {
    return hasUndefinedValues(scoreBoard.upper) || hasUndefinedValues(scoreBoard.lower);
}

function hasUndefinedValues(object) {
    for (const value of Object.values(object)) {
        if (value === undefined) {
            return true;
        }
    }
    return false;
}

function rollDices() {
    return {
        dice0: getRandomInt(6),
        dice1: getRandomInt(6),
        dice2: getRandomInt(6),
        dice3: getRandomInt(6),
        dice4: getRandomInt(6)
    };
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function createRandomMatch(maxNumberPlayer) {
    const numberOfPlayers = getRandomInt(maxNumberPlayer);
    const match = {
        ...initialMatch,
        id: uuid()
    };
    for (let i = 0; i < numberOfPlayers; ++i) {
        match.players.push({
            ...initialPlayer,
            pos: i
        });
    }


    return match;
}

function createRandomTurn(lastTurn) {
    if (!scoreBoardFull(lastTurn.scoreBoard)) {
        const newTurn = {
            ...lastTurn,
            nr: lastTurn.nr + 1,
            rolls: [],
            score: 0
        };
        let numberOfRolls = getRandomInt(MAX_NUMBER_ROLLS);
        for (let i = 0; i < numberOfRolls; ++i) {
            newTurn.rolls.push(rollDices());
        }
        return newTurn;
    } else {
        return undefined;
    }
}