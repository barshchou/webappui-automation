import { Income, Property } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4595_96.fixture";


describe(`Verify the suggested text dropdown in the new narrative component added through "=" for the 'Unchanged Renovation' 
  option in the Generated Commentary on the Stabilized Rent Roll page.`, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        _NavigationSection.navigateToCommercialUnits();
    });

    it("Test body", () => {
        cy.stepInfo("1. Proceed to the Income > Commercial > Stabilized Rent Roll page.");
        _NavigationSection.clickIncomeApproachButton()
            .clickCommercialArrow().navigateToStabilizedRentRollInCommercial().verifyProgressBarNotExist();

        cy.stepInfo("2. [QA-4596] Click on the Edit button in the Stabilized Commercial Income Discussion section.");
        Income._CommercialManager.StabilizedRentRoll.clickEditStabilizedCommercialIncomeDiscussion();

        cy.stepInfo("3. [QA-4596] Enter the “=S“ and select the 'Sheriff's sale' option.");
        Income._CommercialManager.StabilizedRentRoll.typeStabilizedCommercialIncomeTextArea(testData.sherifsTypeValue)
            .clickNarrativeSuggestions(testData.verifySherifsListValue);

        cy.stepInfo("4. [QA-4596] Verify that the following text appears.");
        Income._CommercialManager.StabilizedRentRoll.verifyStabilizedCommercialIncomeTextArea(testData.verifySherifsAreaValue);

        cy.reload();

        cy.stepInfo("6. [QA-4595] Click on the Edit button in the Stabilized Commercial Income Discussion section.");
        Income._CommercialManager.StabilizedRentRoll.clickEditStabilizedCommercialIncomeDiscussion();

        cy.stepInfo("7. [QA-4595] Enter the “=F“ and select the 'Foreclosure Sale' option.");
        Income._CommercialManager.StabilizedRentRoll.typeStabilizedCommercialIncomeTextArea(testData.foreclosureTypeValue)
            .clickNarrativeSuggestions(testData.verifyForeclosureListValue);
    
        cy.stepInfo("8. [QA-4595] Verify that the following text appears.");
        Income._CommercialManager.StabilizedRentRoll.verifyStabilizedCommercialIncomeTextArea(testData.verifyForeclosureAreaValue);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});
