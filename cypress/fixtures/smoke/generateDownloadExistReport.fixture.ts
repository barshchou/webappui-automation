import { BoweryAutomation } from "../../types";
import ReportDataCreator from "../data_creator/reportData.creator";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("generate-download");

export default {
    reportCreationData: _reportCreationData,
    textToVerifyInReport: "Summary of Salient Facts & Conclusions"
};