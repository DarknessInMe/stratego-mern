import { SpecialFigures } from 'shared/enums';

interface GameRules {
    figures: {
        [key: string]: number,
    }
}

const gameRules: GameRules = {
    /**
     * @param figures - rules of figures quantity
     * 
     * key - rankWeight of figure
     * value - quantity of figures with such rankWeight
     */
    figures: {
        [SpecialFigures.BOMB]: 6,
        [SpecialFigures.FLAG]: 1,
        "10": 1,
        "9": 1,
        "8": 2,
        "7": 3,
        "6": 4,
        "5": 4,
        "4": 4,
        "3": 5,
        "2": 8,
        "1": 1,
    }
}

export { gameRules };