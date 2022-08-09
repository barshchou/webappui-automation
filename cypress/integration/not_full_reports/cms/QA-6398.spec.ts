import { _IncomeCapitalizationApproach } from './../../../actions/cms/index';
import { loginAction } from '../../../actions/base/baseTest.actions';
import { _NavigationSection } from '../../../actions/base';
import testData from "../../../fixtures/not_full_reports/cms/QA-6130-31.fixture";
import launchDarklyApi from '../../../api/launchDarkly.api';
import { conditionalDescribe } from "../../checkIsProd.utils";
import { _Certification, _CmsBaseActions, _LetterOfTransmittal, _SWOTAnalysis,  } from '../../../actions/cms';

conditionalDescribe("Verify sidebar navigation in the CMS page", 
    { tags:[ "@cms", "@feature_flag" ] }, () => {
        it(`[QA-6398]`, () => {
            cy.stepInfo(`1. Make sure that this feature flag is ON: 
                        - cms-navigation
                        - edit-default-swot-analysis
                        - report-text-edit`);
            loginAction(testData.webContentEditorUsername, testData.webContentEditorPassword);
            launchDarklyApi.setFeatureFlagForUser(testData.cmsNavigationFlagKey, testData.featureFlagEnable)
                .setFeatureFlagForUser(testData.reportTextEditorFlagKey, testData.featureFlagEnable)
                .setFeatureFlagForUser(testData.swotAnalysisFlagKey, testData.featureFlagEnable);
            cy.reload();
                
            cy.stepInfo(`2. Navigate to CMS`);
            _NavigationSection.navigateToContentManagementSystem();

            cy.stepInfo(`3. Verify the navigation in the sidebar`);
            _CmsBaseActions.openCertificationPage();
            _Certification.verifyPageTitle();

            _CmsBaseActions.openLetterOfTransmittalPage();
            _LetterOfTransmittal.verifyPageTitle();

            _CmsBaseActions.openSWOTAnalysisPage();
            _SWOTAnalysis.verifyPageTitle();

            _CmsBaseActions.openIncomeCapitalizationApproachPage();
            _IncomeCapitalizationApproach.verifyPageTitle();

            cy.stepInfo(`4. Remove feature flag and log out`);
            launchDarklyApi.removeUserTarget(testData.cmsNavigationFlagKey);
            launchDarklyApi.removeUserTarget(testData.reportTextEditorFlagKey);
            launchDarklyApi.removeUserTarget(testData.swotAnalysisFlagKey);
            _NavigationSection.logout();
        });
    });