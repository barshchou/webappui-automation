import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4409-10.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import { createReport } from "../../../../../actions/base/baseTest.actions";


describe("Verify the functionality of Edit and Cancel commentary buttons", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {
        
        before("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToCommercialInPlaceRentRoll()
                .verifyProgressBarNotExist();
            Income.Commercial.InPlaceRentRoll.clickEditDiscussionButton()
                .verifyEditDiscussionButtonsDisplayed()
                .editDiscussionTextArea(testData.newCommentary);
            Income.Commercial.InPlaceRentRoll.clickCancelDiscussionEditButton()
                .verifyCommentaryTextNotContains(testData.newCommentary);
        });
    });