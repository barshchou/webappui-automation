import ReportDataCreator from "../../../data_creator/reportData.creator";
import enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4472", {
        templateValue: enums.TEMPLATE_TYPE.notFreddieMac,
        incomeValue: enums.INCOME_TYPE.both,
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE });
};

const _marketAnalysisUses: BoweryReports.MarketAnalysisUses[] = [
    enums.MARKET_ANALYSIS_USES.multifamily,
    enums.MARKET_ANALYSIS_USES.retail,
    enums.MARKET_ANALYSIS_USES.office,
    enums.MARKET_ANALYSIS_USES.industrial
];

export default {
    reportCreationData: reportCreationFixture(),
    marketAnalysisUses: _marketAnalysisUses,
    fileName: "QA-4472.docx",
    fileContent: "abcdefghijklmnopqrstuvwxyz1234567890",
    sectionBeforeSubmarketFiles: enums.EXPORT_TITLES.submarketAnalyses,
    sectionAfterSubmarketFiles: enums.EXPORT_TITLES.highestAndBestUse,
    sectionBeforeMarketFiles: enums.EXPORT_TITLES.comparableSalesOutline,
    sectionAfterMarketFiles: enums.EXPORT_TITLES.qualifications
};