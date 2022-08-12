import Enums from "../../../enums/enums";
import ReportDataCreator from "../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData('5367-70_6303', {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _userFixture = () => {
    return [
        {
            username: Cypress.env(`${Enums.USERS.webappLeadAppraiserUsername}`),
            password: Cypress.env(`${Enums.USERS.webappLeadAppraiserPassword}`),
            cmdIsVisible: false,
            testCaseId: '[QA-5368]',
            role: 'Lead Appraiser'
        },
        {
            username: Cypress.env(`${Enums.USERS.automationUser}`),
            password: Cypress.env(`${Enums.USERS.automationPass}`),
            cmdIsVisible: true,
            testCaseId: '[QA-5367]',
            role: 'Admin'
        },
        {
            username: Cypress.env(`${Enums.USERS.webappContentEditorUsername}`),
            password: Cypress.env(`${Enums.USERS.webappContentEditorPassword}`),
            cmdIsVisible: true,
            testCaseId: '[QA-6303]',
            role: 'Content Editor'
        },
        {
            username: Cypress.env(`${Enums.USERS.webappAppraiserUsername}`),
            password: Cypress.env(`${Enums.USERS.webappAppraiserPassword}`),
            cmdIsVisible: false,
            testCaseId: '[QA-5369]',
            role: 'Appraiser'
        },
        {
            username: Cypress.env(`${Enums.USERS.webappInspectorUsername}`),
            password: Cypress.env(`${Enums.USERS.webappInspectorPassword}`),
            cmdIsVisible: false,
            testCaseId: '[QA-5370]',
            role: 'Inspector'
        }
    ];
};

export default {
    reportCreationData: reportCreationFixture(),
    userFixture: _userFixture(),
    cmsNavigationFlagKey: Enums.FEATURE_FLAG_KEYS.cmsNavigation,
    featureFlagEnable: 0
};