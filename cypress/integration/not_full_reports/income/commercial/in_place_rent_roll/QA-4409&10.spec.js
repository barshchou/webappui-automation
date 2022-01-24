import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4409&10.fixture";
import Homepage from "../../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";


describe("Verify the functionality of Edit and Cancel commentary buttons", () => {

    before("Login, create report", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToCommercialInPlaceRentRoll()
            .verifyProgressBarNotExist();
        Income.Commercial.InPlaceRentRoll.clickEditDiscussionButton()
            .verifyEditDiscussionButtonsDisplayed()
            .clearAndEnterNewCommentary(testData.newCommentary)
            .clickCancelDiscussionEditButton()
            .verifyCommentaryTextNotContains(testData.newCommentary)
            .returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});