import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import userDataCreator from "../../../data_creator/userData.creator";
import enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("5848_57-59", {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _leadAppraiserUsername = Cypress.env(`${Enums.USERS.webappLeadAppraiserUsername}`);
const _leadAppraiserPassword = Cypress.env(`${Enums.USERS.webappLeadAppraiserPassword}`);
const _appraiserUsername = Cypress.env(`${Enums.USERS.webappAppraiserUsername}`);
const _appraiserPassword = Cypress.env(`${Enums.USERS.webappAppraiserPassword}`);
const _inspectorUsername = Cypress.env(`${Enums.USERS.webappInspectorUsername}`);
const _inspectorPassword = Cypress.env(`${Enums.USERS.webappInspectorPassword}`);
const _adminUsername = Cypress.env(`${Enums.USERS.webappAdminUsername}`);
const _adminPassword = Cypress.env(`${Enums.USERS.webappAdminPassword}`);

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
    createNewUserTitle: "Create New User",
    createNewUserDirectLink: "/organization/5818c25f67ac15110095afc4/organization-new-user"
};