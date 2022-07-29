import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const _randomPart = (): string => {
    return "5359-62-" + Date.now().toString();
};

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData(_randomPart(), {
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

const _reviewStatus = Enums.REPORT_STATUS.review;
const _draftStatus =  Enums.REPORT_STATUS.draft;
const _submittedStatus = Enums.REPORT_STATUS.submitted;
const _approvedStatus =  Enums.REPORT_STATUS.approved;

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
    reviewStatus: _reviewStatus,
    draftStatus: _draftStatus,
    submittedStatus: _submittedStatus,
    approvedStatus: _approvedStatus,
};