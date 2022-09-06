import testData from "../../../../fixtures/not_full_reports/property/property_history/QA-6447.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";
import launchDarklyApi from "../../../../api/launchDarkly.api";

describe(`Edit Data button in Property History Information section redirects to Data Collection 
        > Subject Property Data > Property History Information`, { tags: [ "@property", "@property_history" ] }, () => {
    
    before("Login, create report", () => {
        launchDarklyApi.setFeatureFlagForUser(testData.featureFlagKey, testData.onFeatureFlag);
        createReport(testData.reportCreationData);
        cy.saveLocalStorage();
    });

    it("[QA-6447]", () => {
        cy.stepInfo("1. Navigate to Property -> Property History");
        _NavigationSection.navigateToPropertyHistory();
    
        cy.stepInfo("2. Click on Edit Data button");
        Property._History.clickEditDataBySectionName(testData.sectionName);
        _NavigationSection.submitSaveChangesModal();
    
        cy.stepInfo(`3. Verify user redirects to Data Collection > Subject Property Data 
                    > Property History section`);
        _NavigationSection.waitForUrl(testData.route);
    });
   

    after("Remove feature flag", () => {
        launchDarklyApi.removeUserTarget(testData.featureFlagKey);
            
        cy.stepInfo("4. Off subject property data");
        launchDarklyApi.setFeatureFlagForUser(testData.featureFlagKey, testData.offFeatureFlag);
    });
});
