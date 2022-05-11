import { Income, Property } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4591_94.fixture";


describe(`Verify the commentary functionality`, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        
    });

    it("Test body", () => {
        cy.stepInfo("Precondition: Navigate to Summary page and set commercial units");
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        
        cy.stepInfo("1. Proceed to the Income > Commercial > Stabilized Rent Roll page.");
        _NavigationSection.navigateToCommercialUnits()
            .clickIncomeApproachButton()
            .clickCommercialArrow()
            .navigateToStabilizedRentRollInCommercial()
            .verifyProgressBarNotExist();

        cy.stepInfo("2. Click on the Edit button in the Stabilized Commercial Income Discussion section.");
        Income._CommercialManager.StabilizedRentRoll.clickEditStabilizedCommercialIncomeDiscussion();

        cy.stepInfo("3. Modify commentary and save changes.");
        Income._CommercialManager.StabilizedRentRoll.typeStabilizedCommercialIncomeTextArea(testData.value, true)
          .saveStabilizedRentRollCommentary();

        cy.stepInfo("[QA-4594] 4. Verify that commentary 'Modified' label appears");
        Income._CommercialManager.StabilizedRentRoll.verifyModifiedLabelExist();

        cy.stepInfo("[QA-4591] 5. Verify commentary revert to original");
        Income._CommercialManager.StabilizedRentRoll.revertToOriginalStabilizedRentRollCommentary()
            .verifyStabilizedCommercialIncomeTextArea(testData.defaultText);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});