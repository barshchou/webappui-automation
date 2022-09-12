import { _HomePage } from '../../../actions/base';
import { createReport } from '../../../actions/base/baseTest.actions';
import { PreviewEdit, ReviewExport } from '../../../actions';
import { _NavigationSection } from '../../../actions/base';
import testData from "../../../fixtures/not_full_reports/cms/QA-5381.fixture";
import launchDarklyApi from '../../../api/launchDarkly.api';
import { conditionalDescribe } from "../../checkIsProd.utils";
import { _CmsBaseActions } from '../../../actions/cms';

conditionalDescribe("Verify the page and fields available on it", 
    { tags:[ "@cms", "@check_export", "@feature_flag" ] }, () => {
        it('[QA-5381]', () => {
            cy.stepInfo(`Preconditions: Set Launch Darkly flag to see Report Copy Editor section. Create a report`);
            launchDarklyApi.setFeatureFlagForUser(testData.reportTextEditorFlagKey, testData.featureFlagEnable)
                .setFeatureFlagForUser(testData.swotAnalysisFlagKey, testData.featureFlagEnable);
            createReport(testData.reportCreationData);

            cy.stepInfo(`1. Open CMS > Certification page page`);
            _NavigationSection.navigateToContentManagementSystem();
            _CmsBaseActions.openCertificationPage();

            cy.stepInfo(`2. Verify fields are listed in the section`);
            testData.certificationTextsFixture.forEach(section => {
                _CmsBaseActions.verifyDiscussionText(section.sectionName, section.languages);
            });

            cy.stepInfo(`3. Verify the same text on Preview & Edit > Certification page`);
            _NavigationSection.returnToHomePage();
            _HomePage.openReportByName(testData.reportCreationData.reportNumber);
            _NavigationSection.navigateToCertification();
            testData.certificationTextsFixture.forEach((section, index) => {
                PreviewEdit._Certification.verifyTextInFormContainer(section.languages, index);
            });

            cy.stepInfo(`4. Export report`);
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it(`Check export`, () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);

                    cy.stepInfo(`5. Verify commentary text in exported report`);
                    cy.xpath(`//h1[.='${testData.exportSection}']`).scrollIntoView()
                        .next().next().find("li").then($li => {
                            const reportSectionText = $li.toArray().map(li => li.innerHTML)
                                .slice(0, testData.textsArray.length);
                            expect(testData.textsArray).to.deep.eq(reportSectionText); 
                        });
                });
        });

        after('Remove feature flag', () => {
            launchDarklyApi.removeUserTarget(testData.reportTextEditorFlagKey);
            launchDarklyApi.removeUserTarget(testData.swotAnalysisFlagKey);
        });
    });