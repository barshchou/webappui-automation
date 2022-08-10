import { Income, Property } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import testData from 
    "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4589-92_94.fixture";

describe(`Verify the commentary functionality`, 
    { tags:[ "@income", "@commercial", "@stabilized_rent_roll" ] }, () => {

        before("Login, create report", () => {
            createReport(testData.reportCreationData);

            cy.stepInfo("Precondition: Navigate to Summary page and set commercial units");
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

            cy.stepInfo("Precondition: Proceed to the Income > Commercial > Stabilized Rent Roll page.");
            _NavigationSection.navigateToCommercialUnits()
                .clickIncomeApproachButton()
                .clickCommercialArrow()
                .navigateToStabilizedRentRollInCommercial()
                .verifyProgressBarNotExist();

            cy.saveLocalStorage();
        });

        beforeEach('Test', () => {
            cy.restoreLocalStorage();
        });

        //TODO test-case must be updated
        it.skip("[QA-4589]", () => {
            cy.stepInfo("1. Click on the Edit button and modify commentary and save changes.");
            Income._CommercialManager.StabilizedRentRoll.clickEditDiscussionButton()
                .editDiscussionTextArea(testData.textUpdateValue)
                .verifyEditDiscussionButtonsDisplayed()
                .clickSaveDiscussionButton();
        });

        //TODO test-case must be updated
        it("[QA-4594]", () => {
            cy.stepInfo("1. Verify that commentary 'Modified' label appears");
            Income._CommercialManager.StabilizedRentRoll.activateTextAreaInput()
                .editDiscussionTextArea(testData.textUpdateValue)
                .verifyModifiedLabelExist();
        });

        //TODO test-case must be updated
        it.skip("[QA-4591]", () => {
            cy.stepInfo("1. Verify commentary revert to original");
            Income._CommercialManager.StabilizedRentRoll.activateTextAreaInput()
                .revertToOriginalCommentary()
                .verifyCommentaryFullText(testData.defaultText);
        });

        //TODO test-case must be updated
        it.skip("[QA-4592]", () => {
            cy.stepInfo("1. Verify the 'Changes will be lost' modal functionality");
            Income._CommercialManager.StabilizedRentRoll.clickEditDiscussionButton()
                .editDiscussionTextArea(testData.textUpdateValue)
                .clickRevertToOriginalButton()
                .clickCloseButton()
                .verifyCommentaryContainsText(testData.textUpdateValue)
                .clickRevertToOriginalButton()
                .clickCancelRevertButton()
                .verifyCommentaryContainsText(testData.textUpdateValue)
                .clickRevertToOriginalButton()
                .clickYesRevertButton()
                .verifyCommentaryFullText(testData.defaultText)
                .clickCancelDiscussionEditButton();
        });

        //TODO test-case must be updated
        it.skip("[QA-4590]", () => {
            cy.stepInfo("1. Modify commentary and check 'Cancel' button functionality");
            Income._CommercialManager.StabilizedRentRoll.clickEditDiscussionButton()
                .editDiscussionTextArea(testData.textUpdateValue)
                .clickCancelDiscussionEditButton()
                .verifyCommentaryFullText(testData.defaultText);
        });
    });