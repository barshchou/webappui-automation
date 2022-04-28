import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4632.fixture';

describe("Verify the Cancel button functionality for Intended User and Identification of the Client sections", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Click on the Edit button on the Report > Client page for Intended User and Identification of the Client sections.");
        _NavigationSection.navigateToClientPage();
        Report._Client.verifyProgressBarNotExist()
        .Page.formEditBtn(0).click();
        Report._Client.Page.formEditBtn(0).click();

        cy.stepInfo("2. Verify that the Cancel button is displayed instead of the Edit button for both sections.");
        Report._Client.Page.formCancelButton(0).should("be.visible");
        Report._Client.Page.formCancelButton(1).should("be.visible");
        Report._Client.Page.formRevertToOriginalBtn(0).should("be.visible");
        Report._Client.Page.formRevertToOriginalBtn(1).should("be.visible");

        cy.stepInfo("3. Click on the Cancel button and verify that the form closes form without saving changes with no warning message for both sections.");
        Report._Client.enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifySuggestion)
            .enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifySuggestion, 1);

        Report._Client.Page.formRevertToOriginalBtn(0).should("be.enabled");
        Report._Client.Page.formRevertToOriginalBtn(1).should("be.enabled");

        cy.stepInfo("4. Click on the Revert to Original button and verify the ‘Changes will be lost modal’ is displayed for both sections.");
        Report._Client.Page.formRevertToOriginalBtn(0).click();
        Report._Client.Page.formYesRevertBtn.click();
        Report._Client.Page.formRevertToOriginalBtn(1).click();
        Report._Client.Page.formYesRevertBtn.click();
        Report._Client.verifyIntendedUserTextBox(testData.verifyIntendedUserTextArea)
            .verifyIdentificationOfTheClientTextBox(testData.verifyIdentificationOfTheClientTextArea);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});