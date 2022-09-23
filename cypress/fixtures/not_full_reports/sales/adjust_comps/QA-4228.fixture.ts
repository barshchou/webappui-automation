import { Filter } from "mongodb";
import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const compProperty = Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.saleStatus;
const compStatusDate = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.date;
const filter: Filter<object> = { $or:[ { [compProperty]:compStatusDate } ] };
const positiveSizeAdjustment = 50;
const positiveStabilizationLevelAdjustment = 60;
const positiveConditionAdjustment = 70;
const negativeSizeAdjustment = -70;
const negativeAStabilizationLevelAdjustment = -80;
const negativeConditionAdjustment = -90;
const yearBuilt = 1945;
const buildingConditionAsIs = Enums.PROPERTY_CONDITIONS.excellent;
const buildingConditionAsStabilized = Enums.PROPERTY_CONDITIONS.excellent;
const _calculationUnits = Enums.CALCULATION_UNITS.perResidentialUnits;
const _calculationUnitsText = (calculationUnits: string) => {
    let text = Enums.EXPENSE_ITEM_BASIS_OF_COMPARISON.perUnit;
    if (calculationUnits !== Enums.CALCULATION_UNITS.perResidentialUnits) {
        text = Enums.EXPENSE_ITEM_BASIS_OF_COMPARISON.perSF;
    }
    return text;
};

const _compsFixture = (calculationUnits: string) => [
    {
        adjustments: { 
            sizeAdjustment: negativeSizeAdjustment,
            stabilizationLevelAdjustment: negativeAStabilizationLevelAdjustment,
            conditionAdjustment: negativeConditionAdjustment
        },
        sizeDiscussionText: "This adjustment accounts for the difference in size between each of the comparables " + 
        "and the subject property. We note that there is an inverse relationship between size and "+ 
        _calculationUnitsText(calculationUnits).toLocaleLowerCase() + " such that smaller buildings will " + 
        "sell for a higher price "+ _calculationUnitsText(calculationUnits).toLocaleLowerCase() +" and vice versa. " + 
        "Comparable 1 warranted a downward adjustment as it is significantly smaller than the subject.",
        rentStabilizationDiscussionText: "The subject is not rent stabilized. " + 
        "Comparable 1 has a lower level of rent stabilization, and thus required a downward adjustment.",
        conditionDiscussionText: "The subject property was constructed in "+ yearBuilt +" and is in "+ 
        buildingConditionAsIs.toLocaleLowerCase() +" condition. " + 
        "Upon completion, the subject will be in "+ buildingConditionAsStabilized.toLocaleLowerCase() +" condition. " + 
        "Comparable 1 is in a superior condition, and thus required a negative adjustment."
    },
    {
        adjustments: {
            sizeAdjustment: positiveSizeAdjustment,
            stabilizationLevelAdjustment: positiveStabilizationLevelAdjustment,
            conditionAdjustment: positiveConditionAdjustment
        },
        sizeDiscussionText: "This adjustment accounts for the difference in size between each of the comparables " + 
        "and the subject property. We note that there is an inverse relationship between size and "+ 
        _calculationUnitsText(calculationUnits).toLocaleLowerCase() + 
        " such that smaller buildings will sell for a higher price "+ 
        _calculationUnitsText(calculationUnits).toLocaleLowerCase() + " and vice versa. " + 
        "Comparable 1 warranted an upward adjustment as it is significantly larger than the subject.",
        rentStabilizationDiscussionText: "The subject is not rent stabilized. " + 
        "Comparable 1 has a higher level of rent stabilization, and thus required an upward adjustment.",
        conditionDiscussionText: "The subject property was constructed in "+ yearBuilt +" and is in "+ 
        buildingConditionAsIs.toLocaleLowerCase() +" condition. " + 
        "Upon completion, the subject will be in "+ buildingConditionAsStabilized.toLocaleLowerCase() +" condition. " + 
        "Comparable 1 is in an inferior condition, and thus required a positive adjustment."
    },
    {
        adjustments: {
            sizeAdjustment: 0,
            stabilizationLevelAdjustment: 0,
            conditionAdjustment: 0
        },
        sizeDiscussionText: "This adjustment accounts for the difference in size between each of the comparables " + 
        "and the subject property. We note that there is an inverse relationship between size and "+ 
        _calculationUnitsText(calculationUnits).toLocaleLowerCase() + 
        " such that smaller buildings will sell for a higher price "+ 
        _calculationUnitsText(calculationUnits).toLocaleLowerCase() + " and vice versa. " + 
        "The subject and all of the comparables are within a reasonable size range, " + 
        "thus no adjustments were necessary.",
        rentStabilizationDiscussionText: "The subject is not rent stabilized. " + 
        "No adjustments were necessary as the comparables have similar rent stabilization levels.",
        conditionDiscussionText: "The subject property was constructed in "+ yearBuilt +" and is in "+ 
        buildingConditionAsIs.toLocaleLowerCase() +" condition. " + 
        "Upon completion, the subject will be in "+ buildingConditionAsStabilized.toLocaleLowerCase() +" condition. " +
        "The comparables sold in similar condition to the subject, and no adjustment was warranted."
    }
];

export default {
    reportCreationData: ReportDataCreator.getReportData("4228", {
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    }),
    adjustmentName: Enums.SALES_ADJUSTMENT_GRID.locationAdjustment,
    filter,
    calculationUnits: _calculationUnits,
    comparablesAdjustments: _compsFixture(_calculationUnits),
    discussionSection: Enums.ADJUST_COMPS_DISCUSSION_SECTIONS.other,
    sizeDiscussionTitle: Enums.ADJUST_COMPS_DISCUSSION_TITLES.sizeAdjustmentDiscussion,
    rentStabilizationDiscussionTitle: Enums.ADJUST_COMPS_DISCUSSION_TITLES.incomeLevelDiscussion,
    conditionDiscussionTitle: Enums.ADJUST_COMPS_DISCUSSION_TITLES.conditionDiscussion,
    yearBuilt,
    buildingConditionAsIs,
    buildingConditionAsStabilized,
    valueConclusionAsIs: Enums.VALUE_CONCLUSION_NAME.asIs,
    valueConclusionAsStabilized: Enums.VALUE_CONCLUSION_NAME.asStabilized
};