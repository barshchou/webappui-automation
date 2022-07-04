import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4433.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Report } from "../../../../actions";
import launchDarklyApi from "../../../../api/launchDarkly.api";

describe("[QA-4433] Launch Darkly for Inspection Date & Date of Valuation (feature in OFF)",
    { tags: [ "@report", "@key_info", "@salesforce", "@feature_flag" ] }, () => {
        
    before("Login, create report", () => {
        cy.stepInfo(`1. Create a new report on the WebApp (Note: the JOB # of that report corresponds with the JOB # of an open 
            job on SalesForce).`);
        // launchDarklyApi.removeUserTarget(testData.featureFlagKey);
        launchDarklyApi.setFeatureFlagForUser(testData.featureFlagKey, testData.offFeatureFlag);
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo(`2. Go to Report → Key Info → Engagement tab and Verify that when the feature (Prefill inspection date from salesforce) 
            is off, the Inspection Date & Date of Valuation fields are empty.`);
        _NavigationSection.navigateToReportInformation();
        Report._KeyInfo.Page.getDateInputByQA(testData.nameInputByQA).should("have.value", "");

        deleteReport(testData.reportCreationData.reportNumber);
    });

    after("Delete user with feature flag", () => {
        launchDarklyApi.removeUserTarget(testData.featureFlagKey);
    });
});