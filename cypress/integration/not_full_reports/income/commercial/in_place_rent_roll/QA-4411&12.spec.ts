import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4411&12.fixture";
import Income from "../../../../../actions/income/income.manager";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { Tag } from "../../../../../utils/tags.utils";

describe(`Current Commercial Income Discussion > Verify the Revert to Original button and 'Changes will be lost' functionality`, 
        { tags:[ Tag.income, Tag.commercial, Tag.in_place_rent_roll ] }, () => {
            
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToCommercialInPlaceRentRoll()
            .verifyProgressBarNotExist();
        Income.Commercial.InPlaceRentRoll.editDiscussion(testData.editedCommentary)
            .clickEditDiscussionButton()
            .clickRevertToOriginalButton()
            .clickCloseButton()
            .verifyCommentaryTextBoxText(testData.editedCommentary)
            .clickRevertToOriginalButton()
            .clickCancelRevertButton()
            .verifyCommentaryTextBoxText(testData.editedCommentary)
            .clickRevertToOriginalButton()
            .clickYesRevertButton()
            .verifyCommentaryTextBoxNotHaveText(testData.editedCommentary);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});