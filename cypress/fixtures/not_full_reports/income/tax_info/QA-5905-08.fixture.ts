import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("5905-08"),
    flexibleTaxesKey: Enums.FEATURE_FLAG_KEYS.flexibleTaxes,
    flexibleGbaAnalysisKey: Enums.FEATURE_FLAG_KEYS.enableFlexibleGbaAnalysis,
    onFeatureFlag: 0,
    gbaAnalysisBasis: Enums.BASIS_SQUARE_FOOT_ANALYSIS.grossLeasableArea,
    squareFootAnalysisArea: 3500,
    perSf: Enums.PER_UNIT_PER_SF.perSF,

    assessedValueProvided: 16549,
    opinionProvided: Enums.PROJECTED_TAXES_SECTIONS.opinion,
    opinionProvidedSectionCheckbox: Object.keys(Enums.PROJECTED_TAXES_SECTIONS)[0] as 
        BoweryReports.ProjectedTaxesSectionsKeys,

    income: 99987,
    taxLiabilityRatio: 19,
    percentOfIncome: Enums.PROJECTED_TAXES_SECTIONS.percentOfIncome,
    percentOfIncomeSectionCheckbox: Object.keys(Enums.PROJECTED_TAXES_SECTIONS)[2] as 
        BoweryReports.ProjectedTaxesSectionsKeys,

    netRenovation: 56500,
    assessmentRation: 20,
    renovationSection: Enums.PROJECTED_TAXES_SECTIONS.percentOfRenovations,
    renovationSectionCheckbox: Object.keys(Enums.PROJECTED_TAXES_SECTIONS)[1] as 
        BoweryReports.ProjectedTaxesSectionsKeys,

    estimatedMarketValue: 44572,
    equalizationRatio: 5,
    equalizedMarketValue: Enums.PROJECTED_TAXES_SECTIONS.equalization,
    equalizedMarketValueCheckbox: Object.keys(Enums.PROJECTED_TAXES_SECTIONS)[3] as 
        BoweryReports.ProjectedTaxesSectionsKeys,
};