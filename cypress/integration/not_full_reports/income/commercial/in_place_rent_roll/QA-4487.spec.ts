import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4487.fixture";
import { Income } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";

describe(`Verify the suggested text dropdown in the new narrative component added through '=' 
                for the 'Unchanged Renovation' option`,
        { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {
            
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Navigate to Commercial In Place Rent Roll page");
        _NavigationSection.navigateToCommercialInPlaceRentRoll()
            .verifyProgressBarNotExist();

        cy.stepInfo("2. Edit discussion and enter '=un' value; click 'Unchanged Rennovation' suggested value");
        Income._CommercialManager.InPlaceRentRoll.clickEditDiscussionButton()
            .editDiscussionTextArea(testData.value)
            .clickNarrativeSuggestions(testData.unchangeRennovation);

        cy.stepInfo("3. Verify that the following text appears.");
        Income._CommercialManager.InPlaceRentRoll.verifyCommentaryContainsText(testData.verifyAreaValue);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});