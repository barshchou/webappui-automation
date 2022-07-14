import ReportDataCreator from "../../../../../data_creator/reportData.creator";
import { BoweryAutomation } from "../../../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4375_76");

export default {
    reportCreationData: _reportCreationData,
    compAddress: "508 Broadway",
    snapshotName: "comp_summary_default_state"
};