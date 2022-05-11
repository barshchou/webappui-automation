import { Income, Property } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4595_96.fixture";
import { Tag } from "../../../../../utils/tags.utils";


describe(`Verify the suggested text dropdown in the new narrative component added through "=" for the 'Unchanged Renovation' 
  option in the Generated Commentary on the Stabilized Rent Roll page.`, 
  { tags:[ Tag.income, Tag.commercial, Tag.stabilized_rent_roll ] }, () => {
    before("Login, create report", () => {
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

        cy.stepInfo("2. [QA-4596] Click Edit and enter the “=S“ and select the 'Sheriff's sale' option. Verify text");
        Income._CommercialManager.StabilizedRentRoll.clickEditStabilizedCommercialIncomeDiscussion()
            .typeStabilizedCommercialIncomeTextArea(testData.sherifsTypeValue)
            .clickNarrativeSuggestions(testData.verifySherifsListValue)
            .saveStabilizedRentRollCommentary()
            .verifyStabilizedCommercialIncomeTextArea(testData.verifySherifsAreaValue);

        cy.stepInfo("3. Revert to original");
        Income._CommercialManager.StabilizedRentRoll.revertToOriginalStabilizedRentRollCommentary();

        cy.stepInfo("6. [QA-4595] Click the Edit and enter the “=F“ and select the 'Foreclosure Sale' option.");
        Income._CommercialManager.StabilizedRentRoll.clickEditStabilizedCommercialIncomeDiscussion()
            .typeStabilizedCommercialIncomeTextArea(testData.foreclosureTypeValue)
            .clickNarrativeSuggestions(testData.verifyForeclosureListValue)
            .saveStabilizedRentRollCommentary()
            .verifyStabilizedCommercialIncomeTextArea(testData.verifyForeclosureAreaValue);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});
