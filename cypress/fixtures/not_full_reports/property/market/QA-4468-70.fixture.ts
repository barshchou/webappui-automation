import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4468-70");
};

const _marketAnalysisUses: BoweryReports.MarketAnalysisUses[] = [
    Enums.MARKET_ANALYSIS_USES.multifamily,
    Enums.MARKET_ANALYSIS_USES.retail,
    Enums.MARKET_ANALYSIS_USES.office,
    Enums.MARKET_ANALYSIS_USES.industrial
];

export default {
    reportCreationData: reportCreationFixture(),
    marketAnalysisUses: _marketAnalysisUses
};