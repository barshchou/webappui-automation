import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Report from "../../../../actions/report/report.manager";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4635.fixture';

describe("Verify the Save button functionality for Intended User and Identification of the Client sections.", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Click on the Edit button on the Report > Client page for Intended User and Identification of the Client sections.");
        NavigationSection.navigateToClientPage();

        Report.Client.verifyProgressBarNotExist()
            .clickTextBoxEditButton()
            .clickTextBoxEditButton();

        cy.stepInfo("2. Edit comment and click on the Save button for both sections.");
        Report.Client.enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue)
            .enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue, 1)
            .clickTextBoxSaveButton()
            .clickTextBoxSaveButton();

        cy.stepInfo("3. Verify that the changes from step 2 are saved.");
        Report.Client.verifyIntendedUserTextBox(testData.verifyAreaValue)
            .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});