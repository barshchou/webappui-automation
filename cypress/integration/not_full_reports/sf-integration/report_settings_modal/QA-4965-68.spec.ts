import testData from "../../../../fixtures/not_full_reports/sf_integration/report_settings_modal/QA-4965-68.fixture";
import { loginAction } from "../../../../actions/base/baseTest.actions";
import { _HomePage } from "../../../../actions/base";


describe("Verify Freddie Mac pre-fill with the Agency Client Type from SF", 
    { tags: [ "@report_settings_modal", "@salesforce" ] }, () => {

        beforeEach(() => {
            cy.stepInfo("1. Login in app");
            loginAction();
        });

        it("[QA-4965]", () => {
            cy.stepInfo("2. Proceed to the WebApp and paste the number or enter manually in the Bowery Job # field");
            _HomePage.clickNewReportButton()
                .enterAddressToSearch(testData.address)
                .clickSubmitButton()
                .clickToSearchResultRow()
                .clickSubmitButton()
                .enterReportNumber(testData.sfJobs.withFreddieMac);
            
            cy.stepInfo(`3. “Freddie Mac” section has the radio button automatically enabled for 
                        ‘This report must adhere to Freddie Mac specifications.’`);
            _HomePage.Page.templateTypesRadios.eq(0).should("be.checked");
        });

        it("[QA-4966]", () => {
            cy.stepInfo("2. Proceed to the WebApp and paste the number or enter manually in the Bowery Job # field");
            _HomePage.clickNewReportButton()
                .enterAddressToSearch(testData.address)
                .clickSubmitButton()
                .clickToSearchResultRow()
                .clickSubmitButton()
                .enterReportNumber(testData.sfJobs.withoutFreddieMac);
            
            cy.stepInfo(`3. “Freddie Mac” section has the radio button automatically enabled for 
                        ‘This report does not need to adhere to Freddie Mac specifications.’`);
            _HomePage.Page.templateTypesRadios.eq(1).should("be.checked");
        });

        it("[QA-4967]", () => {
            cy.stepInfo("2. Proceed to the WebApp and paste the number or enter manually in the Bowery Job # field");
            _HomePage.clickNewReportButton()
                .enterAddressToSearch(testData.address)
                .clickSubmitButton()
                .clickToSearchResultRow()
                .clickSubmitButton()
                .enterReportNumber(testData.sfJobs.noneFreddieMac);
            
            cy.stepInfo("3. Verify the “Freddie Mac” section has the radio button enabled but deselected.");
            _HomePage.Page.templateTypesRadios.should("not.be.checked");
        });

        it("[QA-4968]", () => {
            cy.stepInfo("2. Proceed to the WebApp and paste the number or enter manually in the Bowery Job # field");
            _HomePage.clickNewReportButton()
                .enterAddressToSearch(testData.address)
                .clickSubmitButton()
                .clickToSearchResultRow()
                .clickSubmitButton()
                .enterReportNumber(testData.sfJobs.withFreddieMac);
            
            cy.stepInfo(`3. Verify the Income Type section has the radio button automatically enabled for 
                        ‘The subject Property has only residential income.’.`);
            _HomePage.Page.incomeTypesRadios.eq(0).should("not.be.checked");
        });
    });