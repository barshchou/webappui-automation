import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Report from "../../../../actions/report/report.manager";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4634.fixture';

describe("Verify the 'Changes will be lost' modal functionality for Intended User and Identification of the Client sections", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Click on the Edit button on the Report > Client page for Intended User and Identification of the Client sections.");
        NavigationSection.navigateToClientPage();

        Report.Client.verifyProgressBarNotExist()
            .clickTextBoxEditButton()
            .clickTextBoxEditButton();

        cy.stepInfo("2. Edit comment and click on the Revert to Original button for both sections.");
        Report.Client.enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue)
            .enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue, 1)
            .clickTextBoxSaveButton()
            .clickTextBoxSaveButton();

        cy.stepInfo("3. Verify the ‘Changes will be lost modal’ is displayed for both sections.");
        Report.Client.verifyIntendedUserTextBox(testData.verifyAreaValue)
            .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);


        // cy.stepInfo("4. Click on the X icon and verify that the modal is closed and no changes are applied.");
        // cy.stepInfo("5. Click on the Revert to Original button again.");
        // cy.stepInfo("6. Click on the Cancel button in the modal and verify that the modal is closed and no changes are applied.");
        // cy.stepInfo("7. Click on the Revert to Original button again.");
        // cy.stepInfo("8. Click on the Revert to Original button again.");

        deleteReport(testData.reportCreationData.reportNumber);
    });
});