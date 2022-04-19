import { Income, Property } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4597.fixture";


describe(`Verify the suggested text dropdown in the new narrative component added through "=" for the 'Unchanged Renovation' 
  option in the Generated Commentary on the Stabilized Rent Roll page.`, () => {
    before("Login, create report", () => {
        cy.stepInfo(`Preconditions: The mixed report is created and several commercial units are added.`);
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        _NavigationSection.navigateToCommercialUnits();
    });

    it("Test body", () => {
        cy.stepInfo("1. Proceed to the Income > Commercial > Stabilized Rent Roll page.");
        _NavigationSection.clickIncomeApproachButton()
        .clickCommercialArrow().openCommercialStabilizedRentRollInCommercial().verifyProgressBarNotExist();

        cy.stepInfo("2. Click on the Edit button in the Stabilized Commercial Income Discussion section.");
        Income._CommercialManager.StabilizedRentRoll.clickEditStabilizedCommercialIncomeDiscussion();

        cy.stepInfo("3. Enter the “=Un“ and select the 'Unchanged Renovation' option.");
        Income._CommercialManager.StabilizedRentRoll.typeStabilizedCommercialIncomeTextArea(testData.value)
          .clickNarrativeSuggestions(testData.verifyListValue);

        cy.stepInfo(`4. Verify that the following text appears: Upon renovation, the subject unit 
          count and gross building area will remain unchanged.`);
        Income._CommercialManager.StabilizedRentRoll.verifyStabilizedCommercialIncomeTextArea(testData.verifyAreaValue);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});
