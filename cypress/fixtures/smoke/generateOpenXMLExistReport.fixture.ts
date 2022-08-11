import { BoweryAutomation } from "../../types/boweryAutomation.type";
import ReportDataCreator from "../data_creator/reportData.creator";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("generate-open");
const _username = Cypress.env("USERNAME");
const _password = Cypress.env("PASSWORD");

export default {
    reportCreationData: _reportCreationData,
    username: _username,
    password: _password
};