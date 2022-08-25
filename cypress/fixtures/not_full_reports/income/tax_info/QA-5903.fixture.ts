import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("5903"),
    flexibleTaxesKey: Enums.FEATURE_FLAG_KEYS.flexibleTaxes,
    flexibleGbaAnalysisKey: Enums.FEATURE_FLAG_KEYS.enableFlexibleGbaAnalysis,
    onFeatureFlag: 0,
    gbaAnalysisBasis: Enums.BASIS_SQUARE_FOOT_ANALYSIS.grossLeasableArea,
    squareFootAnalysisArea: 3500,
    perSf: Enums.PER_UNIT_PER_SF.perSF,
    income: 99987,
    taxLiabilityRatio: 19,
    percentOfIncome: Enums.PROJECTED_TAXES_SECTIONS.percentOfIncome,
    percentOfIncomeSectionCheckbox: Object.keys(Enums.PROJECTED_TAXES_SECTIONS)[2] as 
        BoweryReports.ProjectedTaxesSectionsKeys
};