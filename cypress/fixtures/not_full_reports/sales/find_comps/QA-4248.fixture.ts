import { salesInterceptions } from "../../../../actions/base/baseTest.actions";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    setupInterceptions:salesInterceptions,
    reportCreationData: ReportDataCreator.getReportData("4248"),
};