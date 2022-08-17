import { createReport, loginAction } from '../../../actions/base/baseTest.actions';
import { Final, ReviewExport } from '../../../actions';
import { _NavigationSection } from '../../../actions/base';
import testData from "../../../fixtures/not_full_reports/cms/QA-6401.fixture";
import launchDarklyApi from '../../../api/launchDarkly.api';
import { conditionalDescribe } from "../../checkIsProd.utils";
import { _CmsBaseActions, _SWOTAnalysis } from '../../../actions/cms';

conditionalDescribe("[6401] Verify possibility to edit text", 
    { tags:[ "@cms", "@check_export", "@feature_flag" ] }, () => {
        it('Update static text in Settings and verify changes on a corresponding pages', () => {
            cy.stepInfo('Preconditions: Set Launch Darkly flag to see Report Copy Editor section.');
            launchDarklyApi.setFeatureFlagForUser(testData.reportTextEditorFlagKey, testData.featureFlagEnable)
                .setFeatureFlagForUser(testData.swotAnalysisFlagKey, testData.featureFlagEnable);
            loginAction();

            cy.stepInfo('1. Open CMS > SWOT Analysis page');
            _NavigationSection.navigateToContentManagementSystem();
            _CmsBaseActions.openSWOTAnalysisPage();

            cy.stepInfo(`2. Make some changes with any text item`);
            _SWOTAnalysis.updateSectionDiscussion(testData.sectionName, 0, testData.textUpdate[0], true);

            cy.stepInfo('3. Create a new report and open it. Navigate to Final > SWOT Analysis ');
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToFinalSWOTAnalysis();
            Final._SWOTAnalysis.verifyTextSection(testData.sectionName, testData.textUpdate);

            cy.stepInfo('4. Export report');
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);

            cy.stepInfo('5. Revert commentary to original');
            _NavigationSection.navigateToContentManagementSystem();
            _CmsBaseActions.openSWOTAnalysisPage();
            _SWOTAnalysis.updateSectionDiscussion(testData.sectionName, 0, testData.defaultText[0], true);
        });

        it('Check export', () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.stepInfo("5. Verify commentary text in exported report");
                    let sectionName = testData.sectionName.charAt(0).toUpperCase() + testData.sectionName.slice(1);
                    cy.contains(sectionName).scrollIntoView().next().find("li").then($li => {
                        const reportSectionText = $li.toArray().map(li => li.innerHTML);
                        expect(testData.textUpdate).to.deep.eq(reportSectionText);
                    });
                });
        });

        after('Remove feature flag', () => {

            launchDarklyApi.removeUserTarget(testData.reportTextEditorFlagKey);
            launchDarklyApi.removeUserTarget(testData.swotAnalysisFlagKey);
        });
    });