import testData from "../fixtures/not_full_reports/organizations/QA-5841_44_47.fixture";
import NavigationSection from "../actions/base/navigationSection.actions";
import { createReport, deleteReport } from "../actions/base/baseTest.actions";
import launchDarklyApi from "../api/launchDarkly.api";

const projectKey = 'default';

const environmentKey = 'staging';

const featureFlagKey = 'flexible-taxes';

const userId = 'mikita.radzkou@boweryvaluation.com';

describe("Verify the Rent Basis buttons", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {
        
    before("Login, create report", () => {
        launchDarklyApi.getFeatureFlag(featureFlagKey);
        launchDarklyApi.getFeatureFlag();
        launchDarklyApi.setFeatureFlagForUser(featureFlagKey, 0);
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToTaxInfo();
        cy.contains("Add Additional Tax Rate +").should('be.visible');
        deleteReport(testData.reportCreationData.reportNumber);
    });

    after(() => {
        launchDarklyApi.removeUserTarget(featureFlagKey, 0);
    });
});