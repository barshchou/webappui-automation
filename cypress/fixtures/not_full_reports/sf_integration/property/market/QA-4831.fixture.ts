import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

export default {
    reportData: ReportDataCreator.getReportData(Enums.MARKET_RESEARCH_TYPES.withoutNeighborhoodAndArea, {}, true),
};