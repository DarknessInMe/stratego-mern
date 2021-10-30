import { Teams, SpecialFigures } from '../enums';

interface Figure {
    rankWeight: number | SpecialFigures,
    rankName: string,
    image: string,
}

interface FigureEntity {
    team: Teams,
    selected: boolean,
    position: {
        x: number,
        y: number,
    },
    figure: Figure
}

export { FigureEntity, Figure }