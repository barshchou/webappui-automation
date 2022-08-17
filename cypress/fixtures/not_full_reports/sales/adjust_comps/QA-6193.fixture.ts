import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("6193", { 
        incomeValue: Enums.INCOME_TYPE.commercial 
    }),
    squareFootAnalysisBasis: Enums.BASIS_SQUARE_FOOT_ANALYSIS.grossLeasableArea,
    squareFootAnalysisArea: 1000,
    adjustmentName: Enums.SALES_ADJUSTMENT_GRID.utilityAdjustment,
    utilitiesAdjustmentRowLabel: Enums.UTILITIES_ADJUSTMENTS_EXPANSION_ROWS.commercialAreaSf
};