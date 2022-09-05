import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

const reportFixtures = [
    {
        specName: "[QA-4821]",
        reportData: ReportDataCreator.getReportData(
            Enums.MARKET_RESEARCH_TYPES.withoutEmptyNeighborhoodAndArea, {}, true)
    },
    {
        specName: "[QA-4822]",
        reportData: ReportDataCreator.getReportData(
            Enums.MARKET_RESEARCH_TYPES.withoutMultipleNeighborhoodAndArea, {}, true)
    }
];

export default {
    reportFixtures
};