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

const InitialDice = {
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

const InitialTurn = {
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
    rolls: [{ ...InitialRoll }],
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

function assignRandomCategory(turn) {
    const { scoreBoard, rolls } = turn;
    let openCatergories = [];
    openCatergories = openCatergories.concat(findOpenCategories(scoreBoard.upper));
    openCatergories = openCatergories.concat(findOpenCategories(scoreBoard.lower));
    let category = openCatergories[getRandomInt(openCatergories.length) - 2];
    let lastRoll = rolls[rolls.length - 1];
    let categoryValue = calculateCategoryValue(category, scoreBoard, lastRoll);
}

function calculateCategoryValue(category, scoreBoard, lastRoll) {
    switch (category) {
        case Categories.upper.aces:
            scoreBoard.upper.aces.points = calculateUpperCategory(1, lastRoll);
            scoreBoard.upper.aces.assigned = true;
            return scoreBoard.upper.aces.points;
            break;
        case Categories.upper.twos:
            scoreBoard.upper.twos.points = calculateUpperCategory(2, lastRoll);
            scoreBoard.upper.twos.assigned = true;
            return scoreBoard.upper.twos.points;
            break;
        case Categories.upper.threes:
            scoreBoard.upper.threes.points = calculateUpperCategory(3, lastRoll);
            scoreBoard.upper.threes.assigned = true;
            return scoreBoard.upper.threes.points;
            break;
        case Categories.upper.fours:
            scoreBoard.upper.fours.points = calculateUpperCategory(4, lastRoll);
            scoreBoard.upper.fours.assigned = true;
            return scoreBoard.upper.fours.points;
            break;
        case Categories.upper.fives:
            scoreBoard.upper.fives.points = calculateUpperCategory(5, lastRoll);
            scoreBoard.upper.fives.assigned = true;
            return scoreBoard.upper.fives.points;
            break;
        case Categories.upper.sixes:
            scoreBoard.upper.sixes.points = calculateUpperCategory(6, lastRoll);
            scoreBoard.upper.sixes.assigned = true;
            return scoreBoard.upper.sixes.points;
            break;
        case Categories.lower.threeOfAKind:
            scoreBoard.lower.threeOfAKind.points = calculateNumberOfAKind(3, lastRoll);
            scoreBoard.lower.threeOfAKind.assigned = true;
            return scoreBoard.lower.threeOfAKind.points;
            break;
        case Categories.lower.fourOfAKind:
            scoreBoard.lower.fourOfAKind.points = calculateNumberOfAKind(4, lastRoll);
            scoreBoard.lower.fourOfAKind.assigned = true;
            return scoreBoard.lower.fourOfAKind.points;
            break;
        case Categories.lower.fullHouse:
            scoreBoard.lower.fullHouse.points = calculateFullHouse(lastRoll);
            scoreBoard.lower.fullHouse.assigned = true;
            return scoreBoard.lower.fullHouse.points;
            break;
        case Categories.lower.smallStraight:
            scoreBoard.lower.smallStraight.points = calculateSmallStraight(lastRoll);
            scoreBoard.lower.smallStraight.assigned = true;
            return scoreBoard.lower.smallStraight.points;
            break;
        case Categories.lower.largeStraight:
            scoreBoard.lower.largeStraight.points = calculateLargeStraight(lastRoll);
            scoreBoard.lower.largeStraight.assigned = true;
            return scoreBoard.lower.largeStraight.points;
            break;
        case Categories.lower.yahtzee:
            scoreBoard.lower.yahtzee.points = calculateYahtzee(lastRoll);
            scoreBoard.lower.yahtzee.assigned = true;
            return scoreBoard.lower.yahtzee.points;
            break;
        case Categories.lower.chance:
            scoreBoard.lower.chance.points = calculateChance(lastRoll);
            scoreBoard.lower.chance.assigned = true;
            return scoreBoard.lower.chance.points;
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
    let sortedDices = Object.values(roll).sort(sortDicesHandler);
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
    let sortedDices = Object.values(roll).sort(sortDicesHandler);
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
    let firstValue = roll[0].value;
    for (const dice in roll) {
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

function countDices(roll) {
    let diceCount = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    };
    for (const dice in roll) {
        diceCount[dice.value]++;
    }
    return diceCount;
}

function calculateChance(lastRoll) {
    let sum = 0;
    for (const dice in lastRoll) {
        sum += dice.value;
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
    for (const [key, category] of Object.entries(categories)) {
        if (!category.assigned) {
            openCatergories.push(key);
        }
    }
    return openCatergories;
}

function scoreBoardFree(scoreBoard) {
    return hasUnassignedValues(scoreBoard.upper) || hasUnassignedValues(scoreBoard.lower);
}

function hasUnassignedValues(categories) {
    console.log(JSON.stringify(categories, null, 2));

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
        let turn = createRandomTurn(turns[0]);
        while (turn) {
            turns.push(turn);
            turn = createRandomTurn(turns[turns.length - 1]);
        }
        match.players.push({
            ...InitialPlayer,
            pos: i,
            turns
        });
    }
    return match;
}

function createRandomTurn(lastTurn) {
    if (scoreBoardFree(lastTurn.scoreBoard)) {
        const newTurn = {
            ...lastTurn,
            nr: lastTurn.nr + 1,
            rolls: [{ ...InitialRoll }],
            score: 0
        };
        let numberOfRolls = getRandomInt(MAX_NUMBER_ROLLS - 1);
        for (let i = 0; i < numberOfRolls; ++i) {
            let prevRoll = newTurn.rolls[i];
            newTurn.rolls.push({ ...rollDices(prevRoll) });
        }
        assignRandomCategory(newTurn);
        return newTurn;
    } else {
        return false;
    }
}

console.log(
    JSON.stringify(
        calculateFullHouse([
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 3 }
        ]),
        null,
        2
    )
);
