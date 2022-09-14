import { _NavigationSection } from '../../../../../actions/base';
import { createReport } from '../../../../../actions/base/baseTest.actions';
import { Report } from '../../../../../actions';
import testData from "../../../../../fixtures/not_full_reports/sf_integration/report/appraiser/QA-4436.fixture";
import launchDarklyApi from '../../../../../api/launchDarkly.api';

describe("Launch Darkly for Inspector (feature in OFF)",
    { tags:[ "@report", "@appraiser", "@salesforce", "@feature_flag" ] }, () => {

        beforeEach("Login, create report", () => {
            launchDarklyApi.setFeatureFlagForUser(testData.featureFlag, testData.offFeatureFlag);
            createReport(testData.reportCreationData);
        });

        it("[QA-4436]", () => {
            cy.stepInfo("1. Navigate to Report -> Appraiser page");
            _NavigationSection.navigateToReportAppraiser();

            cy.stepInfo(`2. Verify that when the feature “Prefill inspector from salesforce“ is OFF, 
                        the Inspector from SF does NOT appear in the Appraisers table`);
            Report._Appraiser.Page.appraiserSignCheckbox(testData.appraiserName).should("not.exist");
        });

        afterEach("Remove user form feature flag", () => {
            launchDarklyApi.removeUserTarget(testData.featureFlag);
        });
    });