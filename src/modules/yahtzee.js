import uuid from 'uuid/v4';

const MAX_NUMBER_ROLLS = 3;
export const FULL_HOUSE_VALUE = 25;
export const SMALL_STRAIGHT_VALUE = 30;
export const LARGE_STRAIGHT_VALUE = 40;
export const YAHTZEE_VALUE = 50;
export const MAX_NUMBER_TURNS = 13;

export const Categories = {
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

export const InitialDice = {
    value: 0,
    keep: false
};

const InitialRoll = [
    { ...InitialDice },
    { ...InitialDice },
    { ...InitialDice },
    { ...InitialDice },
    { ...InitialDice }
];

const InitialCategory = {
    points: 0,
    assigned: false
};

export const InitialTurn = {
    nr: 0,
    scoreBoard: {
        upper: {
            aces: { ...InitialCategory },
            twos: { ...InitialCategory },
            threes: { ...InitialCategory },
            fours: { ...InitialCategory },
            fives: { ...InitialCategory },
            sixes: { ...InitialCategory }
        },
        lower: {
            threeOfAKind: { ...InitialCategory },
            fourOfAKind: { ...InitialCategory },
            fullHouse: { ...InitialCategory },
            smallStraight: { ...InitialCategory },
            largeStraight: { ...InitialCategory },
            yahtzee: { ...InitialCategory },
            chance: { ...InitialCategory }
        },
        bonus: { ...InitialCategory }
    },
    rolls: [[...InitialRoll]],
    score: 0
};

const InitialPlayer = {
    pos: 0,
    turns: [{ ...InitialTurn }]
};

const InitialMatch = {
    id: 0,
    players: [{ ...InitialPlayer }],
    finished: true
};

export function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

function findOpenCategories(categories) {
    let openCatergories = [];
    for (const [key, category] of Object.entries(categories)) {
        if (!category.assigned) {
            openCatergories.push(key);
        }
    }
    return openCatergories;
}

export function scoreBoardFree(scoreBoard) {
    return hasUnassignedValues(scoreBoard.upper) || hasUnassignedValues(scoreBoard.lower);
}

function hasUnassignedValues(categories) {
    for (const category of Object.values(categories)) {
        if (!category.assigned) {
            return true;
        }
    }
    return false;
}

function rollDices(prevRoll) {
    let newRoll = [];
    for (const dice in prevRoll) {
        newRoll.push(keepOrRollDice(dice));
    }
    return newRoll;
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

function assignRandomCategory(turn) {
    const { scoreBoard, rolls } = turn;
    let openCatergories = [];
    openCatergories = openCatergories.concat(findOpenCategories(scoreBoard.upper));
    openCatergories = openCatergories.concat(findOpenCategories(scoreBoard.lower));
    if(openCatergories.length > 0) {
    let category = openCatergories[getRandomInt(openCatergories.length) - 1];
    let lastRoll = rolls[rolls.length - 1];
    calculateCategoryValue(category, scoreBoard, lastRoll);
  }
}

function setCategoryPoints(scoreBoard, categoryGroup, category, points) {
    scoreBoard[categoryGroup][category].points = points;
    scoreBoard[categoryGroup][category].assigned = true;
}

export function calculateCategoryValue(category, scoreBoard, lastRoll) {
    let points;
    let categoryGroup = 'upper';
    switch (category) {
        case Categories.upper.aces:
            points = calculateUpperCategory(1, lastRoll);
            break;
        case Categories.upper.twos:
            points = calculateUpperCategory(2, lastRoll);
            break;
        case Categories.upper.threes:
            points = calculateUpperCategory(3, lastRoll);
            break;
        case Categories.upper.fours:
            points = calculateUpperCategory(4, lastRoll);
            break;
        case Categories.upper.fives:
            points = calculateUpperCategory(5, lastRoll);
            break;
        case Categories.upper.sixes:
            points = calculateUpperCategory(6, lastRoll);
            break;
        case Categories.lower.threeOfAKind:
            categoryGroup = 'lower';
            points = calculateNumberOfAKind(3, lastRoll);
            break;
        case Categories.lower.fourOfAKind:
            categoryGroup = 'lower';
            points = calculateNumberOfAKind(4, lastRoll);
            break;
        case Categories.lower.fullHouse:
            categoryGroup = 'lower';
            points = calculateFullHouse(lastRoll);
            break;
        case Categories.lower.smallStraight:
            categoryGroup = 'lower';
            points = calculateSmallStraight(lastRoll);
            break;
        case Categories.lower.largeStraight:
            categoryGroup = 'lower';
            points = calculateLargeStraight(lastRoll);
            break;
        case Categories.lower.yahtzee:
            categoryGroup = 'lower';
            points = calculateYahtzee(lastRoll);
            break;
        case Categories.lower.chance:
            categoryGroup = 'lower';
            points = calculateChance(lastRoll);
            break;
    }
    setCategoryPoints(scoreBoard, categoryGroup, category, points);
    return points;
}

export function calculateFullHouse(roll) {
    let diceCount = countDices(roll);
    let haveTwos = false;
    let haveThrees = false;
    let haveFives = false;
    for (const [key, value] of Object.entries(diceCount)) {
        if (value === 2) {
            haveTwos = true;
        }
        if (value === 3) {
            haveThrees = true;
        }
        if (value === 5) {
            haveFives = true;
        }
    }
    return (haveTwos && haveThrees) || haveFives ? FULL_HOUSE_VALUE : 0;
}

export function calculateSmallStraight(roll) {
    return isStraightOfLength(roll, 4) ? SMALL_STRAIGHT_VALUE : 0;
}

export function calculateLargeStraight(roll) {
    return isStraightOfLength(roll, 5) ? LARGE_STRAIGHT_VALUE : 0;
}

function isStraightOfLength(roll, length) {
    let sortedDices = Object.values(roll).sort(sortDicesHandler);
    let valueArray = [];
    for (const dice of sortedDices) {
        valueArray.push(dice.value);
    }
    let uniqueDices = [...new Set(valueArray)];
    if (uniqueDices.length < length) {
        return false;
    }
    let isStraight = true;
    for (let i = 0; i < length - 1; i++) {
        if (uniqueDices[i] + 1 !== uniqueDices[i + 1]) {
            isStraight = false;
            break;
        }
    }
    if (uniqueDices.length > length) {
        isStraight = true;
        for (let i = 1; i < length; i++) {
            if (uniqueDices[i] + 1 !== uniqueDices[i + 1]) {
                isStraight = false;
                break;
            }
        }
    }
    return isStraight;
}

export function calculateYahtzee(roll) {
    let firstValue = roll[0].value;
    for (const dice of roll) {
        if (firstValue !== dice.value) {
            return 0;
        }
    }
    return YAHTZEE_VALUE;
}

export function calculateNumberOfAKind(minCount, roll) {
    let diceCount = countDices(roll);
    for (const [key, value] of Object.entries(diceCount)) {
        if (value >= minCount) {
            return key * value;
        }
    }
    return 0;
}

const sortDicesHandler = (diceA, diceB) => diceA.value - diceB.value;

export function countDices(roll) {
    let diceCount = {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0
    };
    for (const dice of roll) {
        diceCount[dice.value]++;
    }
    return diceCount;
}

export function calculateChance(roll) {
    let sum = 0;
    for (const dice of roll) {
        sum += dice.value;
    }
    return sum;
}

export function calculateUpperCategory(value, roll) {
    let sum = 0;
    for (const dice of roll) {
        if (dice.value === value) {
            sum += value;
        }
    }
    return sum;
}

export function createRandomTurn(lastTurn) {
    const newTurn = {
        ...lastTurn,
        nr: lastTurn.nr + 1,
        rolls: [{ ...InitialRoll }],
        score: 0
    };
    let numberOfRolls = getRandomInt(MAX_NUMBER_ROLLS);
    for (let i = 0; i < numberOfRolls; ++i) {
        let prevRoll = newTurn.rolls[i];
        newTurn.rolls.push([...rollDices(prevRoll)]);
    }
    assignRandomCategory(newTurn);
    return newTurn;
}

export function createRandomMatch(maxNumberPlayer) {
    const numberOfPlayers = getRandomInt(maxNumberPlayer);
    const match = {
        ...InitialMatch,
        players:[],
        id: uuid()
    };
    for (let i = 0; i < numberOfPlayers; ++i) {
        let turns = [createRandomTurn({ ...InitialTurn })];
        for (let j = 0; j < MAX_NUMBER_TURNS - 1; ++j) {
            turns.push(createRandomTurn(turns[turns.length - 1]));
        }
        match.players.push({
            ...InitialPlayer,
            pos: i,
            turns
        });
    }
    return match;
}
