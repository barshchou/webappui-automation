import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("5901"),
    flexibleTaxesKey: Enums.FEATURE_FLAG_KEYS.flexibleTaxes,
    flexibleGbaAnalysisKey: Enums.FEATURE_FLAG_KEYS.enableFlexibleGbaAnalysis,
    onFeatureFlag: 0,
    gbaAnalysisBasis: Enums.BASIS_SQUARE_FOOT_ANALYSIS.grossLeasableArea,
    squareFootAnalysisArea: 3500,
    perSf: Enums.PER_UNIT_PER_SF.perSF,
    assessedValueProvided: 16549,
    opinionProvided: Enums.PROJECTED_TAXES_SECTIONS.opinion,
    opinionProvidedSectionCheckbox: Object.keys(Enums.PROJECTED_TAXES_SECTIONS)[0] as 
        BoweryReports.ProjectedTaxesSectionsKeys
};