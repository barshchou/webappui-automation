import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

export default {
    reportCreationData: ReportDataCreator.getReportData("6265", {
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS,
        incomeValue: Enums.INCOME_TYPE.both
    }),
    numberOfUnits: 1,
    concludedValuePerSf: 1532.98,
    squareFootBasis: Enums.BASIS_SQUARE_FOOT_ANALYSIS.grossLeasableArea,
    squareFootAnalysisArea: 3952,
    unitSf: 500,
    valueConclusionAsIs: Enums.VALUE_CONCLUSION_NAME.asIs,
    finalValueApproachSales: Enums.FINAL_VALUES_APPROACH.sales
};