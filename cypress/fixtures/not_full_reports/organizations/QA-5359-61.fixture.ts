import ReportDataCreator from "../../data_creator/reportData.creator";
import Enums from "../../../enums/enums";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("5359-61", {
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

const _reviewStatus = "Review";


export default {
    reportCreationData: reportCreationFixture(),
    leadAppraiserUsername: _leadAppraiserUsername,
    leadAppraiserPassword: _leadAppraiserPassword,
    appraiserUsername: _appraiserUsername,
    appraiserPassword: _appraiserPassword,
    inspectorUsername: _inspectorUsername,
    inspectorPassword: _inspectorPassword,
    adminUsername: _adminUsername,
    adminPassword: _adminPassword,
    reviewStatus: _reviewStatus
};