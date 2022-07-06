import ReportDataCreator from "../../data_creator/reportData.creator";
import Enums from "../../../enums/enums";
import ClientCreationData from "../../data_creator/clientData.creator";
import { BoweryAutomation } from "../../../types/boweryAutomation.type";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("5841_44_47", {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _leadAppraiserUsername = Cypress.env(`${Enums.USERS.webapp_lead_appraiser_username}`);
const _leadAppraiserPassword = Cypress.env(`${Enums.USERS.webapp_lead_appraiser_password}`);
const _appraiserUsername = Cypress.env(`${Enums.USERS.webapp_appraiser_username}`);
const _appraiserPassword = Cypress.env(`${Enums.USERS.webapp_appraiser_password}`);
const _inspectorUsername = Cypress.env(`${Enums.USERS.webapp_inspector_username}`);
const _inspectorPassword = Cypress.env(`${Enums.USERS.webapp_inspector_password}`);

const _clientFirstName = "TestClientFirstName-" + `${Date.now()}`;
const _clientLastName = "TestClientLastName-" + `${Date.now()}`;

const _clientOptions: BoweryAutomation.OrganizationCreateNewClientData = {
    firstName: _clientFirstName,
    lastName: _clientLastName,
    clientCompanyName: null,
    streetAddress: null,
    city: null
};

export default {
    reportCreationData: reportCreationFixture(),
    clientCreationData: ClientCreationData.getClientData(_clientOptions),
    shortTextToType: _clientFirstName,
    textToType: _clientFirstName + " " + _clientLastName,
    companyName: "Test Company & CO",
    leadAppraiserUsername: _leadAppraiserUsername,
    leadAppraiserPassword: _leadAppraiserPassword,
    appraiserUsername: _appraiserUsername,
    appraiserPassword: _appraiserPassword,
    inspectorUsername: _inspectorUsername,
    inspectorPassword: _inspectorPassword,
    profileOrganizationName: "Organization",
    createNewClientTitle :"Create New Client"
};