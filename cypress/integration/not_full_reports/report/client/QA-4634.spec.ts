import { _NavigationSection } from "../../../../actions/base";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import { _Client } from "../../../../actions/report";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4634.fixture';

describe("Verify the 'Changes will be lost' modal functionality for Intended User and Identification of the Client sections", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Click on the Edit button on the Report > Client page for Intended User and Identification of the Client sections.");
        _NavigationSection.navigateToClientPage();

        _Client.verifyProgressBarNotExist()
            .clickTextBoxEditButton()
            .clickTextBoxEditButton();

        cy.stepInfo("2. Edit comment and click on the Revert to Original button for both sections.");
        _Client.enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue)
            .enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue, 1)
            .clickTextBoxFormRevertToOriginalBtn()
            .clickDialogYesRevertBtn()
            .clickTextBoxFormRevertToOriginalBtn(1)
            .clickDialogYesRevertBtn();

        cy.stepInfo("3. Verify the ‘Changes will be lost modal’ is displayed for both sections.");
        _Client.verifyNotContainIntendedUserTextBox(testData.verifyAreaValue)
            .verifyNotContainIdentificationOfTheClientTextBox(testData.verifyAreaValue);


        // cy.stepInfo("4. Click on the X icon and verify that the modal is closed and no changes are applied.");
        // cy.stepInfo("5. Click on the Revert to Original button again.");
        // cy.stepInfo("6. Click on the Cancel button in the modal and verify that the modal is closed and no changes are applied.");
        // cy.stepInfo("7. Click on the Revert to Original button again.");
        // cy.stepInfo("8. Click on the Revert to Original button again.");

        // deleteReport(testData.reportCreationData.reportNumber);
    });
});