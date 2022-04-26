import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4409&10.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";


describe("Verify the functionality of Edit and Cancel commentary buttons",{tags:"@fix"}, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToCommercialInPlaceRentRoll()
            .verifyProgressBarNotExist();
        Income.Commercial.InPlaceRentRoll.clickEditDiscussionButton()
            .verifyEditDiscussionButtonsDisplayed()
            .clearAndEnterNewCommentary(testData.newCommentary)
            .clickCancelDiscussionEditButton()
            .verifyCommentaryTextNotContains(testData.newCommentary);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});