import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

const reportFixtures = [
    {
        specName: "[QA-4835]",
        reportData: ReportDataCreator.getReportData(
            Enums.MARKET_RESEARCH_TYPES.withMarketAndSubmarket, {}, true),
        market: "NY-New York",
        submarket: "NY-South Shore Brooklyn"
    }
];

export default {
    reportFixtures
};