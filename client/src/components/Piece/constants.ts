import { PieceNameEnum } from 'shared/enums';
import {
    SpyIcon,
    ScoutIcon,
    MinerIcon,
    SergeantIcon,
    LieutenantIcon,
    CaptainIcon,
    MajorIcon,
    ColonelIcon,
    GeneralIcon,
    MarshalIcon,
    BombIcon,
    FlagIcon,
} from 'assets/pieces';

export const PieceIconPicker = {
    [PieceNameEnum.MARSHAL]: MarshalIcon,
    [PieceNameEnum.GENERAL]: GeneralIcon,
    [PieceNameEnum.COLONEL]: ColonelIcon,
    [PieceNameEnum.MAJOR]: MajorIcon,
    [PieceNameEnum.CAPTAIN]: CaptainIcon,
    [PieceNameEnum.LIEUTENANT]: LieutenantIcon,
    [PieceNameEnum.SERGEANT]: SergeantIcon,
    [PieceNameEnum.MINER]: MinerIcon,
    [PieceNameEnum.SCOUT]: ScoutIcon,
    [PieceNameEnum.SPY]: SpyIcon,
    [PieceNameEnum.BOMB]: BombIcon,
    [PieceNameEnum.FLAG]: FlagIcon,
};