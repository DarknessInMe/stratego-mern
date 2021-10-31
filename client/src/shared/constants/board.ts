/**
 * board:
 * [
 *  [null, null,  null,  null, null, null,  null,  null, null, null],
 *  [null, null,  null,  null, null, null,  null,  null, null, null],
 *  [null, null,  null,  null, null, null,  null,  null, null, null],
 *  [null, null,  null,  null, null, null,  null,  null, null, null],
 *  [null, null, water, water, null, null, water, water, null, null],
 *  [null, null, water, water, null, null, water, water, null, null],
 *  [null, null,  null, null,  null, null,  null,  null, null, null],
 *  [null, null,  null,  null, null, null,  null,  null, null, null],
 *  [null, null,  null,  null, null, null,  null,  null, null, null],
 *  [null, null,  null,  null, null, null,  null,  null, null, null],
 * ]
 */

import { BoardEntity } from 'shared/types';

/**
 * water coordinates
 */
const WATER_POSITION = [
    // left side
    {
        x: 2,
        y: 4,
    },
    {
        x: 2,
        y: 5,
    },
    {
        x: 3,
        y: 4,
    },
    {
        x: 3,
        y: 5,
    },
    // right side
    {
        x: 6,
        y: 4,
    },
    {
        x: 6,
        y: 5,
    },
    {
        x: 7,
        y: 4,
    },
    {
        x: 7,
        y: 5,
    }
] as const;

const generateBoard = () => {
    const singleLine: BoardEntity[] = new Array(10).fill(null);
    const board: BoardEntity[][] = [];

    for (let i = 0; i < 10; i++) {
        board.push([...singleLine]); 
    }

    WATER_POSITION.forEach(({ x, y }) => {
        board[y][x] = { x, y, water: true }
    })

    return board;
}

export default generateBoard();