import { Figure } from 'shared/interfaces';

interface PickerDropItem {
    figure: Figure,
    index: number
}


interface BoardDropItem {
    figure: Figure,
    x: number,
    y: number,
}

export { PickerDropItem, BoardDropItem }