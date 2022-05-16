import { Income, Property } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4589-91_94.fixture";
import { Tag } from "../../../../../utils/tags.utils";

describe(`Verify the commentary functionality`, { tags:[ Tag.income, Tag.commercial, Tag.stabilized_rent_roll ] }, () => {
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

        cy.stepInfo("[QA-4589] 2. Click on the Edit button and modify commentary and save changes.");
        Income._CommercialManager.StabilizedRentRoll.clickEditDiscussionButton()
            .editDiscussionTextArea(testData.value)
            .verifyStabRentRollCommentaryButtons()
            .saveStabilizedRentRollCommentary();

        cy.stepInfo("[QA-4594] 3. Verify that commentary 'Modified' label appears");
        Income._CommercialManager.StabilizedRentRoll.verifyModifiedLabelExist();
        
        cy.stepInfo("[QA-4591] 4. Verify commentary revert to original");
        Income._CommercialManager.StabilizedRentRoll.revertToOriginalStabilizedRentRollCommentary()
            .verifyStabilizedCommercialIncomeTextArea(testData.defaultText);

        cy.stepInfo("[QA-4590] 5. Modify commentary and check 'Cancel' button functionality");
        Income._CommercialManager.StabilizedRentRoll.clickEditDiscussionButton()
            .editDiscussionTextArea(testData.value)
            .cancelStabilizedRentRollCommentary()
            .verifyStabilizedCommercialIncomeTextArea(testData.defaultText);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});