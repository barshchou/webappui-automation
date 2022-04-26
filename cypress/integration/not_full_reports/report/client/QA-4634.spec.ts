import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4634.fixture';

describe("Verify the 'Changes will be lost' modal functionality for Intended User and Identification of the Client sections", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Click on the Edit button on the Report > Client page for Intended User and Identification of the Client sections.");
        _NavigationSection.navigateToClientPage();

        Report._Client.verifyProgressBarNotExist()
            .Page.formEditBtn(0).click();
        Report._Client.Page.formEditBtn(0).click();

        cy.stepInfo("2. Edit comment and click on the Revert to Original button for both sections.");
        Report._Client.enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue)
            .enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue, 1);

        cy.stepInfo("3. Verify the ‘Changes will be lost modal’ is displayed for both sections.");
        Report._Client.Page.formRevertToOriginalBtn(0).click();
        Report._Client.Page.modalWindow.should('be.visible');
        Report._Client.Page.formYesRevertBtn.click();
        Report._Client.Page.formRevertToOriginalBtn(1).click();
        Report._Client.Page.modalWindow.should('be.visible');
        Report._Client.Page.formYesRevertBtn.click();

        cy.stepInfo("4. Click on the Revert to Original button again.");
        Report._Client.enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue)
            .enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue, 1)
            .Page.formRevertToOriginalBtn(0).click();
            Report._Client.Page.CloseIcon.click();
            Report._Client.Page.formRevertToOriginalBtn(1).click();
            Report._Client.Page.CloseIcon.click();

        cy.stepInfo("5. Click on the X icon and verify that the modal is closed and no changes are applied.");
        Report._Client.verifyIntendedUserTextBox(testData.verifyAreaValue)
            .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);
            

        cy.stepInfo("6. Click on the Revert to Original button again.");
        Report._Client.enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue)
            .enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue, 1)
            .Page.formRevertToOriginalBtn(0).click();
            Report._Client.Page.CloseIcon.click();
            Report._Client.Page.formRevertToOriginalBtn(1).click();
            Report._Client.Page.CloseIcon.click();

        cy.stepInfo("7. Click on the Cancel button in the modal and verify that the modal is closed and no changes are applied.");
        Report._Client.verifyIntendedUserTextBox(testData.verifyAreaValue)
            .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);

        cy.stepInfo("8. Click on the Revert to Original button again.");
        Report._Client.enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue)
            .enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue, 1)
            .Page.formRevertToOriginalBtn(0).click();
            Report._Client.Page.formYesRevertBtn.click();
            Report._Client.Page.formRevertToOriginalBtn(1).click();
            Report._Client.Page.formYesRevertBtn.click();

        cy.stepInfo(`9.Click on the ‘Yes, revert’ button in the modal and verify that the modal is closed and all 
            custom changes made to the Current Commercial Income Discussion are deleted.`);
        Report._Client.verifyNotContainIntendedUserTextBox(testData.verifyAreaValue)
            .verifyNotContainIdentificationOfTheClientTextBox(testData.verifyAreaValue);

         deleteReport(testData.reportCreationData.reportNumber);
    });
});