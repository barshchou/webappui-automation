import { BoweryAutomation } from "../../types";
import ReportDataCreator from "../data_creator/reportData.creator";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("generate-open");

export default {
    reportCreationData: _reportCreationData
};