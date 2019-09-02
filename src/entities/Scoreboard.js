import Category from './Category';

export const BONUS_VALUE = 65;
export const BONUS_THRESHOLD = 65;

class ScoreBoard {
    constructor() {
        this.upper = {
            aces: new Category(),
            twos: new Category(),
            threes: new Category(),
            fours: new Category(),
            fives: new Category(),
            sixes: new Category()
        };
        this.lower = {
            threeOfAKind: new Category(),
            fourOfAKind: new Category(),
            fullHouse: new Category(),
            smallStraight: new Category(),
            largeStraight: new Category(),
            yahtzee: new Category(),
            chance: new Category()
        };
        this.upperScore = 0;
        this.lowerScore = 0;
        this.bonus = 0;
        this.totalScore = 0;
    }

    get upper() {
        return this.upper;
    }

    set upper(upper) {
        this.upper = upper;
    }

    get lower() {
        return this.lower;
    }

    set lower(lower) {
        this.lower = lower;
    }

    get upperScore() {
        return this.upperScore;
    }

    set upperScore(upperScore) {
        this.upperScore = upperScore;
    }

    get lowerScore() {
        return this.lowerScore;
    }

    set lowerScore(lowerScore) {
        this.lowerScore = lowerScore;
    }

    get bonus() {
        return this.bonus;
    }

    set bonus(bonus) {
        this.bonus = bonus;
    }

    get totalScore() {
        return this.totalScore;
    }

    set totalScore(totalScore) {
        this.totalScore = totalScore;
    }

    calculateScore() {
        this.upperScore = this.sumUpCategories(this.upper);
        this.lowerScore = this.sumUpCategories(this.lower);
        this.bonus = this.upperScore >= BONUS_THRESHOLD ? BONUS_VALUE : 0;
        const { upperScore, lowerScore, bonus } = scoreBoard;
        this.totalScore = upperScore + lowerScore + bonus;
        return this.totalScore;
    }

    sumUpCategories(categories) {
        let sum = 0;
        for (const category of Object.values(categories)) {
            if (category.assigned) {
                sum += category.points;
            }
        }
        return sum;
    }

    findOpenCategories() {
        let openCategories = [];
        for (const [key, category] of Object.entries(this.upper)) {
            if (!category.assigned) {
                openCategories.push(key);
            }
        }
        for (const [key, category] of Object.entries(this.lower)) {
            if (!category.assigned) {
                openCategories.push(key);
            }
        }
        return openCategories;
    }

    scoreBoardFree(scoreBoard) {
        return findOpenCategories().length > 0;
    }
}
