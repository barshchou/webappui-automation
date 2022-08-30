import { _IncomeCapitalizationApproach } from './../../../actions/cms/index';
import { loginAction } from '../../../actions/base/baseTest.actions';
import { _NavigationSection } from '../../../actions/base';
import testData from "../../../fixtures/not_full_reports/cms/QA-6130-31.fixture";
import launchDarklyApi from '../../../api/launchDarkly.api';
import { conditionalDescribe } from "../../checkIsProd.utils";
import { _Certification, _CmsBaseActions, _LetterOfTransmittal, _SWOTAnalysis,  } from '../../../actions/cms';
import { _CmsTitle } from '../../../enums/pages_titles';

conditionalDescribe("Verify sidebar navigation in the CMS page", 
    { tags:[ "@cms", "@feature_flag" ] }, () => {
        it(`[QA-6398]`, () => {
            cy.stepInfo(`1. Make sure that this feature flag is ON: 
                        - cms-navigation
                        - edit-default-swot-analysis
                        - report-text-edit`);
            loginAction(testData.webContentEditorUsername, testData.webContentEditorPassword);
            launchDarklyApi.setFeatureFlagForUser(testData.reportTextEditorFlagKey, testData.featureFlagEnable)
                .setFeatureFlagForUser(testData.swotAnalysisFlagKey, testData.featureFlagEnable);
            cy.reload();
                
            cy.stepInfo(`2. Navigate to CMS`);
            _NavigationSection.navigateToContentManagementSystem();

            cy.stepInfo(`3. Verify the navigation in the sidebar`);
            _CmsBaseActions.openCertificationPage();
            _Certification.Page.pageTitle.should("exist").and("have.text", _CmsTitle.CERTIFICATION);

            _CmsBaseActions.openLetterOfTransmittalPage();
            _LetterOfTransmittal.Page.pageTitle.should("exist").and("have.text", _CmsTitle.LETTER_OF_TRANSMITTAL);

            _CmsBaseActions.openSWOTAnalysisPage();
            _SWOTAnalysis.Page.pageTitle.should("exist").and("have.text", _CmsTitle.SWOT_ANALYSIS);

            _CmsBaseActions.openIncomeCapitalizationApproachPage();
            _IncomeCapitalizationApproach.Page.pageTitle.should("exist")
                .and("have.text", _CmsTitle.INCOME_CAPITALIZATION_APPROACH);
        });

        after('Remove feature flag', () => {
            launchDarklyApi.removeUserTarget(testData.reportTextEditorFlagKey);
            launchDarklyApi.removeUserTarget(testData.swotAnalysisFlagKey);
        });
    });