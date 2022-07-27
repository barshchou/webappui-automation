import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData('4022', {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _adminUsername = Cypress.env(`${Enums.USERS.webappAdminUsername}`);
const _adminPassword = Cypress.env(`${Enums.USERS.webappAdminPassword}`);
const _commentary = "A survey of active lenders in the subject property's influencing market "+
                    "indicates that 25-year and 30-year mortgage commitments are typically 175 "+
                    "to 450 basis points above 10-year treasuries.";

export default {
    reportCreationData: reportCreationFixture(),
    adminUsername: _adminUsername,
    adminPassword: _adminPassword,
    commentary: _commentary
};