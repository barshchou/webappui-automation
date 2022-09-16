import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("5901-04"),
    gbaAnalysisBasis: Enums.BASIS_SQUARE_FOOT_ANALYSIS.grossLeasableArea,
    squareFootAnalysisArea: 3500,
    perSf: Enums.PER_UNIT_PER_SF.perSF,

    assessedValueProvided: 16549,
    taxableAssessedValueIdInput: Enums.PROJECTED_TAXES_INPUTS.taxableAssessedValueId,
    opinionProvided: Enums.PROJECTED_TAXES_SECTIONS.opinion,
    opinionProvidedSectionCheckbox: Object.keys(Enums.PROJECTED_TAXES_SECTIONS)[0] as 
        BoweryReports.ProjectedTaxesSectionsKeys,

    income: 99987,
    taxLiabilityRatio: 19,
    taxLiabilityRatioInput: Enums.PROJECTED_TAXES_INPUTS.liabilityRatio,
    incomeInput: Enums.PROJECTED_TAXES_INPUTS.income,
    percentOfIncome: Enums.PROJECTED_TAXES_SECTIONS.percentOfIncome,
    percentOfIncomeSectionCheckbox: Object.keys(Enums.PROJECTED_TAXES_SECTIONS)[2] as 
        BoweryReports.ProjectedTaxesSectionsKeys,

    netRenovation: 56500,
    assessmentRation: 20,
    assessmentRationInput: Enums.PROJECTED_TAXES_INPUTS.assessmentRatio,
    netRenovationInput: Enums.PROJECTED_TAXES_INPUTS.netRenovationCost,
    renovationSection: Enums.PROJECTED_TAXES_SECTIONS.percentOfRenovations,
    renovationSectionCheckbox: Object.keys(Enums.PROJECTED_TAXES_SECTIONS)[1] as 
        BoweryReports.ProjectedTaxesSectionsKeys,

    estimatedMarketValue: 44572,
    equalizationRatio: 5,
    equalizationRatioInput: Enums.PROJECTED_TAXES_INPUTS.equalizationRatio,
    estimatedMarketValueInput: Enums.PROJECTED_TAXES_INPUTS.marketValue,
    equalizedMarketValue: Enums.PROJECTED_TAXES_SECTIONS.equalization,
    equalizedMarketValueCheckbox: Object.keys(Enums.PROJECTED_TAXES_SECTIONS)[3] as 
        BoweryReports.ProjectedTaxesSectionsKeys,
};