import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4411&12.fixture";
import Homepage from "../../../../../actions/base/homepage.actions";
import Income from "../../../../../actions/income/income.manager";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";

describe("Current Commercial Income Discussion > Modified label and Save button functionality", () => {
    before("Login, create report", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
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
            .verifyCommentaryTextBoxNotHaveText(testData.editedCommentary)
            .returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});