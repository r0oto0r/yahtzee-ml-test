import uuid from 'uuid/v4';

const MAX_NUMBER_ROLLS = 3;
const FULLHOUSE_VALUE = 25;
const SMALL_STRAIGHT_VALUE = 30;
const LARGE_STRAIGHT_VALUE = 40;
const YAHTZEE_VALUE = 50;

const Categories = {
    upper: {
        aces: 'aces',
        twos: 'twos',
        threes: 'threes',
        fours: 'fours',
        fives: 'fives',
        sixes: 'sixes'
    },
    lower: {
        threeOfAKind: 'threeOfAKind',
        fourOfAKind: 'fourOfAKind',
        fullHouse: 'fullHouse',
        smallStraight: 'smallStraight',
        largeStraight: 'largeStraight',
        yahtzee: 'yahtzee',
        chance: 'chance'
    },
    bonus: 'bonus'
};

const InitialRoll = {
    dice0: {
        value: 0,
        keep: false
    },
    dice1: {
        value: 0,
        keep: false
    },
    dice2: {
        value: 0,
        keep: false
    },
    dice3: {
        value: 0,
        keep: false
    },
    dice4: {
        value: 0,
        keep: false
    }
};

const InitialTurn = {
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

const InitialPlayer = {
    pos: 0,
    turns: []
};

const InitialMatch = {
    id: 0,
    players: [],
    finished: true
};

function assignRandomCategory(turn) {
    const { scoreBoard, rolls } = turn;
    let openCatergories = findOpenCategories({ ...scoreBoard.upper, ...scoreBoard.lower });
    let category = openCatergories[getRandomInt(openCatergories.length) - 2];
    let lastRoll = rolls[rolls.length - 1];
    let categoryValue = calculateCategoryValue(category, scoreBoard, lastRoll);
    console.log(`${lastRoll} ${category} ${categoryValue}`);
}

function calculateCategoryValue(category, scoreBoard, lastRoll) {
    switch (category) {
        case Categories.upper.aces:
            scoreBoard.upper.aces = calculateUpperCategory(1, lastRoll);
            return scoreBoard.upper.aces;
            break;
        case Categories.upper.twos:
            scoreBoard.upper.twos = calculateUpperCategory(2, lastRoll);
            return scoreBoard.upper.twos;
            break;
        case Categories.upper.threes:
            scoreBoard.upper.threes = calculateUpperCategory(3, lastRoll);
            return scoreBoard.upper.threes;
            break;
        case Categories.upper.fours:
            scoreBoard.upper.fours = calculateUpperCategory(4, lastRoll);
            return scoreBoard.upper.fours;
            break;
        case Categories.upper.fives:
            scoreBoard.upper.fives = calculateUpperCategory(5, lastRoll);
            return scoreBoard.upper.fives;
            break;
        case Categories.upper.sixes:
            scoreBoard.upper.sixes = calculateUpperCategory(6, lastRoll);
            return scoreBoard.upper.sixes;
            break;
        case Categories.lower.threeOfAKind:
            scoreBoard.upper.threeOfAKind = calculateNumberOfAKind(3, lastRoll);
            return scoreBoard.upper.threeOfAKind;
            break;
        case Categories.lower.fourOfAKind:
            scoreBoard.upper.fourOfAKind = calculateNumberOfAKind(4, lastRoll);
            return scoreBoard.upper.fourOfAKind;
            break;
        case Categories.upper.fullHouse:
            scoreBoard.upper.fullHouse = calculateFullHouse(lastRoll);
            return scoreBoard.upper.fullHouse;
            break;
        case Categories.lower.smallStraight:
            scoreBoard.upper.smallStraight = calculateSmallStraight(lastRoll);
            return scoreBoard.upper.smallStraight;
            break;
        case Categories.lower.largeStraight:
            scoreBoard.upper.largeStraight = calculateLargeStraight(lastRoll);
            return scoreBoard.upper.largeStraight;
            break;
        case Categories.lower.yahtzee:
            scoreBoard.upper.yahtzee = calculateYahtzee(lastRoll);
            return scoreBoard.upper.yahtzee;
            break;
        case Categories.lower.chance:
            scoreBoard.upper.chance = calculateChance(lastRoll);
            return scoreBoard.upper.chance;
            break;
        default:
            break;
    }
}

function calculateFullHouse(roll) {
    let diceCount = countDices(roll);
    let haveTwos = false;
    let haveThrees = false;
    for (const [key, value] in diceCount) {
        if (value === 2) {
            haveTwos = true;
        }
        if (value === 3) {
            haveThrees = true;
        }
    }
    return haveTwos && haveThrees ? FULLHOUSE_VALUE : 0;
}

function calculateSmallStraight(roll) {
    let sortedDices = roll.sort(sortDicesHandler);
    let uniqueDices = [...new Set(Object.values(sortedDices))];
    if (uniqueDices.length < 4) {
        return 0;
    }
    for (let i = 0; i + 1 < uniqueDices.length; ++i) {
        if (!uniqueDices[0] + 1 === uniqueDices[0 + 1]) {
            return 0;
        }
    }
    return SMALL_STRAIGHT_VALUE;
}

function calculateLargeStraight(roll) {
    let sortedDices = roll.sort(sortDicesHandler);
    let uniqueDices = [...new Set(Object.values(sortedDices))];
    if (uniqueDices.length < 5) {
        return 0;
    }
    for (let i = 0; i + 1 < uniqueDices.length; ++i) {
        if (!uniqueDices[0] + 1 === uniqueDices[0 + 1]) {
            return 0;
        }
    }
    return LARGE_STRAIGHT_VALUE;
}

function calculateYahtzee(roll) {
    let firstValue = roll[0];
    for (const dice in rolls) {
        if (firstValue !== dice.value) {
            return 0;
        }
    }
    return YAHTZEE_VALUE;
}

function calculateNumberOfAKind(minCount, roll) {
    let diceCount = countDices(roll);
    for (const [key, value] in diceCount) {
        if (value >= minCount) {
            return key * value;
        }
    }
    return 0;
}

const sortDicesHandler = (diceA, diceB) => diceA.value - diceB.value;

function countDices(rolls) {
    let diceCount = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    };
    for (const dice in rolls) {
        diceCount[dice.value]++;
    }
    return diceCount;
}

function calculateChance(lastRoll) {
    let sum = 0;
    for (const dice in lastRoll) {
        sum = +dice.value;
    }
    return sum;
}

function calculateUpperCategory(value, lastRoll) {
    let sum = 0;
    for (const dice in lastRoll) {
        if (dice.value === value) {
            sum = +value;
        }
    }
    return sum;
}

function findOpenCategories(categories) {
    let openCatergories = [];
    for (const category in categories) {
        if (!category) openCatergories.push(category);
    }
    return openCatergories;
}

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

function rollDices(prevRoll) {
    return {
        dice0: keepOrRollDice(prevRoll.dice0),
        dice1: keepOrRollDice(prevRoll.dice1),
        dice2: keepOrRollDice(prevRoll.dice2),
        dice3: keepOrRollDice(prevRoll.dice3),
        dice4: keepOrRollDice(prevRoll.dice4)
    };
}

function keepOrRollDice(oldDice) {
    return oldDice.keep ? { ...rollDice(), value: oldDice.value } : rollDice();
}

function rollDice() {
    return {
        value: getRandomInt(6),
        keep: getRandomInt(2) === 1 ? true : false
    };
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function createRandomMatch(maxNumberPlayer) {
    const numberOfPlayers = getRandomInt(maxNumberPlayer - 1);
    const match = {
        ...InitialMatch,
        id: uuid()
    };
    for (let i = 0; i < numberOfPlayers; ++i) {
        let turns = [{ ...InitialTurn }];
        let turn = createRandomTurn(turns[turns.length - 1]);
        while (turn) {
            turns.push(turn);
            turn = createRandomTurn(turns[turns.length - 1]);
        }
        console.log(turns);
        match.players.push({
            ...InitialPlayer,
            pos: i,
            turns
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
            let prevRoll = newTurn.rolls[i - 1];
            newTurn.rolls.push(rollDices(prevRoll));
        }
        assignRandomCategory(newTurn);
        return newTurn;
    } else {
        return undefined;
    }
}

console.log(createRandomMatch(1));
