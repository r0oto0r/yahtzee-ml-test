import { InitialDice } from '../modules/yahtzee';

export const Rolls = {
    validYahtzees: [
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 }
        ],
        [
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 2 }
        ],
        [
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 3 }
        ],
        [
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 4 }
        ],
        [
            { ...InitialDice, value: 5 },
            { ...InitialDice, value: 5 },
            { ...InitialDice, value: 5 },
            { ...InitialDice, value: 5 },
            { ...InitialDice, value: 5 }
        ],
        [
            { ...InitialDice, value: 6 },
            { ...InitialDice, value: 6 },
            { ...InitialDice, value: 6 },
            { ...InitialDice, value: 6 },
            { ...InitialDice, value: 6 }
        ]
    ],
    invalidYahtzees: [
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 2 }
        ],
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 5 }
        ],
        [
            { ...InitialDice, value: 5 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 1 }
        ],
        [
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 3 }
        ],
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 6 }
        ]
    ],
    validThreeOfAKinds: [
        {
            expectedResult: 3,
            dices: [
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 3 },
                { ...InitialDice, value: 4 }
            ]
        },
        {
            expectedResult: 6,
            dices: [
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 2 },
                { ...InitialDice, value: 2 },
                { ...InitialDice, value: 2 },
                { ...InitialDice, value: 3 }
            ]
        },
        {
            expectedResult: 18,
            dices: [
                { ...InitialDice, value: 4 },
                { ...InitialDice, value: 2 },
                { ...InitialDice, value: 6 },
                { ...InitialDice, value: 6 },
                { ...InitialDice, value: 6 }
            ]
        },
        {
            expectedResult: 5,
            dices: [
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 1 }
            ]
        },
        {
            expectedResult: 4,
            dices: [
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 2 }
            ]
        },
        {
            expectedResult: 3,
            dices: [
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 2 },
                { ...InitialDice, value: 2 }
            ]
        }
    ],
    invalidThreeOfAKinds: [
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 5 }
        ],
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 3 }
        ],
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 5 },
            { ...InitialDice, value: 6 },
            { ...InitialDice, value: 6 }
        ]
    ],
    validFourOfAKinds: [
        {
            expectedResult: 4,
            dices: [
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 4 }
            ]
        },
        {
            expectedResult: 8,
            dices: [
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 2 },
                { ...InitialDice, value: 2 },
                { ...InitialDice, value: 2 },
                { ...InitialDice, value: 2 }
            ]
        },
        {
            expectedResult: 5,
            dices: [
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 1 },
                { ...InitialDice, value: 1 }
            ]
        }
    ],
    invalidFourOfAKinds: [
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 5 }
        ],
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 3 }
        ],
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 5 },
            { ...InitialDice, value: 6 },
            { ...InitialDice, value: 6 }
        ],
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 2 }
        ]
    ],
    validFullHouses: [
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 2 }
        ],
        [
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 }
        ],
        [
            { ...InitialDice, value: 5 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 5 }
        ],
        [
            { ...InitialDice, value: 6 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 6 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 6 }
        ]
    ],
    invalidFullHouses: [
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 5 }
        ],
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 3 }
        ],
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 5 },
            { ...InitialDice, value: 6 },
            { ...InitialDice, value: 6 }
        ],
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 3 }
        ],
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 }
        ]
    ],
    validSmallStraights: [
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 2 }
        ],
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 5 },
            { ...InitialDice, value: 6 }
        ],
        [
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 5 },
            { ...InitialDice, value: 6 }
        ],
        [
            { ...InitialDice, value: 6 },
            { ...InitialDice, value: 5 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 2 }
        ],
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 2 }
        ]
    ],
    invalidSmallStraights: [
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 5 },
            { ...InitialDice, value: 6 }
        ],
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 }
        ],
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 2 }
        ]
    ],
    validLargeStraights: [
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 5 }
        ],
        [
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 5 },
            { ...InitialDice, value: 6 }
        ],
        [
            { ...InitialDice, value: 5 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 1 }
        ],
        [
            { ...InitialDice, value: 6 },
            { ...InitialDice, value: 5 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 2 }
        ],
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 5 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 3 }
        ]
    ],
    invalidLargeStraights: [
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 5 },
            { ...InitialDice, value: 6 }
        ],
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 }
        ],
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 2 }
        ],
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 2 }
        ],
        [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 5 },
            { ...InitialDice, value: 6 }
        ]
    ],
    diceCountTestRoll: [
            { ...InitialDice, value: 1 },
            { ...InitialDice, value: 2 },
            { ...InitialDice, value: 3 },
            { ...InitialDice, value: 4 },
            { ...InitialDice, value: 5 },
            { ...InitialDice, value: 6 }
        ]
};
