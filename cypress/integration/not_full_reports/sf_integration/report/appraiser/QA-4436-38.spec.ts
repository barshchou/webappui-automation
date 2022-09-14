import { _NavigationSection } from '../../../../../actions/base';
import { createReport } from '../../../../../actions/base/baseTest.actions';
import { Report } from '../../../../../actions';
import testData from "../../../../../fixtures/not_full_reports/sf_integration/report/appraiser/QA-4436-38.fixture";
import launchDarklyApi from '../../../../../api/launchDarkly.api';

describe("Launch Darkly for Inspector (feature in ON/OFF)",
    { tags:[ "@report", "@appraiser", "@salesforce", "@feature_flag" ] }, () => {

        testData.reportData.forEach(data => {
            it(`${data.specName}`, () => {
                cy.stepInfo("Preconditions: Set feature flag. Login, create report");
                launchDarklyApi.setFeatureFlagForUser(testData.featureFlag, data.stateFeatureFlag);
                createReport(testData.reportCreationData);
    
                cy.stepInfo("1. Navigate to Report -> Appraiser page");
                _NavigationSection.navigateToReportAppraiser();
    
                cy.stepInfo(`2. Verify that when the feature “Prefill inspector from salesforce“ is ON/OFF, 
                            the Inspector from SF appear/doesn't appear in the Appraisers table`);
                cy.contains(testData.appraiserName).should(data.mather);
                if (data.specName === "[QA-4437-38]") {
                    launchDarklyApi.removeUserTarget(testData.featureFlag);
                    cy.reload();
                    Report._Appraiser.verifyPersonallyInspectedCheckbox(testData.appraiserName, true);
                }
    
                cy.stepInfo("3. Remove user form feature flag");
                launchDarklyApi.removeUserTarget(testData.featureFlag);
            });
        });
    });