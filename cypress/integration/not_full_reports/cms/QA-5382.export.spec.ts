import { _HomePage } from '../../../actions/base';
import { createReport } from '../../../actions/base/baseTest.actions';
import { PreviewEdit, ReviewExport } from '../../../actions';
import { _NavigationSection } from '../../../actions/base';
import testData from "../../../fixtures/not_full_reports/cms/QA-5382.fixture";
import launchDarklyApi from '../../../api/launchDarkly.api';
import { conditionalDescribe } from "../../checkIsProd.utils";
import { _CmsBaseActions } from '../../../actions/cms';

conditionalDescribe("Verify possibility to edit text", 
    { tags:[ "@cms", "@check_export", "@feature_flag" ] }, () => {
        it('[QA-5382]', () => {
            cy.stepInfo(`Preconditions: Set Launch Darkly flag to see Report Copy Editor section. Create a report`);
            launchDarklyApi.setFeatureFlagForUser(testData.reportTextEditorFlagKey, testData.featureFlagEnable)
                .setFeatureFlagForUser(testData.swotAnalysisFlagKey, testData.featureFlagEnable);
            createReport(testData.reportCreationData);

            cy.stepInfo(`1. Open CMS > Certification page page`);
            _NavigationSection.navigateToContentManagementSystem();
            _CmsBaseActions.openCertificationPage();

            cy.stepInfo(`2.  Make some changes with any text item → 'Modified' tag is shown above field`);
            _CmsBaseActions.updateSectionDiscussion(testData.sectionName, 
                testData.textUpdate, true);

            cy.stepInfo(`3. Verify the same text on Preview & Edit > Certification page`);
            _NavigationSection.returnToHomePage();
            _HomePage.openReportByName(testData.reportCreationData.reportNumber);
            _NavigationSection.navigateToCertification();
            PreviewEdit._Certification.verifyTextInFormContainer(testData.textUpdate);

            cy.stepInfo(`4. Export report`);
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);

            cy.stepInfo('5. Revert commentary to original');
            _NavigationSection.navigateToContentManagementSystem();
            _CmsBaseActions.openCertificationPage()
                .revertSectionToOriginal(testData.sectionName);
        });

        it(`Check export`, () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);

                    cy.stepInfo(`6. Verify commentary text in exported report`);
                    cy.xpath(`//h1[.='Certification']`).scrollIntoView().next().next().find("li").eq(0)
                        .should('contain.text', testData.textUpdate);
                });
        });

        after('Remove feature flag', () => {
            launchDarklyApi.removeUserTarget(testData.reportTextEditorFlagKey);
            launchDarklyApi.removeUserTarget(testData.swotAnalysisFlagKey);
        });
    });