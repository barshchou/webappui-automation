import { BoweryAutomation } from "../../types/boweryAutomation.type";
import ReportDataCreator from "../data_creator/reportData.creator";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("generate-download");
const _username = Cypress.env("USERNAME");
const _password = Cypress.env("PASSWORD");

export default {
    reportCreationData: _reportCreationData,
    textToVerifyInReport: "Summary of Salient Facts & Conclusions",
    username: _username,
    password: _password
};