import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("6191-92", { 
        incomeValue: Enums.INCOME_TYPE.residential 
    }),
    squareFootAnalysisBasis: Enums.BASIS_SQUARE_FOOT_ANALYSIS.grossLeasableArea,
    squareFootAnalysisArea: 1000,
    adjustmentName: Enums.SALES_ADJUSTMENT_GRID.otherAdjustment,
    otherAdjustmentRowLabel: Enums.ADJUSTMENT_EXPANSION_LABELS.squareFootage
};