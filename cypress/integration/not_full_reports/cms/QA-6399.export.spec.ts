import { _HomePage } from '../../../actions/base';
import { createReport } from '../../../actions/base/baseTest.actions';
import { PreviewEdit, ReviewExport } from '../../../actions';
import { _NavigationSection } from '../../../actions/base';
import testData from "../../../fixtures/not_full_reports/cms/QA-6399.fixture";
import launchDarklyApi from '../../../api/launchDarkly.api';
import { conditionalDescribe } from "../../checkIsProd.utils";
import { _CmsBaseActions } from '../../../actions/cms';

conditionalDescribe("Verify page and possibility to edit text", 
    { tags:[ "@cms", "@check_export", "@feature_flag" ] }, () => {
        it('[QA-6399]', () => {
            cy.stepInfo(`Preconditions: Set Launch Darkly flag to see Report Copy Editor section. Create a report`);
            launchDarklyApi.setFeatureFlagForUser(testData.reportTextEditorFlagKey, testData.featureFlagEnable)
                .setFeatureFlagForUser(testData.swotAnalysisFlagKey, testData.featureFlagEnable);
            createReport(testData.reportCreationData);

            cy.stepInfo(`1. Open CMS > Letter of Transmittal page`);
            _NavigationSection.navigateToContentManagementSystem();
            _CmsBaseActions.openLetterOfTransmittalPage();

            cy.stepInfo(`2. Verify languages of sections`);
            testData.letterTextsFixture.forEach(section => {
                _CmsBaseActions.verifyDiscussionText(section.sectionName, section.language);
            });

            cy.stepInfo(`3. Open any report > Letter of Transmittal page`);
            _NavigationSection.returnToHomePage();
            _HomePage.openReportByName(testData.reportCreationData.reportNumber);
            _NavigationSection.navigateToLetterOfTransmittal();
            testData.letterTextsFixture.forEach(section => {
                PreviewEdit._LetterOfTransmittal.verifyTextInFormContainer(section.language);
            });

            cy.stepInfo(`4. Export report`);
            _NavigationSection.openReviewAndExport();
            ReviewExport.selectSectionsToIncludeInExport(testData.sectionToExport)
                .generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it(`Check export`, () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.stepInfo(`5. Verify commentary text in exported report`);
                    testData.letterTextsFixture.forEach(section => {
                        cy.contains(section.language).should('exist');
                    });
                    
                });
        });

        after('Remove feature flag', () => {
            launchDarklyApi.removeUserTarget(testData.reportTextEditorFlagKey);
            launchDarklyApi.removeUserTarget(testData.swotAnalysisFlagKey);
        });
    });