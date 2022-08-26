import { Income, Property } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4582.fixture";

describe(`Verify the Unsaved changes modal functionality on the Income > Commercial > Stabilized Rent Roll page:`,
    { tags: [ '@income', '@commercial', '@stabilized_rent_roll' ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`Precondition: Navigate to Summary page and add commercial units.`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll
                .chooseListLeaseStatuses(testData.leaseStatuses, testData.numberOfCommercialUnits);

            cy.stepInfo(`1. Fill in the editable fields with values or/and check check-boxes or/and click 
                         the radio button and do NOT click on the Save button.`);
            _NavigationSection.navigateToCommercialStabilizedRentRoll();
            Income._CommercialManager.StabilizedRentRoll.verifyThatPageIsOpened()
                .Page.rentPerSFAnnuallyTotal.scrollIntoView();
            Income._CommercialManager.StabilizedRentRoll
                .enterListPerSFAnnually(testData.leaseStatuses, testData.rentToBe)
                .activateTextAreaInput( Income._CommercialManager.StabilizedRentRoll.Page.commentaryText)
                .editDiscussionTextArea(testData.commentText)
                .inactivateTextAreaInput()
                .verifyCommentaryContainsText(testData.commentText);

            cy.stepInfo(`2. Try to proceed on any other page and verify that the Unsaved changes modal is displayed.`);
            _NavigationSection.clickPropertyButton().clickSummaryButton().verifyUnsavedChangesModal();

            cy.stepInfo(`3. Click on the Yes button and verify that the changes are saved 
            on the Stabilized Rent Roll page.`);
            _NavigationSection.clickYesButton();
            Property._Summary.verifyThatPageIsOpened();
            _NavigationSection.clickIncomeApproachButton().clickCommercialArrow()
                .clickCommercialStabRentRollButton().verifyUnsavedChangesModal().clickYesButton();
            Income._CommercialManager.StabilizedRentRoll
                .verifyThatPageIsOpened()
                .verifyListRentPsfAnnually(testData.leaseStatuses, testData.rentToBe)
                .verifyCommentaryContainsText(testData.commentText);

            cy.stepInfo(`4. Repeat step 1, try to proceed on any other page from the Stabilized Rent Roll page 
                         and verify that the Unsaved changes modal is displayed.`);
            Income._CommercialManager.StabilizedRentRoll
                .Page.rentPerSFAnnuallyTotal.scrollIntoView();
            Income._CommercialManager.StabilizedRentRoll
                .enterListPerSFAnnually(testData.leaseStatuses, testData.rentToBe2)
                .activateTextAreaInput( Income._CommercialManager.StabilizedRentRoll.Page.commentaryText)
                .editDiscussionTextArea(testData.commentText2)
                .inactivateTextAreaInput()
                .verifyCommentaryContainsText(testData.commentText2);
            _NavigationSection.clickPropertyButton().clickSummaryButton().verifyUnsavedChangesModal();

            cy.stepInfo(`5. Click on the No button and verify that the changes 
            are NOT saved on the Stabilized Rent Roll page.`);
            _NavigationSection.clickNoButton();
            Property._Summary.verifyThatPageIsOpened();
            _NavigationSection.clickIncomeApproachButton().clickCommercialArrow().
                clickCommercialStabRentRollButton().verifyUnsavedChangesModal().clickYesButton();
            Income._CommercialManager.StabilizedRentRoll
                .verifyThatPageIsOpened()
                .verifyListRentPsfAnnually(testData.leaseStatuses, testData.rentToBe)
                .verifyCommentaryContainsText(testData.commentText);
        });
    });
