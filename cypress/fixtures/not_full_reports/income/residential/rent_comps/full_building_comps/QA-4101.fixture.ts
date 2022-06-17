import { BoweryAutomation } from "../../../../../../types";
import ReportDataCreator from "../../../../../data_creator/reportData.creator";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4101");

export default {
    reportCreationData: _reportCreationData,
    compAddress: "508 Broadway"
};