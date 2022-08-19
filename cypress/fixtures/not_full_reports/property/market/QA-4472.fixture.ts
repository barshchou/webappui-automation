import ReportDataCreator from "../../../data_creator/reportData.creator";
import enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4472");
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
    fileName: "QA-4516.docx",
    fileSelectionName: enums.FILE_SELECTION_NAMES.summaryOfRentStabilizationLaws,
    sectionBeforeName: "Comparable Sales Outline",
    sectionAfterName: "Qualifications"
};