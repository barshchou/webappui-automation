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
    },
    {
        specName: "[QA-4837]",
        reportData: ReportDataCreator.getReportData(
            Enums.MARKET_RESEARCH_TYPES.withFullMarketAndSubmarket, {}, true),
        marketAnalysisUses: Enums.MARKET_ANALYSIS_USES.office,
        market: "NY-New York",
        submarket: "NY-South Brooklyn"
    },
    {
        specName: "[QA-4838-39]",
        reportData: ReportDataCreator.getReportData(
            Enums.MARKET_RESEARCH_TYPES.withFullMarketAndSubmarket, {}, true),
        marketAnalysisUses: Enums.MARKET_ANALYSIS_USES.industrial,
        market: "NY-New York",
        submarket: "NY-South Brooklyn"
    },
    {
        specName: "[QA-4840]",
        reportData: ReportDataCreator.getReportData(
            Enums.MARKET_RESEARCH_TYPES.withMultipleSubmarket, {}, true),
        marketAnalysisUses: Enums.MARKET_ANALYSIS_USES.multifamily,
        market: "OH-Springfield",
        submarket: ""
    },
];

export default {
    reportFixtures
};