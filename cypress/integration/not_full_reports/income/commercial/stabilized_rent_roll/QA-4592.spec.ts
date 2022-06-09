import { Income } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4592.fixture";

describe(`Verify the 'Changes will be lost' modal functionality`,
    { tags: [ '@income', '@commercial', '@stabilized_rent_roll' ] }, () => {

        before("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {

            cy.stepInfo("Precondition: Proceed to the Income > Commercial > Stabilized Rent Roll page.");
            _NavigationSection.navigateToCommercialInPlaceRentRoll().verifyProgressBarNotExist();

            cy.stepInfo(`1. Click on the Edit button. + Edit comment and click on the Revert to Original button +
                         Verify the "Changes will be lost" modal is displayed.`);
            Income._CommercialManager.StabilizedRentRoll.clickEditDiscussionButton()
                .verifyEditDiscussionButtonsDisplayed()
                .editDiscussionTextArea(testData.commentText)
                .verifyCommentaryFullText(testData.commentText)
                .clickRevertToOriginalButton();

            cy.stepInfo(`2. Click on the X icon and verify that the modal is closed and no changes are applied.`);
            Income._CommercialManager.StabilizedRentRoll.clickCloseButton()
                .verifyCommentaryFullText(testData.commentText);

            cy.stepInfo(`3. Click on the Revert to Original button again + 
                         Click on the Cancel button in the modal and verify that the modal is closed and no changes are applied.`);
            Income._CommercialManager.StabilizedRentRoll
                .clickRevertToOriginalButton()
                .clickCancelRevertButton()
                .verifyCommentaryFullText(testData.commentText);

            cy.stepInfo(`4. Click on the Revert to Original button again + 
                         Click on the "Yes, revert" button in the modal + 
                         verify that the modal is closed and all custom changes made to the Stabilized Commercial Income Discussion are deleted.`);
            Income._CommercialManager.StabilizedRentRoll
                .clickRevertToOriginalButton()
                .clickYesRevertButton()
                .verifyCommentaryTextBoxNotHaveText(testData.commentText);

            deleteReport(testData.reportCreationData.reportNumber);
        });
    });