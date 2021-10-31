import { Figure } from 'shared/interfaces';
import { SpecialFigures } from 'shared/enums';
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
} from 'assets';

const SPY: Figure = {
    rankName: 'Spy',
    rankWeight: 1,
    image: SpyIcon,
}

const SCOUT: Figure = {
    rankName: 'Scout',
    rankWeight: 2,
    image: ScoutIcon,
}

const MINER: Figure = {
    rankName: 'Miner',
    rankWeight: 3,
    image: MinerIcon,
}

const SERGEANT: Figure = {
    rankName: 'Sergeant',
    rankWeight: 4,
    image: SergeantIcon,
}

const LIEUTENANT: Figure = {
    rankName: 'Lieutenant',
    rankWeight: 5,
    image: LieutenantIcon,
}

const CAPTAIN: Figure = {
    rankName: 'Captain',
    rankWeight: 6,
    image: CaptainIcon,
}

const MAJOR: Figure = {
    rankName: 'Major',
    rankWeight: 7,
    image: MajorIcon,
}

const COLONEL: Figure = {
    rankName: 'Colonel',
    rankWeight: 8,
    image: ColonelIcon,
}

const GENERAL: Figure = {
    rankName: 'General',
    rankWeight: 9,
    image: GeneralIcon,
}

const MARSHAL: Figure = {
    rankName: 'Marshal',
    rankWeight: 10,
    image: MarshalIcon,
}

const BOMB: Figure = {
    rankName: 'Bomb',
    rankWeight: SpecialFigures.BOMB,
    image: BombIcon,
}

const FLAG: Figure = {
    rankName: 'Flag',
    rankWeight: SpecialFigures.FLAG,
    image: FlagIcon,  
}

export {
    SPY,
    SCOUT,
    MINER,
    SERGEANT,
    LIEUTENANT,
    CAPTAIN,
    MAJOR,
    COLONEL,
    GENERAL,
    MARSHAL,
    BOMB,
    FLAG,
}