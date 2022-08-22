import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportCreationFixture = [
    ReportDataCreator.getReportData("6194", { 
        incomeValue: Enums.INCOME_TYPE.residential }),
    ReportDataCreator.getReportData("6194", { 
        incomeValue: Enums.INCOME_TYPE.commercial }),
    ReportDataCreator.getReportData("6194", { 
        incomeValue: Enums.INCOME_TYPE.both }),
];

export default {
    reportCreationFixture: _reportCreationFixture,
    squareFootAnalysisBasis: Enums.BASIS_SQUARE_FOOT_ANALYSIS.grossLeasableArea,
    squareFootAnalysisArea: 1000,
    adjustmentName: Enums.SALES_ADJUSTMENT_GRID.utilityAdjustment,
    utilitiesAdjustmentRowLabel: Enums.UTILITIES_ADJUSTMENTS_EXPANSION_ROWS.commercialAreaSf,
    commercialUnits: 3,
    commercialUnitsArea: [ 150, 250, 350 ]
};