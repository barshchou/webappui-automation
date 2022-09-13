import Enums from "../../../../../enums/enums";
import { BoweryAutomation } from "../../../../../types/boweryAutomation.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";
import userDataCreator from "../../../../data_creator/userData.creator";

const username = "TestUserName-" + `${Date.now()}` + '@boweryvaluation.com';
const firstName = "TestUserFirstName-" + `${Date.now()}`;
const lastName = "TestUserLastName-" + `${Date.now()}`;
const roleName = [ Enums.USER_ROLES.leadAppraiser ];

const userOptions: BoweryAutomation.OrganizationCreateNewUserData = {
    username,
    firstName,
    lastName,
    roleName
};

export default {
    reportData: ReportDataCreator.getReportData("4422"),
    clientCreationData: userDataCreator.getUserData(userOptions),
    userToFind: firstName + " " + lastName,
};