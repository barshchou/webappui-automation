import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

const reportFixtures = [
    {
        specName: "[QA-4835]",
        reportData: ReportDataCreator.getReportData(
            Enums.MARKET_RESEARCH_TYPES.withFullMarketAndSubmarket, {}, true),
        marketAnalysisUses: Enums.MARKET_ANALYSIS_USES.multifamily,
        market: "NY-New York",
        submarket: "NY-South Shore Brooklyn"
    },
    {
        specName: "[QA-4836]",
        reportData: ReportDataCreator.getReportData(
            Enums.MARKET_RESEARCH_TYPES.withFullMarketAndSubmarket, {}, true),
        marketAnalysisUses: Enums.MARKET_ANALYSIS_USES.retail,
        market: "NY-New York",
        submarket: "NY-South Brooklyn"
    }
];

export default {
    reportFixtures
};