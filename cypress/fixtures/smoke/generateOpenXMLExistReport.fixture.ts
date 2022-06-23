import { BoweryAutomation } from "../../types/boweryAutomation.type";
import ReportDataCreator from "../data_creator/reportData.creator";
import * as Users from "../../../cypress.env.json";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("generate-open");
const _username = Users.USERNAME;
const _password = Users.PASSWORD;

export default {
    reportCreationData: _reportCreationData,
    username: _username,
    password: _password
};