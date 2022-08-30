import { loginAction } from './../../../actions/base/baseTest.actions';
import { _HomePage } from '../../../actions/base';
import { createReport } from '../../../actions/base/baseTest.actions';
import { PreviewEdit, ReviewExport } from '../../../actions';
import { _NavigationSection } from '../../../actions/base';
import testData from "../../../fixtures/not_full_reports/cms/QA-4727.fixture";
import launchDarklyApi from '../../../api/launchDarkly.api';
import { conditionalDescribe } from "../../checkIsProd.utils";
import { _CmsBaseActions } from '../../../actions/cms';

conditionalDescribe("[QA-4727] Verify possibility to edit text", 
    { tags:[ "@cms", "@check_export", "@feature_flag" ] }, () => {

        it('Update static text in Settings and verify changes on a corresponding pages', () => {
            cy.stepInfo('Preconditions: Set Launch Darkly flag to see Report Copy Editor section. Create a report');
            launchDarklyApi.setFeatureFlagForUser(testData.reportTextEditorFlagKey, testData.featureFlagEnable)
                .setFeatureFlagForUser(testData.swotAnalysisFlagKey, testData.featureFlagEnable);
            createReport(testData.reportCreationData);

            cy.stepInfo('1. Open CMS > Letter of Transmittal page');
            _NavigationSection.navigateToContentManagementSystem();
            _CmsBaseActions.openLetterOfTransmittalPage();

            cy.stepInfo(`2. Make some changes with any text item → 'Modified' tag is shown above field`);
            _CmsBaseActions.updateSectionDiscussion(testData.sectionName, 
                testData.textUpdate, true)
                .verifyModifiedLabel(testData.sectionName);

            cy.stepInfo('3. Open any report > Letter of Transmittal page ');
            _NavigationSection.returnToHomePage();
            _HomePage.openReportByName(testData.reportCreationData.reportNumber);
            _NavigationSection.navigateToLetterOfTransmittal();
            PreviewEdit._LetterOfTransmittal.verifyTextInFormContainer(testData.textUpdate);

            /*
             *  TODO: [QA-6362] Generated report doesn't have update Compliance Paragraph discussion, need to
             * think about timeout.
             */
            cy.stepInfo('4. Export report');
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it('Check export', () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.stepInfo("6. Verify commentary text in exported report");
                    cy.contains(testData.textUpdate).should('exist');
                });
        });

        afterEach('Revert commentary to original and remove feature flags', () => {
            cy.stepInfo('Revert commentary to original');
            if (!Cypress.currentTest.title.includes("Check export")) {
                loginAction();
                _NavigationSection.navigateToContentManagementSystem();
                _CmsBaseActions.openLetterOfTransmittalPage()
                    .revertSectionToOriginal(testData.sectionName);
            }

            cy.stepInfo('Remove feature flags');
            launchDarklyApi.removeUserTarget(testData.reportTextEditorFlagKey);
            launchDarklyApi.removeUserTarget(testData.swotAnalysisFlagKey);
        });
    });