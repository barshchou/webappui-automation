import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4635.fixture';

describe("Verify the Save button functionality on the Report > Client page", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. The Save button is displayed on the Client page.");
        _NavigationSection.navigateToClientPage();

        Report._Client.verifyProgressBarNotExist()
            .Page.formEditBtn(0).click().should('be.visible');
        Report._Client.Page.formEditBtn(0).click().should('be.visible');

        Report._Client.Page.formSaveBtn(0).should('be.visible');
        Report._Client.Page.formSaveBtn(1).should('be.visible');

        // cy.stepInfo("2. Edit comment and click on the Save button for both sections.");
        // Report._Client.enterIntendedUserTextBox(testData.textToType)
        //     .clickNarrativeSuggestions(testData.verifyListValue)
        //     .enterIdentificationOfTheClientTextBox(testData.textToType)
        //     .clickNarrativeSuggestions(testData.verifyListValue, 1)
        //     .clickTextBoxSaveButton()
        //     .clickTextBoxSaveButton();

        // cy.stepInfo("3. Verify that the changes from step 2 are saved.");
        // Report._Client.verifyIntendedUserTextBox(testData.verifyAreaValue)
        //     .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);

        // deleteReport(testData.reportCreationData.reportNumber);
    });
});