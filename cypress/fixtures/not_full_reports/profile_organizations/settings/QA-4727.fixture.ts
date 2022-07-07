import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData('4727', {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _adminUsername = Cypress.env(`${Enums.USERS.webapp_admin_username}`);
const _adminPassword = Cypress.env(`${Enums.USERS.webapp_admin_password}`);
const _textUpdate = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

export default {
    reportCreationData: reportCreationFixture(),
    adminUsername: _adminUsername,
    adminPassword: _adminPassword,
    featureFlagKey: Enums.FEATURE_FLAG_KEYS.reportTextEdit,
    offFeatureFlag: 1,
    textUpdate: _textUpdate
};