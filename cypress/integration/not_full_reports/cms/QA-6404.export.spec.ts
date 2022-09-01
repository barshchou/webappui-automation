import { _HomePage } from '../../../actions/base';
import { createReport, loginAction } from '../../../actions/base/baseTest.actions';
import { ReviewExport } from '../../../actions';
import { _NavigationSection } from '../../../actions/base';
import testData from "../../../fixtures/not_full_reports/cms/QA-6404.fixture";
import launchDarklyApi from '../../../api/launchDarkly.api';
import { conditionalDescribe } from "../../checkIsProd.utils";
import { _CmsBaseActions } from '../../../actions/cms';

conditionalDescribe("[QA-6404] Verify possibility to edit text", 
    { tags:[ "@cms", "@check_export", "@feature_flag" ] }, () => {
        it('Update static text in Settings and verify changes on a corresponding pages', () => {
            cy.stepInfo('Preconditions: Set Launch Darkly flag to see Report Copy Editor section. Create a report');
            launchDarklyApi.setFeatureFlagForUser(testData.reportTextEditorFlagKey, testData.featureFlagEnable)
                .setFeatureFlagForUser(testData.swotAnalysisFlagKey, testData.featureFlagEnable);
            createReport(testData.reportCreationData);

            cy.stepInfo('1. Open CMS > Income Capitalization Approach page');
            _NavigationSection.navigateToContentManagementSystem();
            _CmsBaseActions.openIncomeCapitalizationApproachPage();

            cy.stepInfo(`2. Make some changes with any text item → 'Modified' tag is shown above field`);
            _CmsBaseActions.updateSectionDiscussion(testData.sectionName, 
                testData.textUpdate, true)
                .verifyModifiedLabel(testData.sectionName);

            /*
             *  TODO: [QA-6362] Generated report doesn't have update Compliance Paragraph discussion, need to
             * think about timeout.
             */
            cy.stepInfo('3. Export report');
            _NavigationSection.returnToHomePage();
            _HomePage.openReportByName(testData.reportCreationData.reportNumber);
            _NavigationSection.openReviewAndExport();
            ReviewExport.selectSectionsToIncludeInExport(testData.sectionToExport)
                .generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it('Check export', () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.stepInfo("5. Verify commentary text in exported report");
                    cy.xpath(`//h1[.='${testData.exportSectionName}']`).scrollIntoView().next()
                        .should('have.text', testData.textUpdate);
                });
        });

        afterEach('Revert commentary to original and remove feature flags', () => {
            cy.stepInfo('Revert commentary to original');
            if (!Cypress.currentTest.title.includes("Check export")) {
                loginAction();
                _NavigationSection.navigateToContentManagementSystem();
                _CmsBaseActions.openIncomeCapitalizationApproachPage()
                    .revertSectionToOriginal(testData.sectionName);
            }

            cy.stepInfo('Remove feature flags');
            launchDarklyApi.removeUserTarget(testData.reportTextEditorFlagKey);
            launchDarklyApi.removeUserTarget(testData.swotAnalysisFlagKey);
        });
    });