import testData from "../../../fixtures/sf_integration/report_settings_modal/QA-4965-71.fixture";
import { loginAction } from "../../../actions/base/baseTest.actions";
import { _HomePage } from "../../../actions/base";
import launchDarklyApi from "../../../api/launchDarkly.api";


describe("Verify pre-fill radios from SF", 
    { tags: [ "@report_settings_modal", "@salesforce" ] }, () => {

        before(() => {
            cy.log("1 Set feature flag");
            launchDarklyApi.setFeatureFlagForUser(testData.featureFlagKey, testData.onFeatureFlag);

            cy.stepInfo("2. Login in app");
            loginAction();

            cy.stepInfo("3. Fill basic inputs");
            _HomePage.clickNewReportButton()
                .enterAddressToSearch(testData.address)
                .clickSubmitButton()
                .clickToSearchResultRow()
                .clickSubmitButton();

            cy.saveLocalStorage();
        });

        beforeEach(() => {
            cy.restoreLocalStorage();
            _HomePage.Page.reportNumberInput.clear();
        });

        it("[QA-4965]", () => {
            cy.stepInfo("4. Proceed to the WebApp and paste the number or enter manually in the Bowery Job # field");
            _HomePage.enterReportNumber(testData.sfJobs.withFreddieMac);
            
            cy.stepInfo(`5. “Freddie Mac” section has the radio button automatically enabled for 
                        ‘This report must adhere to Freddie Mac specifications.’`);
            _HomePage.Page.templateTypesRadios.eq(0).should("be.checked");
        });

        it("[QA-4966]", () => {
            cy.stepInfo("3. Proceed to the WebApp and paste the number or enter manually in the Bowery Job # field");
            _HomePage.enterReportNumber(testData.sfJobs.withoutFreddieMac);
            
            cy.stepInfo(`4. “Freddie Mac” section has the radio button automatically enabled for 
                        ‘This report does not need to adhere to Freddie Mac specifications.’`);
            _HomePage.Page.templateTypesRadios.eq(1).should("be.checked");
        });

        it("[QA-4967]", () => {
            cy.stepInfo("3. Proceed to the WebApp and paste the number or enter manually in the Bowery Job # field");
            _HomePage.enterReportNumber(testData.sfJobs.noneFreddieMac);
            
            cy.stepInfo("4. Verify the “Freddie Mac” section has the radio button enabled but deselected.");
            _HomePage.Page.templateTypesRadios.should("not.be.checked");
        });

        it("[QA-4968]", () => {
            cy.stepInfo("3. Proceed to the WebApp and paste the number or enter manually in the Bowery Job # field");
            _HomePage.enterReportNumber(testData.sfJobs.multifamily);
            
            cy.stepInfo(`4. Verify the Income Type section has the radio button automatically enabled for 
                        ‘The subject Property has only residential income.’.`);
            _HomePage.Page.incomeTypesRadios.eq(0).should("be.checked");
        });

        it("[QA-4969]", () => {
            cy.stepInfo("3. Proceed to the WebApp and paste the number or enter manually in the Bowery Job # field");
            _HomePage.enterReportNumber(testData.sfJobs.mixedUse);
            
            cy.stepInfo(`4. Verify the Income Type section has the radio button automatically enabled for 
                        ‘The subject property has both residential and commercial income.’.`);
            _HomePage.Page.incomeTypesRadios.eq(1).should("be.checked");
        });

        it("[QA-4970]", () => {
            cy.stepInfo("3. Proceed to the WebApp and paste the number or enter manually in the Bowery Job # field");
            _HomePage.enterReportNumber(testData.sfJobs.retail);
            
            cy.stepInfo(`4. Verify the Income Type section has the radio button automatically enabled for 
                        ‘The subject Property has only commercial income.’.`);
            _HomePage.Page.incomeTypesRadios.eq(2).should("be.checked");
        });

        it("[QA-4971]", () => {
            cy.stepInfo("3. Proceed to the WebApp and paste the number or enter manually in the Bowery Job # field");
            _HomePage.enterReportNumber(testData.sfJobs.nonePropertyType);
            
            cy.stepInfo(`4. Verify the Income Type section has the radio button automatically enabled for 
                        ‘The subject Property has only commercial income.’.`);
            _HomePage.Page.incomeTypesRadios.should("not.be.checked");
        });

        after(() => {
            cy.stepInfo("Remove feature flag");
            launchDarklyApi.removeUserTarget(testData.featureFlagKey);
        });
    });