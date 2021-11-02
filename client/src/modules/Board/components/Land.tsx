import { useSetupUtils } from 'hooks';
import React from 'react';
import { useDrop } from 'react-dnd';
import { BoardTypes, PickerTypes } from 'shared/enums';
import { BoardDropItem, PickerDropItem } from 'shared/interfaces';

interface Land {
    x: number,
    y: number,
}

const Land: React.FC<Land> = ({ x, y }) => {
    const { changeFigurePosition, setFigureFromPicker } = useSetupUtils();

    const [, dropRef] = useDrop({
        accept: [PickerTypes.FIGURE, BoardTypes.FIGURE],
        drop: (item: PickerDropItem | BoardDropItem, monitor) => {
            const type = monitor.getItemType();

            switch(type) {
                case PickerTypes.FIGURE: {
                    return setFigureFromPicker(item as PickerDropItem, x, y)
                }
                case BoardTypes.FIGURE: {
                    return changeFigurePosition(item as BoardDropItem, x, y)
                }
                default: {
                    return;
                }
            }
        },
    })

    return <div ref={dropRef} className="board__cell land" />
}

export { Land };