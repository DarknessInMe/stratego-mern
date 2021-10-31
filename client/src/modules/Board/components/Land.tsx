import React from 'react';
import { useDrop } from 'react-dnd';
import { PickerTypes } from 'shared/enums';

interface Land {
    x: number,
    y: number,
}

const Land: React.FC<Land> = ({ x, y }) => {
    const [, dropRef] = useDrop({
        accept: PickerTypes.FIGURE,
        drop: () => ({
            position: {
                x,
                y,
            }
        }),
    })

    return <div ref={dropRef} className="board__cell land" />
}

export { Land };