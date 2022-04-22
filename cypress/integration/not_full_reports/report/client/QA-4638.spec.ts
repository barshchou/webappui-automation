import { _NavigationSection } from "../../../../actions/base";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import { _Client } from "../../../../actions/report";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4638.fixture';

describe(`Verify the suggested text dropdown in the new narrative component added through "=" for the 'Sheriff's sale' option 
    on the Report > Client page for Intended User and Identification of the Client sections.`, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo('1. Proceed to the Report > Client page.');
        _NavigationSection.navigateToClientPage();

        cy.stepInfo('2. Click on the Edit button for Intended User and Identification of the Client sections.');
        _Client.verifyProgressBarNotExist()
            .clickTextBoxEditButton()
            .clickTextBoxEditButton();

        cy.stepInfo('3. Enter the “=S“ and select the \'Sheriff\'s sale\' option for both sections.');
        _Client.enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue)
            .enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue, 1);

        cy.stepInfo('4.Verify that the following text appears for both sections.');
        _Client.verifyIntendedUserTextBox(testData.verifyAreaValue)
            .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});