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

        //TODO update test after test-cases updates QA-6543
        it.skip("[QA-4589]", () => {
            cy.stepInfo("1. Click on the Edit button and modify commentary and save changes.");
            Income._CommercialManager.StabilizedRentRoll.activateTextAreaInput(
                Income._CommercialManager.StabilizedRentRoll.Page.commentaryText)
                .editDiscussionTextArea(testData.textUpdateValue);
        });

        //TODO update test after test-cases updates QA-6543
        it("[QA-4594]", () => {
            cy.stepInfo("1. Verify that commentary 'Modified' label appears");
            Income._CommercialManager.StabilizedRentRoll.activateTextAreaInput(
                Income._CommercialManager.StabilizedRentRoll.Page.commentaryText)
                .editDiscussionTextArea(testData.textUpdateValue)
                .verifyModifiedLabelExist();
        });

        //TODO update test after test-cases updates QA-6543
        it("[QA-4591]", () => {
            cy.stepInfo("1. Verify commentary revert to original");
            Income._CommercialManager.StabilizedRentRoll.activateTextAreaInput(
                Income._CommercialManager.StabilizedRentRoll.Page.commentaryText)
                .revertToOriginalCommentary()
                .verifyCommentaryFullText(testData.defaultText);
        });

        //TODO update test after test-cases updates QA-6543
        it("[QA-4592]", () => {
            cy.stepInfo("1. Verify the 'Changes will be lost' modal functionality");
            Income._CommercialManager.StabilizedRentRoll.verifyProgressBarNotExist()
                .activateTextAreaInput(
                    Income._CommercialManager.StabilizedRentRoll.Page.commentaryText)
                .editDiscussionTextArea(testData.textUpdateValue)
                .clickRevertToOriginalButton()
                .clickCloseButton()
                .verifyCommentaryContainsText(testData.textUpdateValue)
                .activateTextAreaInput(
                    Income._CommercialManager.StabilizedRentRoll.Page.commentaryText)
                .clickRevertToOriginalButton()
                .clickCancelRevertButton()
                .verifyCommentaryContainsText(testData.textUpdateValue)
                .activateTextAreaInput(
                    Income._CommercialManager.StabilizedRentRoll.Page.commentaryText)
                .clickRevertToOriginalButton()
                .clickYesRevertButton()
                .verifyCommentaryFullText(testData.defaultText);
        });

        //TODO update test after test-cases updates QA-6543
        it.skip("[QA-4590]", () => {
            cy.stepInfo("1. Modify commentary and check 'Cancel' button functionality");
            Income._CommercialManager.StabilizedRentRoll
                .editDiscussionTextArea(testData.textUpdateValue)
                .clickCancelDiscussionEditButton()
                .verifyCommentaryFullText(testData.defaultText);
        });
    });