import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Report from "../../../../actions/report/report.manager";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4637.fixture';

describe(`Verify the suggested text dropdown in the new narrative component added through "=" for the 'Foreclosure sale' 
    option on the Report > Client page for Intended User and Identification of the Client sections.`, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo('1. Proceed to the Report > Client page.');
        NavigationSection.navigateToClientPage();

        cy.stepInfo('2. Click on the Edit button for Intended User and Identification of the Client sections.');
        Report.Client.verifyProgressBarNotExist()
            .clickEditIntendedUserButton()
            .clickEditIdentificationOfTheClientButton();

        cy.stepInfo('3. Enter the “=F“ and select the \'Foreclosure sale\' option for both sections.');
        Report.Client.enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue);

        Report.Client.enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue, 1);

        cy.stepInfo('4. Verify that the following text appears in both sections.');
        Report.Client.verifyIntendedUserTextBox(testData.verifyAreaValue)
            .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});