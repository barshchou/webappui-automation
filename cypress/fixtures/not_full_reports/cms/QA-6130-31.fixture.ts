import Enums from "../../../enums/enums";
import ReportDataCreator from "../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData('6130-31', {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

export default {
    reportCreationData: reportCreationFixture(),
    cmsNavigationFlagKey: Enums.FEATURE_FLAG_KEYS.cmsNavigation,
    featureFlagEnable: 0,
    webContentEditorUsername: Cypress.env(`${Enums.USERS.webappContentEditorUsername}`),
    webContentEditorPassword: Cypress.env(`${Enums.USERS.webappContentEditorPassword}`)
};