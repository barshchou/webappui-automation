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
        NavigationSection.navigateToCommercialInPlaceRentRoll()
            .verifyProgressBarNotExist();
        Income.Commercial.InPlaceRentRoll.activateTextAreaInput(Income.Commercial.InPlaceRentRoll.Page.commentaryText)
            .Page.formRevertToOriginalBtnBySectionName(Enums.PAGES_TEXTBOX_NAMES.currentCommercialIncomeDiscussion)
            .should("be.disabled");
        Income.Commercial.InPlaceRentRoll.editDiscussion(testData.editedCommentary, true, false)
            .activateTextAreaInput(Income.Commercial.InPlaceRentRoll.Page.commentaryText)
            .Page.formRevertToOriginalBtnBySectionName(Enums.PAGES_TEXTBOX_NAMES.currentCommercialIncomeDiscussion)
            .should("not.be.disabled");
        Income.Commercial.InPlaceRentRoll.clickRevertToOriginalButton()
            .clickCloseButton()
            .verifyCommentaryContainsText(testData.editedCommentary)
            .activateTextAreaInput(Income.Commercial.InPlaceRentRoll.Page.commentaryText)
            .clickRevertToOriginalButton()
            .clickCancelRevertButton()
            .verifyCommentaryContainsText(testData.editedCommentary)
            .activateTextAreaInput(Income.Commercial.InPlaceRentRoll.Page.commentaryText)
            .clickRevertToOriginalButton()
            .clickYesRevertButton()
            .verifyCommentaryTextBoxNotHaveText(testData.editedCommentary);
    });
});