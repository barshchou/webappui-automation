import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4205"),
    perRoomAnalysis: Enums.RENT_ROLL_OPTIONS_CHECKBOXS.include,
    devForecast: Enums.RENT_ROLL_OPTIONS_CHECKBOXS.developer,
    summarizeRentRoll: Enums.RENT_ROLL_OPTIONS_CHECKBOXS.summarize
};