import * as KeyInfo from '../enums/enumKeys.enum';
import enums from "../enums/enums";

export namespace FindComps {
    export type SalePeriodValues = typeof enums.SALE_PERIOD_VALUES[KeyInfo.SalePeriodValues]
    export type SelectedComparablesSortType = typeof enums.SORT_VALUES[KeyInfo.SortValues]
    export type ConditionValueType = typeof enums.CONDITION_VALUES[KeyInfo.ConditionValues]
    export type ComparableTypes = typeof enums.COMPARABLE_TYPES[KeyInfo.ComparableTypes]
    export type SaleStatusType = typeof enums.SALE_STATUSES[KeyInfo.SaleStatuses]
}