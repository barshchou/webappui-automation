import { BoweryAutomation } from "../../types/boweryAutomation.type";
import ReportDataCreator from "../data_creator/reportData.creator";
import Users from "../../../cypress.env.json";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("generate-download");
const _username = Users.USERNAME;
const _password = Users.PASSWORD;

export default {
    reportCreationData: _reportCreationData,
    textToVerifyInReport: "Summary of Salient Facts & Conclusions",
    username: _username,
    password: _password
};