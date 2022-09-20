import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4472", {
        templateValue: Enums.TEMPLATE_TYPE.notFreddieMac,
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE });
};

const _marketAnalysisUses: BoweryReports.MarketAnalysisUses[] = [
    Enums.MARKET_ANALYSIS_USES.multifamily,
    Enums.MARKET_ANALYSIS_USES.retail,
    Enums.MARKET_ANALYSIS_USES.office,
    Enums.MARKET_ANALYSIS_USES.industrial
];

const _sectionsToExport: BoweryReports.SectionsToIncludeInExport[] = [
    Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.highestAndBestUse,
    Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.multifamilySubmarketAnalysis,
    Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.retailSubmarketAnalysis,
    Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.officeSubmarketAnalysis,
    Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.industrialSubmarketAnalysis,
    Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.addenda
];

export default {
    reportCreationData: reportCreationFixture(),
    marketAnalysisUses: _marketAnalysisUses,
    fileName: "QA-4472.docx",
    fileContent: "abcdefghijklmnopqrstuvwxyz1234567890",
    sectionBeforeSubmarketFiles: Enums.EXPORT_TITLES.submarketAnalyses,
    sectionAfterSubmarketFiles: Enums.EXPORT_TITLES.highestAndBestUse,
    sectionBeforeMarketFiles: Enums.EXPORT_TITLES.comparableSalesOutline,
    sectionAfterMarketFiles: Enums.EXPORT_TITLES.qualifications,
    sectionsToExport: _sectionsToExport
};