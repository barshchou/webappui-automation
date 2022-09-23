import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4411-12.fixture";
import Income from "../../../../../actions/income/income.manager";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import Enums from "../../../../../enums/enums";

describe(`Current Commercial Income Discussion > Verify the Revert to Original button and 
    'Changes will be lost' functionality`, 
{ tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {
            
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Navigate to commercial In-Place Rent Roll");
        NavigationSection.navigateToCommercialInPlaceRentRoll()
            .verifyProgressBarNotExist();
        cy.stepInfo("2. Click to commentary field, verify, that revert button is disabled");
        Income.Commercial.InPlaceRentRoll.activateTextAreaInput(Income.Commercial.InPlaceRentRoll.Page.commentaryText)
            .Page.formRevertToOriginalBtnBySectionName(Enums.PAGES_TEXTBOX_NAMES.currentCommercialIncomeDiscussion)
            .should("be.disabled");
        cy.stepInfo("3. Edit discussion, verify, that revert button is enabled");
        Income.Commercial.InPlaceRentRoll.editDiscussion(testData.editedCommentary, true, false)
            .activateTextAreaInput(Income.Commercial.InPlaceRentRoll.Page.commentaryText)
            .Page.formRevertToOriginalBtnBySectionName(Enums.PAGES_TEXTBOX_NAMES.currentCommercialIncomeDiscussion)
            .should("not.be.disabled");
        cy.stepInfo("4. Click revert button, click close button, verify, that text did not change");
        Income.Commercial.InPlaceRentRoll.clickRevertToOriginalButton()
            .clickCloseButton()
            .verifyCommentaryContainsText(testData.editedCommentary);
        cy.stepInfo("5. Click revert button, click cancel button, verify, that text did not change");
        Income.Commercial.InPlaceRentRoll.activateTextAreaInput(Income.Commercial.InPlaceRentRoll.Page.commentaryText)
            .clickRevertToOriginalButton()
            .clickCancelRevertButton()
            .verifyCommentaryContainsText(testData.editedCommentary);
        cy.stepInfo("6. Click revert button, click 'Yes, revert' button, verify, that text has changed");
        Income.Commercial.InPlaceRentRoll.activateTextAreaInput(Income.Commercial.InPlaceRentRoll.Page.commentaryText)
            .clickRevertToOriginalButton()
            .clickYesRevertButton()
            .verifyCommentaryTextBoxNotHaveText(testData.editedCommentary);
    });
});