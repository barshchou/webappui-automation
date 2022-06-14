import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4484_86_88-90.fixture";
import { Income } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";

describe(`[Income > Commercial > In-Place Rent Roll > Generated Commentary]
        Verify the suggested text dropdown`,
        { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);

        cy.stepInfo("Precondition: Proceed to the Income > Commercial > In-Place Rent Roll page.");
        _NavigationSection.navigateToCommercialInPlaceRentRoll()
            .verifyProgressBarNotExist();
        Income._CommercialManager.InPlaceRentRoll
            .chooseLeaseStatusByRowNumber(testData.leaseStatus)
            .clickSaveButton();

        cy.saveLocalStorage();
    });

    beforeEach('Test', () => {
        cy.restoreLocalStorage();
    });

    it("[QA-4484], [QA-4486]", () => {
        Income._CommercialManager.InPlaceRentRoll.clickEditDiscussionButton();
        testData.suggestionsVerificationData.forEach((data) => {
            cy.stepInfo(`1. Edit discussion and enter '${data.value}'
                        value; click '${data.suggestion}' suggested value`);
            Income._CommercialManager.InPlaceRentRoll.editDiscussionTextArea(data.value)
                .clickNarrativeSuggestions(data.suggestion);
    
            cy.stepInfo(`2. Verify that the following text appears.`);
            Income._CommercialManager.InPlaceRentRoll
                .verifyCommentaryContainsText(data.verifyAreaValue);
        });
    });

    it("[QA-4488]", () => {
        cy.reload();
        Income._CommercialManager.InPlaceRentRoll.clickEditDiscussionButton()
            .editDiscussionTextArea(" ");
        testData.chipVerificationData.forEach((data) => {
            cy.stepInfo(`1. Edit discussion and enter '${testData.chipPromptValue}' 
                        value; click '${data.suggestion}' suggested value`);
            Income._CommercialManager.InPlaceRentRoll
                .editDiscussionTextArea(data.value, false)
                .clickNarrativeSuggestions(data.suggestion);
            
            cy.stepInfo(`2. Verify that the following text appears.`);
            Income._CommercialManager.InPlaceRentRoll
                .verifyCommentaryContainsText(data.verifyAreaValue);
        });
    });

    after("Delete report after test suite", () => {
        deleteReport(testData.reportCreationData.reportNumber);
    });
});