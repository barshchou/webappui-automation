import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4470");
};

const _marketAnalysisUses: BoweryReports.MarketAnalysisUses[] = [
    enums.MARKET_ANALYSIS_USES.multifamily,
    enums.MARKET_ANALYSIS_USES.retail,
    enums.MARKET_ANALYSIS_USES.office,
    enums.MARKET_ANALYSIS_USES.industrial
];

export default {
    reportCreationData: reportCreationFixture(),
    marketAnalysisUses: _marketAnalysisUses
};