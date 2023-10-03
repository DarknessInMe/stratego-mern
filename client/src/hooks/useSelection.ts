import { useRootContext } from 'context/RootContext';
import { CoordinatesType } from 'shared/types';
import { isSelectedByPossiblePath } from 'shared/utils';

export const useSelection = (coordinates: CoordinatesType) => {
    const { selection } = useRootContext();

    return isSelectedByPossiblePath(selection?.possiblePath || [], coordinates);
};