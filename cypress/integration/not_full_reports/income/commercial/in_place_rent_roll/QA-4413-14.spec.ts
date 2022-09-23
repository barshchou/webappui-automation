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
            cy.stepInfo("1. Navigate to Commercial In-Place Rent Roll");
            _NavigationSection.navigateToCommercialInPlaceRentRoll()
                .verifyProgressBarNotExist();
            cy.stepInfo("2. Edit discussion, verify, that revert button is visible");
            Income._CommercialManager.InPlaceRentRoll
                .editDiscussion(testData.editedCommentary, true, false)
                .activateTextAreaInput(Income._CommercialManager.InPlaceRentRoll.Page
                    .formCommentTextBox(Enums.PAGES_TEXTBOX_NAMES.currentCommercialIncomeDiscussion))
                .Page.formRevertToOriginalBtnBySectionName(Enums.PAGES_TEXTBOX_NAMES.currentCommercialIncomeDiscussion)
                .should("be.visible");
            cy.stepInfo("3. Click outside of commentary, verify, that revert button is not visible");
            Income._CommercialManager.InPlaceRentRoll.inactivateTextAreaInput().Page
                .formRevertToOriginalBtnBySectionName(Enums.PAGES_TEXTBOX_NAMES.currentCommercialIncomeDiscussion)
                .should("not.be.visible");
            Income._CommercialManager.InPlaceRentRoll.verifyCommentaryContainsText(testData.editedCommentary);
            cy.stepInfo("4. Reload the page, verify, that edited comment wasn't saved");
            cy.reload();
            Income._CommercialManager.InPlaceRentRoll.verifyCommentaryTextNotContains(testData.editedCommentary);
            cy.stepInfo("5. Edit discussion, click save button, reload page, verify changes are saved");
            Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus)
                .editDiscussion(testData.editedCommentary, true, false)
                .clickSaveButton()
                .verifyProgressBarNotExist();
            cy.reload();
            Income._CommercialManager.InPlaceRentRoll.verifyCommentaryContainsText(testData.editedCommentary);
            cy.stepInfo("6. Edit discussion, click Save&Continue button, return back and verify, that changes saved");
            Income._CommercialManager.InPlaceRentRoll.editDiscussion(testData.editedSecondTime, true, false)
                .clickSaveContinueButton();
            _NavigationSection.verifyProgressBarNotExist();
            Income._CommercialManager.StabilizedLeaseStructure.verifyThatPageIsOpened();
            cy.go("back");
            _NavigationSection.submitSaveChangesModal();
            Income._CommercialManager.InPlaceRentRoll.verifyCommentaryContainsText(testData.editedSecondTime);
            cy.stepInfo("7. Edit discussion, navigate to other page, return back and verify, that changes saved");
            Income._CommercialManager.InPlaceRentRoll.editDiscussion(testData.editedThirdTime, true, false);
            _NavigationSection.navigateToPropertySummary()
                .navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll.verifyCommentaryContainsText(testData.editedThirdTime);
        });
    });