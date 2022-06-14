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

        cy.saveLocalStorage();
    });

    beforeEach('Test', () => {
        cy.restoreLocalStorage();
    });

    it("[QA-4484]", () => {
        cy.stepInfo("1. Edit discussion and enter '=F' value; click 'Foreclosure Sale' suggested value");
        Income._CommercialManager.InPlaceRentRoll.clickEditDiscussionButton()
            .editDiscussionTextArea(testData.value)
            .clickNarrativeSuggestions(testData.unchangeRennovation);

        cy.stepInfo("3. Verify that the following text appears.");
        Income._CommercialManager.InPlaceRentRoll.verifyCommentaryContainsText(testData.verifyAreaValue);
    });

    after("Delete report after test suite", () => {
        deleteReport(testData.reportCreationData.reportNumber);
    });
});