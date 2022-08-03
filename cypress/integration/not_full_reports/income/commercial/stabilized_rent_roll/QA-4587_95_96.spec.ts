import { Income, Property } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import testData from 
    "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4587_95_96.fixture";

describe(`Verify the suggested text dropdown in the new narrative 
component added through "=" for the 'Unchanged Renovation' 
  option in the Generated Commentary on the Stabilized Rent Roll page.`, 
{ tags:[ "@income", "@commercial", "@stabilized_rent_roll" ] }, () => {
        
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("Precondition: Navigate tot Summary page and add commercial units");
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        _NavigationSection.navigateToCommercialUnits();

        cy.stepInfo("1. Proceed to the Income > Commercial > Stabilized Rent Roll page.");
        _NavigationSection.clickIncomeApproachButton()
            .clickCommercialArrow().navigateToStabilizedRentRollInCommercial().verifyProgressBarNotExist();

        cy.stepInfo(`2. Hover the arrows.`);
        Income._CommercialManager.StabilizedRentRoll.Page.discussionTooltip
            .trigger("mouseover").invoke("show");
    
        cy.stepInfo(`3. [QA-4587] Verify the following text is displayed: 
        "The following generated text will appear in the Income Approach section of your report.".`);
        cy.get('[role="tooltip"]').invoke("text").then(text => {
            cy.log(text);
            expect(text).to.be.equal(testData.tooltipText);
        });

        cy.stepInfo("4. [QA-4596] Click Edit and enter the “=S“ and select the 'Sheriff's sale' option. Verify text");
        Income._CommercialManager.StabilizedRentRoll.clickEditDiscussionButton()
            .editDiscussionTextArea(testData.sherifsTypeValue, false)
            .clickNarrativeSuggestions(testData.verifySherifsListValue)
            .clickSaveDiscussionButton()
            .verifyCommentaryContainsText(testData.verifySherifsAreaValue);

        cy.stepInfo("5. Revert to original");
        Income._CommercialManager.StabilizedRentRoll.revertToOriginalCommentary();

        cy.stepInfo("6. [QA-4595] Click the Edit and enter the “=F“ and select the 'Foreclosure Sale' option.");
        Income._CommercialManager.StabilizedRentRoll.clickEditDiscussionButton()
            .editDiscussionTextArea(testData.foreclosureTypeValue, false)
            .clickNarrativeSuggestions(testData.verifyForeclosureListValue)
            .clickSaveDiscussionButton()
            .verifyCommentaryContainsText(testData.verifyForeclosureAreaValue);
    });
});
