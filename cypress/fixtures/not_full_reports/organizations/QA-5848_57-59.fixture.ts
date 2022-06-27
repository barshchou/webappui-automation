import ReportDataCreator from "../../data_creator/reportData.creator";
import Enums from "../../../enums/enums";
import ClientCreationData from "../../data_creator/clientData.creator";
import { BoweryAutomation } from "../../../types/boweryAutomation.type";
import userDataCreator from "../../data_creator/userData.creator";
import enums from "../../../enums/enums";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("5848_57-59", {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _leadAppraiserUsername = Cypress.env(`${Enums.USERS.webapp_lead_appraiser_username}`);
const _leadAppraiserPassword = Cypress.env(`${Enums.USERS.webapp_lead_appraiser_password}`);
const _appraiserUsername = Cypress.env(`${Enums.USERS.webapp_appraiser_username}`);
const _appraiserPassword = Cypress.env(`${Enums.USERS.webapp_appraiser_password}`);
const _inspectorUsername = Cypress.env(`${Enums.USERS.webapp_inspector_username}`);
const _inspectorPassword = Cypress.env(`${Enums.USERS.webapp_inspector_password}`);
const _adminUsername = Cypress.env(`${Enums.USERS.webapp_admin_username}`);
const _adminPassword = Cypress.env(`${Enums.USERS.webapp_admin_password}`);

const _userFirstName = "TestUserFirstName-" + `${Date.now()}`;
const _userLastName = "TestUserLastName-" + `${Date.now()}`;
const _userName = "TestUserName-" + `${Date.now()}` + '@boweryvaluation.com';
const _roleName = [ enums.USER_ROLES.appraiser ];

const _userOptions: BoweryAutomation.OrganizationCreateNewUserData = {
    username: _userName,
    firstName: _userFirstName,
    lastName: _userLastName,
    roleName: _roleName
};

export default {
    reportCreationData: reportCreationFixture(),
    clientCreationData: userDataCreator.getUserData(_userOptions),
    shortTextToType: _userFirstName,
    userToFind: _userFirstName + " " + _userLastName,
    leadAppraiserUsername: _leadAppraiserUsername,
    leadAppraiserPassword: _leadAppraiserPassword,
    appraiserUsername: _appraiserUsername,
    appraiserPassword: _appraiserPassword,
    inspectorUsername: _inspectorUsername,
    inspectorPassword: _inspectorPassword,
    adminUsername: _adminUsername,
    adminPassword: _adminPassword,
};