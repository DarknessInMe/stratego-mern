import { Dispatch, SetStateAction } from 'react';

type SetState<State> = Dispatch<SetStateAction<State>>

export { SetState }