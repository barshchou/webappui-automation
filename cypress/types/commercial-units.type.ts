import Enums from "../enums/enums";
import * as KeyInfo from '../enums/enumKeys.enum';

export namespace CommercialUnits {
    export type UseValues = keyof typeof Enums.COMMERCIAL_UNITS_USE_VALUES
    export type UseTexts = typeof Enums.COMMERCIAL_UNITS_USE_TEXTS[KeyInfo.CommercialUnitsUseTextsKeys]
    export type Groups = typeof Enums.COMMERCIAL_UNITS_GROUPS[KeyInfo.CommercialUnitsGroupsKeys]
    export type GradeValues = keyof typeof Enums.COMMERCIAL_UNITS_GRADE_VALUES
    export type FacadeValues = typeof Enums.COMMERCIAL_UNITS_FACADE_VALUES[KeyInfo.CommercialUnitsFacadeKeys]
    export type StateValues = typeof Enums.COMMERCIAL_UNITS_STATE_VALUES[KeyInfo.CommercialUnitsStateKeys]
    export type CeilingHeightValues = keyof typeof Enums.COMMERCIAL_UNITS_CEILING_HEIGHT_VALUES
    export type LocationValues = typeof Enums.COMMERCIAL_UNITS_LOCATION_VALUES[KeyInfo.CommercialUnitsLocationKeys]
    export type StreetTypeValues =  
        typeof Enums.COMMERCIAL_UNITS_STREET_TYPE_VALUES[KeyInfo.CommercialUnitsStreetTypeKeys]
    export type FloorValues = keyof typeof Enums.COMMERCIAL_UNITS_FLOOR_VALUES
    export type FrontageValues = keyof typeof Enums.COMMERCIAL_UNITS_FRONTAGE_VALUES

    export type GroupsValues = UseValues | GradeValues | FacadeValues | StateValues
    | CeilingHeightValues | LocationValues | StreetTypeValues | FrontageValues | FloorValues;
}