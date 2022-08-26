import { _HomePage } from '../../../actions/base';
import { createReport } from '../../../actions/base/baseTest.actions';
import { ReviewExport } from '../../../actions';
import { _NavigationSection } from '../../../actions/base';
import testData from "../../../fixtures/not_full_reports/cms/QA-6403.fixture";
import launchDarklyApi from '../../../api/launchDarkly.api';
import { conditionalDescribe } from "../../checkIsProd.utils";
import { _CmsBaseActions } from '../../../actions/cms';

conditionalDescribe("Verify the page and fields available on it", 
    { tags:[ "@cms", "@check_export", "@feature_flag" ] }, () => {
        it('[QA-6403]', () => {
            cy.stepInfo(`Preconditions: Set Launch Darkly flag to see Report Copy Editor section. Create a report`);
            launchDarklyApi.setFeatureFlagForUser(testData.reportTextEditorFlagKey, testData.featureFlagEnable)
                .setFeatureFlagForUser(testData.swotAnalysisFlagKey, testData.featureFlagEnable);
            createReport(testData.reportCreationData);

            cy.stepInfo(`1. Open CMS > Income Capitalization Approach page`);
            _NavigationSection.navigateToContentManagementSystem();
            _CmsBaseActions.openIncomeCapitalizationApproachPage();

            cy.stepInfo(`2. Verify fields are listed in the section`);
            testData.incomeCapitalizationApproachTextsFixture.forEach(section => {
                _CmsBaseActions.verifyDiscussionText(section.sectionName, section.languages);
            });

            cy.stepInfo(`3. Export report`);
            _NavigationSection.returnToHomePage();
            _HomePage.openReportByName(testData.reportCreationData.reportNumber);
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it(`Check export`, () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.stepInfo(`4. Verify commentary text in exported report`);
                    cy.xpath(`//h1[.='${testData.exportSectionName}']`).scrollIntoView().next()
                        .should('have.text', testData.incomeCapitalizationApproachTextsFixture[0].languages);
                    cy.xpath(`//h1[.='${testData.exportSectionName}']`).scrollIntoView().next().next()
                        .should('have.text', testData.incomeCapitalizationApproachTextsFixture[1].languages);
                });
        });

        after('Remove feature flag', () => {
            launchDarklyApi.removeUserTarget(testData.reportTextEditorFlagKey);
            launchDarklyApi.removeUserTarget(testData.swotAnalysisFlagKey);
        });
    });