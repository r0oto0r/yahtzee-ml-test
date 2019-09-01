import {
    calculateCategoryValue,
    calculateUpperCategory,
    calculateNumberOfAKind,
    calculateFullHouse,
    calculateSmallStraight,
    calculateLargeStraight,
    calculateYahtzee,
    calculateChance,
    createRandomMatch,
    createRandomTurn,
    scoreBoardFree,
    getRandomInt,
    countDices,
    InitialTurn,
    InitialDice,
    Categories,
    FULL_HOUSE_VALUE,
    SMALL_STRAIGHT_VALUE,
    LARGE_STRAIGHT_VALUE,
    YAHTZEE_VALUE,
    MAX_NUMBER_TURNS
} from '../../modules/yahtzee';
import { Rolls } from '../TestData';

it('can identify upper categories', async () => {
    const { diceCountTestRoll } = Rolls;
    let diceCount = countDices(diceCountTestRoll);
    for (let value of Object.values(diceCount)) {
        expect(value).toBe(1);
    }
});

it('can identify upper categories', async () => {
    for (let i = 1; i <= 6; ++i) {
        let roll = [
            { ...InitialDice, value: i },
            { ...InitialDice, value: i },
            { ...InitialDice, value: i },
            { ...InitialDice, value: i },
            { ...InitialDice, value: i }
        ];
        let result = calculateUpperCategory(i, roll);
        expect(result).toBe(roll.length * i);
    }
});

it('can identify wrong upper categories', async () => {
    for (let i = 1; i <= 6; ++i) {
        let roll = [
            { ...InitialDice, value: i + 1 },
            { ...InitialDice, value: i + 1 },
            { ...InitialDice, value: i + 1 },
            { ...InitialDice, value: i + 1 },
            { ...InitialDice, value: i + 1 }
        ];
        let result = calculateUpperCategory(i, roll);
        expect(result).toBe(0);
    }
});

it('can identify threeOfAKind', async () => {
    const { validThreeOfAKinds } = Rolls;
    for (const roll of validThreeOfAKinds) {
        let result = calculateNumberOfAKind(3, roll.dices);
        expect(result).toBe(roll.expectedResult);
    }
});

it('can identify wrong threeOfAKind', async () => {
    const { invalidThreeOfAKinds } = Rolls;
    for (const roll of invalidThreeOfAKinds) {
        let result = calculateNumberOfAKind(3, roll);
        expect(result).toBe(0);
    }
});

it('can identify fourOfAKind', async () => {
    const { validFourOfAKinds } = Rolls;
    for (const roll of validFourOfAKinds) {
        let result = calculateNumberOfAKind(4, roll.dices);
        expect(result).toBe(roll.expectedResult);
    }
});

it('can identify wrong fourOfAKind', async () => {
    const { invalidFourOfAKinds } = Rolls;
    for (const roll of invalidFourOfAKinds) {
        let result = calculateNumberOfAKind(4, roll);
        expect(result).toBe(0);
    }
});

it('can identify fullHouse', async () => {
    const { validFullHouses } = Rolls;
    for (const roll of validFullHouses) {
        let result = calculateFullHouse(roll);
        expect(result).toBe(FULL_HOUSE_VALUE);
    }
});

it('can identify wrong fullHouse', async () => {
    const { invalidFullHouses } = Rolls;
    for (const roll of invalidFullHouses) {
        let result = calculateFullHouse(roll);
        expect(result).toBe(0);
    }
});

it('can identify small straight', async () => {
    const { validSmallStraights } = Rolls;
    for (const roll of validSmallStraights) {
        let result = calculateSmallStraight(roll);
        expect(result).toBe(SMALL_STRAIGHT_VALUE);
    }
});

it('can identify wrong small straight', async () => {
    const { invalidSmallStraights } = Rolls;
    for (const roll of invalidSmallStraights) {
        let result = calculateSmallStraight(roll);
        expect(result).toBe(0);
    }
});

it('can identify large straight', async () => {
    const { validLargeStraights } = Rolls;
    for (const roll of validLargeStraights) {
        let result = calculateLargeStraight(roll);
        expect(result).toBe(LARGE_STRAIGHT_VALUE);
    }
});

it('can identify wrong large straight', async () => {
    const { invalidLargeStraights } = Rolls;
    for (const roll of invalidLargeStraights) {
        let result = calculateLargeStraight(roll);
        expect(result).toBe(0);
    }
});

it('can identify yahtzee', async () => {
    const { validYahtzees } = Rolls;
    for (const roll of validYahtzees) {
        let result = calculateYahtzee(roll);
        expect(result).toBe(YAHTZEE_VALUE);
    }
});

it('can identify wrong yahtzee', async () => {
    const { invalidYahtzees } = Rolls;
    for (const roll of invalidYahtzees) {
        let result = calculateYahtzee(roll);
        expect(result).toBe(0);
    }
});

it('can identify chance', async () => {
    const roll = [
        { ...InitialDice, value: getRandomInt(6) },
        { ...InitialDice, value: getRandomInt(6) },
        { ...InitialDice, value: getRandomInt(6) },
        { ...InitialDice, value: getRandomInt(6) },
        { ...InitialDice, value: getRandomInt(6) }
    ];
    const sum = roll[0].value + roll[1].value + roll[2].value + roll[3].value + roll[4].value;
    const result = calculateChance(roll);
    expect(result).toBe(sum);
});

it('can createRandomTurn', async () => {
    const turn1 = createRandomTurn({ ...InitialTurn });
    expect(turn1.nr).toBe(1);
    expect(turn1.rolls.length).toBeGreaterThan(1);
    const turn2 = createRandomTurn(turn1);
    expect(turn2.nr).toBe(2);
    expect(turn2.rolls.length).toBeGreaterThan(1);
});

it('can createRandomMatch', async () => {
    const match = createRandomMatch(1);
    expect(match).toBeDefined();
    expect(match.players.length).toBeGreaterThan(0);
    const player = match.players[0];
    expect(player).toBeDefined();
    expect(player.turns).toBeDefined();
    const {turns} = player;
    expect(turns.length).toBe(MAX_NUMBER_TURNS);
    for(const turn of turns) {
      expect(turn.rolls.length).toBeGreaterThan(0);
    }
    const lastTurn = turns[turns.length - 1];
    expect(lastTurn).toBeDefined();
    const { scoreBoard } = lastTurn;
    expect(scoreBoardFree(scoreBoard)).toBe(false);
});

function testCategories(categories, scoreBoard, categoryGroup, fullScore) {
    for (let i = 0; i < categories.length; ++i) {
        let category = categories[i];
        let result = calculateCategoryValue(category, scoreBoard, fullScore[i].dices);
        expect(scoreBoard[categoryGroup][category].points).toBe(result);
        expect(scoreBoard[categoryGroup][category].assigned).toBe(true);
        if (result !== fullScore[i].expectedResult) {
            console.log(category);
        }
        expect(result).toBe(fullScore[i].expectedResult);
    }
}

it('can calculateCategoryValue', async () => {
    let scoreBoard = { ...InitialTurn.scoreBoard };
    let allUpperCategories = [...Object.values(Categories.upper)];
    let allLowerCategories = [...Object.values(Categories.lower)];
    const { fullScore } = Rolls;
    testCategories(allUpperCategories, scoreBoard, 'upper', fullScore.upper);
    testCategories(allLowerCategories, scoreBoard, 'lower', fullScore.lower);
});
