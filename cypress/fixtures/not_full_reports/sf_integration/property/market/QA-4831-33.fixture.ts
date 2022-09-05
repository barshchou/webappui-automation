import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

const reportFixtures = [
    {
        specName: "[QA-4831]",
        reportData: ReportDataCreator.getReportData(
            Enums.MARKET_RESEARCH_TYPES.withoutEmptyNeighborhoodAndArea, {}, true),
        neighborhood: "",
        area: ""
    },
    {
        specName: "[QA-4832]",
        reportData: ReportDataCreator.getReportData(
            Enums.MARKET_RESEARCH_TYPES.withoutMultipleNeighborhoodAndArea, {}, true),
        neighborhood: "",
        area: ""
    },
    {
        specName: "[QA-4833]",
        reportData: ReportDataCreator.getReportData(
            Enums.MARKET_RESEARCH_TYPES.withNeighborhood, {}, true),
        neighborhood: "Red Hook",
        area: ""
    }
];

export default {
    reportFixtures
};