import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4409.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import Enums from "../../../../../enums/enums";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";

describe("Verify the functionality of Edit and Cancel commentary buttons",
    { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            _NavigationSection.navigateToCommercialInPlaceRentRoll()
                .verifyProgressBarNotExist();
            Income._CommercialManager.InPlaceRentRoll
                .activateTextAreaInput(Income._CommercialManager.InPlaceRentRoll.Page
                    .formCommentTextBox(Enums.PAGES_TEXTBOX_NAMES.currentCommercialIncomeDiscussion))
                .editDiscussionTextArea(testData.newCommentary);
            Income._CommercialManager.InPlaceRentRoll.Page
                .formRevertToOriginalBtnBySectionName(Enums.PAGES_TEXTBOX_NAMES.currentCommercialIncomeDiscussion)
                .should("exist").and("be.visible");
            Income._CommercialManager.InPlaceRentRoll
                .verifyCommentaryContainsText(testData.newCommentary);
        });
    });