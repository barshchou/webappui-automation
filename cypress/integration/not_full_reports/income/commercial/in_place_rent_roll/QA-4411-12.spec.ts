import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4411-12.fixture";
import Income from "../../../../../actions/income/income.manager";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe.skip(`Current Commercial Income Discussion > Verify the Revert to Original button and 
    'Changes will be lost' functionality`, 
{ tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {
            
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    //TODO update test after test-cases updates QA-6543
    it("Test body", () => {
        NavigationSection.navigateToCommercialInPlaceRentRoll()
            .verifyProgressBarNotExist();
        Income.Commercial.InPlaceRentRoll.editDiscussion(testData.editedCommentary)
            .clickRevertToOriginalButton()
            .clickCloseButton()
            .verifyCommentaryFullText(testData.editedCommentary)
            .clickRevertToOriginalButton()
            .clickCancelRevertButton()
            .verifyCommentaryFullText(testData.editedCommentary)
            .clickRevertToOriginalButton()
            .clickYesRevertButton()
            .verifyCommentaryTextBoxNotHaveText(testData.editedCommentary);
    });
});