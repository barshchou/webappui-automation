import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const compProperty = Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.saleStatus;
const compStatusDate = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.date;
const _calculationUnits = Enums.CALCULATION_UNITS.psf;
const _calculationUnitsText = (calculationUnits: string) => {
    let text = Enums.EXPENSE_ITEM_BASIS_OF_COMPARISON.perUnit;
    if (calculationUnits !== Enums.CALCULATION_UNITS.perResidentialUnits) {
        text = Enums.EXPENSE_ITEM_BASIS_OF_COMPARISON.perSF;
    }
    return text;
};

const unitOfComparisonDiscussionText = "In the Sales Comparison Approach, an opinion of market value is provided by "+
"comparing the subject property to transactions of competitive assets. A major premise is the principle of "+
"substitution which holds market value is directly related to the prices of comparable properties "+
"as a knowledgeable investor will pay no more for a substitute property.\n" +
"The steps taken to apply this approach include the following: (a) research, confirm and verify all "+
"pertinent data for the most relevant sales within the defined market area; (b) analyze "+
"the sales considering appropriate adjustments for material difference in comparison to the subject "+
"property; and (c) reconcile the range of adjusted sale data into an opinion of value.\n"+
"In order to analyze comparable sales, it is necessary to convert the sale prices to an appropriate "+
"unit of comparison, a process which facilitates price comparisons between properties of different sizes, "+
"and it also enables adjustment for qualitative differences. Since investors typically purchase multi-unit "+
"residential buildings in the subject’s area in terms of value "+ 
_calculationUnitsText(_calculationUnits).toLocaleLowerCase() +", we have applied this unit of comparison.";

export default {
    reportCreationData: ReportDataCreator.getReportData("4221", {
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    }),
    adjustmentName: Enums.SALES_ADJUSTMENT_GRID.locationAdjustment,
    compProperty,
    compStatusDate,
    calculationUnits: _calculationUnits,
    comparablesAdjustmentsText: unitOfComparisonDiscussionText,
    discussionSection: Enums.ADJUST_COMPS_DISCUSSION_SECTIONS.unitOfComparison,
    unitOfComparisonDiscussionTitle: Enums.ADJUST_COMPS_DISCUSSION_TITLES.unitOfComparisonDiscussion
};