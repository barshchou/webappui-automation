import { BoweryAutomation } from "../../../../../types/boweryAutomation.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator
    .getReportData("4113_14_16_20");

export default {
    reportCreationData: _reportCreationData
};
