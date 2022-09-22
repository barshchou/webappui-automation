import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4413-14.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";
import Enums from "../../../../../enums/enums";

describe("Current Commercial Income Discussion > Modified label and Save button functionality", 
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
                .editDiscussion(testData.editedCommentary, true, false)
                .Page.formRevertToOriginalBtnBySectionName(Enums.PAGES_TEXTBOX_NAMES.currentCommercialIncomeDiscussion)
                .should("be.visible");
            Income._CommercialManager.InPlaceRentRoll.inactivateTextAreaInput().Page
                .formRevertToOriginalBtnBySectionName(Enums.PAGES_TEXTBOX_NAMES.currentCommercialIncomeDiscussion)
                .should("not.be.visible");
            Income._CommercialManager.InPlaceRentRoll.verifyCommentaryContainsText(testData.editedCommentary);
            cy.reload();
            Income._CommercialManager.InPlaceRentRoll.verifyCommentaryTextNotContains(testData.editedCommentary)
                .chooseLeaseStatusByRowNumber(testData.leaseStatus)
                .editDiscussion(testData.editedCommentary, true, false)
                .clickSaveButton()
                .verifyProgressBarNotExist();
            cy.reload();
            Income._CommercialManager.InPlaceRentRoll.verifyCommentaryContainsText(testData.editedCommentary)
                .editDiscussion(testData.editedSecondTime, true, false)
                .clickSaveContinueButton();
            _NavigationSection.verifyProgressBarNotExist();
            Income._CommercialManager.StabilizedLeaseStructure.verifyThatPageIsOpened();
            cy.go("back");
            _NavigationSection.submitSaveChangesModal();
            Income._CommercialManager.InPlaceRentRoll.verifyCommentaryContainsText(testData.editedSecondTime)
                .editDiscussion(testData.editedThirdTime, true, false);
            _NavigationSection.navigateToPropertySummary()
                .navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll.verifyCommentaryContainsText(testData.editedThirdTime);
        });
    });