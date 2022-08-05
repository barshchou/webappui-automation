import testData from "../../../../fixtures/not_full_reports/sf_integration/report_settings_modal/QA-4965.fixture";
import { loginAction } from "../../../../actions/base/baseTest.actions";
import { _HomePage } from "../../../../actions/base";


describe("[QA-4965] Verify Freddie Mac pre-fill with the Agency Client Type from SF", 
    { tags: [ "@report_settings_modal", "@salesforce" ] }, () => {

        it("Test body", () => {
            cy.stepInfo("1. Login in app");
            loginAction();

            cy.stepInfo("2. Proceed to the WebApp and paste the number or enter manually in the Bowery Job # field");
            _HomePage.clickNewReportButton()
                .enterAddressToSearch(testData.address)
                .clickSubmitButton()
                .clickToSearchResultRow()
                .clickSubmitButton()
                .enterReportNumber(testData.sfJob);
            
            cy.stepInfo(`3. “Freddie Mac” section has the radio button automatically enabled for 
                        ‘This report must adhere to Freddie Mac specifications.’`);
            _HomePage.Page.templateTypesRadios.eq(0).should("be.checked");
        });
    });