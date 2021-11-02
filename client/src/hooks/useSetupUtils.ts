import { useGameContext } from "context"
import { Teams } from "shared/enums";
import { BoardDropItem, Figure, PickerDropItem } from "shared/interfaces";
import { deepCopy } from "shared/utils";

const useSetupUtils = () => {
    const { setBoard, setPicker } = useGameContext();

    const setFigureFromPicker = (item: PickerDropItem, x: number, y: number) => {
        const { figure, index } = item;

        setBoard(prevBoardState => {
            const stateCopy = deepCopy(prevBoardState);

            stateCopy[y][x] = {
                team: Teams.RED_TEAM,
                selected: false,
                position: {
                    x, y,
                },
                figure,
            }

            return stateCopy;
        });

        setPicker(prevPickerState => {
            const stateCopy = [...prevPickerState];
            
            stateCopy.splice(index, 1);

            return stateCopy;
        })
    }

    const changeFigurePosition = (item: BoardDropItem, x: number, y: number) => {
        setBoard(prevBoardState => {
            const stateCopy = deepCopy(prevBoardState);

            stateCopy[y][x] = prevBoardState[item.y][item.x];
            stateCopy[item.y][item.x] = null;

            return stateCopy;
        })
    }

    const dropFigureToPicker = (item: BoardDropItem) => {
        const { x, y, figure } = item;

        setPicker(prevPicker => [...prevPicker, figure]);
        setBoard(prevBoard => {
            const stateCopy = deepCopy(prevBoard);

            stateCopy[y][x] = null;

            return stateCopy;
        })
    }

    return {
        setFigureFromPicker,
        changeFigurePosition,
        dropFigureToPicker,
    }

}

export { useSetupUtils }