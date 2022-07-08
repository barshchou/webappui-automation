import { _HomePage } from './../../../../actions/base';
import { createReport, deleteReport } from './../../../../actions/base/baseTest.actions';
import { Organization, PreviewEdit, ReviewExport } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/profile_organizations/settings/QA-4727.fixture";
import enums from '../../../../enums/enums';
import launchDarklyApi from '../../../../api/launchDarkly.api';

describe("[QA-4727] Verify possibility to edit static text in-app", 
    { tags:[ "@organizations", "@settings", "@check_export" ] }, () => {

    it('Update static text in Settings and verify changes on a corresponding pages', () => {
        cy.stepInfo('1. Set Launch Darkly flag to see Report Copy Editor section. Create a report');
        launchDarklyApi.setFeatureFlagForUser(testData.reportTextEditorFlagKey, testData.featureFlagEnable)
            .setFeatureFlagForUser(testData.swotAnalysisFlagKey, testData.featureFlagEnable);
        createReport(testData.reportCreationData);

        cy.stepInfo('2. Navigate to Organization -> Settings and update Letter of Transmittal text');
        _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);
        Organization._OrganizationActions.openOrganizationSettingsPage();
        Organization._OrganizationSettingsActions.updateComplianceParagraphDiscussion(testData.textUpdate, true);

        cy.stepInfo('3. Open created report and verify Letter of Transmittal page');
        _NavigationSection.returnToHomePage();
        _HomePage.openReportByName(testData.reportCreationData.reportNumber);
        _NavigationSection.navigateToLetterOfTransmittal();
        PreviewEdit._LetterOfTransmittal.verifyTextInFormContainer(testData.textUpdate);

        cy.stepInfo('4. Export report');
        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it('Check export', () => {
        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docx_html: "html" }).then(file => {
            cy.log(<string>file);
            cy.visit(<string>file);
            cy.stepInfo("5. Verify commentary text in exported report");
            cy.contains(testData.textUpdate).should('exist');
        });
    });

    after('Remove feature flag', () => {
        launchDarklyApi.removeUserTarget(testData.reportTextEditorFlagKey);
        launchDarklyApi.removeUserTarget(testData.swotAnalysisFlagKey);
    });
});