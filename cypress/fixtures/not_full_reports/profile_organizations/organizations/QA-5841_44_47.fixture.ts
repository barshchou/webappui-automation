import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import ClientCreationData from "../../../data_creator/clientData.creator";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("5841_44_47", {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _leadAppraiserUsername = Cypress.env(`${Enums.USERS.webappLeadAppraiserUsername}`);
const _leadAppraiserPassword = Cypress.env(`${Enums.USERS.webappLeadAppraiserPassword}`);
const _appraiserUsername = Cypress.env(`${Enums.USERS.webappAppraiserUsername}`);
const _appraiserPassword = Cypress.env(`${Enums.USERS.webappAppraiserPassword}`);
const _inspectorUsername = Cypress.env(`${Enums.USERS.webappInspectorUsername}`);
const _inspectorPassword = Cypress.env(`${Enums.USERS.webappInspectorPassword}`);

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