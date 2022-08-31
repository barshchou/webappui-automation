import { _HomePage } from '../../../actions/base';
import { createReport } from '../../../actions/base/baseTest.actions';
import { Final, ReviewExport } from '../../../actions';
import { _NavigationSection } from '../../../actions/base';
import testData from "../../../fixtures/not_full_reports/cms/QA-6400.fixture";
import launchDarklyApi from '../../../api/launchDarkly.api';
import { conditionalDescribe } from "../../checkIsProd.utils";
import { _CmsBaseActions, _SWOTAnalysis } from '../../../actions/cms';
import { normalizeText } from "../../../../utils/string.utils";

conditionalDescribe("Verify page and possibility to edit text", 
    { tags:[ "@cms", "@check_export", "@feature_flag" ] }, () => {
        beforeEach('Create report. Restore to default state', () => {
            if (!Cypress.currentTest.title.includes("Check export")) {
                cy.stepInfo(`Preconditions: Set Launch Darkly flag to see Report Copy Editor section. Create a report`);
                launchDarklyApi.setFeatureFlagForUser(testData.reportTextEditorFlagKey, testData.featureFlagEnable)
                    .setFeatureFlagForUser(testData.swotAnalysisFlagKey, testData.featureFlagEnable);
                createReport(testData.reportCreationData);

                cy.stepInfo(`Preconditions: Restore SWOT default state`);
                _NavigationSection.navigateToContentManagementSystem();
                _CmsBaseActions.openSWOTAnalysisPage();
                testData.swotTextsFixture.forEach(section => {
                    section.languages.forEach((language, index) => {
                        _SWOTAnalysis.updateSectionDiscussion(section.sectionName, index, language, true);
                    });
                });
                _SWOTAnalysis.saveCmsSettings();
                cy.visit('/');
            }
        });

        it('[QA-6400]', () => {
            cy.stepInfo(`1. Open CMS > SWOT Analysis page`);
            _NavigationSection.navigateToContentManagementSystem();
            _CmsBaseActions.openSWOTAnalysisPage();

            cy.stepInfo(`2. Verify languages of sections`);
            testData.swotTextsFixture.forEach(section => {
                _SWOTAnalysis.verifySWOTInputsArrayText(section.sectionName, section.languages);
            });

            cy.stepInfo(`3. Open any report Final > SWOT Analysis page`);
            _NavigationSection.returnToHomePage();
            _HomePage.openReportByName(testData.reportCreationData.reportNumber);
            _NavigationSection.navigateToFinalSWOTAnalysis();
            testData.swotTextsFixture.forEach(section => {
                Final._SWOTAnalysis.verifyTextSection(section.sectionName, section.languages);
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
                    testData.swotTextsFixture.forEach((section) => {
                        let sectionName = section.sectionName.charAt(0).toUpperCase() + section.sectionName.slice(1);
                        cy.contains(sectionName).scrollIntoView().next().find("li").then($li => {
                            const reportSectionText = $li.toArray().map(li => normalizeText(li.innerHTML));
                            expect(section.languages).to.deep.eq(reportSectionText);
                        });
                    });
                });
        });

        after('Remove feature flag', () => {
            launchDarklyApi.removeUserTarget(testData.reportTextEditorFlagKey);
            launchDarklyApi.removeUserTarget(testData.swotAnalysisFlagKey);
        });
    });