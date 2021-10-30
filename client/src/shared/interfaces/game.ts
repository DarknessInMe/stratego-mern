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

interface WaterEntity {
    x: number,
    y: number,
    water: true,
}

export { FigureEntity, Figure, WaterEntity }