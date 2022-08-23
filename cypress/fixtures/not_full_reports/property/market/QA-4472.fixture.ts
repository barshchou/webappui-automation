import ReportDataCreator from "../../../data_creator/reportData.creator";
import enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";

const reportCreationFixture = () => {
    return ReportDataCreator.setReportNumber("4472")
        .setAddress()
        .setTemplateValue(enums.TEMPLATE_TYPE.notFreddieMac)
        .setIncomeValue(enums.INCOME_TYPE.both)
        .setConclusionValue(enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE).build();
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
    sectionBeforeSubmarketFiles: "Submarket Analyses",
    sectionAfterSubmarketFiles: "Highest & Best Use",
    sectionBeforeMarketFiles: "Comparable Sales Outline",
    sectionAfterMarketFiles: "Qualifications"
};