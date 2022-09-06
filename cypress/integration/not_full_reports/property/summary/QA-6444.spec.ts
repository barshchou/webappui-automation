import testData from "../../../../fixtures/not_full_reports/property/summary/QA-6444.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";
import launchDarklyApi from "../../../../api/launchDarkly.api";
import routesUtils from "../../../../utils/routes.utils";

describe("Edit Data button in Site Details section redirects to Data Collection>Subject Property Data>Site Details",
    { tags: [ "@property", "@market" ] }, () => {
    
        beforeEach("Login, create report", () => {
            launchDarklyApi.setFeatureFlagForUser(testData.featureFlagKey, testData.onFeatureFlag);
            createReport(testData.reportCreationData);
        });

        it("[QA-6444]", () => {
            cy.stepInfo("1. Navigate to Property -> Summary");
            _NavigationSection.navigateToPropertySummary();

            cy.stepInfo("2. Click on Edit Data button");
            Property._Summary.clickEditDataBySectionName(testData.sectionName);
            _NavigationSection.submitSaveChangesModal();

            cy.stepInfo("3. Verify user redirects to Data Collection > Subject Property Data > Site Details section");
            _NavigationSection.waitForUrl(routesUtils.subjectPropertySiteDetails);
        });

        after("Remove feature flag", () => {
            launchDarklyApi.removeUserTarget(testData.featureFlagKey);
            
            cy.stepInfo("3. Off subject property data");
            launchDarklyApi.setFeatureFlagForUser(testData.featureFlagKey, testData.offFeatureFlag);
        });
    });
