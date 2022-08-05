import testData from "../../../../fixtures/not_full_reports/sf_integration/report_settings_modal/QA-4965-69.fixture";
import { loginAction } from "../../../../actions/base/baseTest.actions";
import { _HomePage } from "../../../../actions/base";


describe("Verify pre-fill radios from SF", 
    { tags: [ "@report_settings_modal", "@salesforce" ] }, () => {

        beforeEach(() => {
            cy.stepInfo("1. Login in app");
            loginAction();

            cy.stepInfo("2. Fill basic inputs");
            _HomePage.clickNewReportButton()
                .enterAddressToSearch(testData.address)
                .clickSubmitButton()
                .clickToSearchResultRow()
                .clickSubmitButton();
        });

        it("[QA-4965]", () => {
            cy.stepInfo("3. Proceed to the WebApp and paste the number or enter manually in the Bowery Job # field");
            _HomePage.enterReportNumber(testData.sfJobs.withFreddieMac);
            
            cy.stepInfo(`4. “Freddie Mac” section has the radio button automatically enabled for 
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
                        ‘The subject Property has only residential income.’.`);
            _HomePage.Page.incomeTypesRadios.eq(1).should("be.checked");
        });
    });