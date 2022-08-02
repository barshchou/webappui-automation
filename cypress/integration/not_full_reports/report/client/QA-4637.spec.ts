import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4637.fixture';

describe(`Verify the suggested text dropdown in the new narrative component added through "=" 
for the 'Foreclosure sale' option on the Report > Client page for Intended User 
and Identification of the Client sections.`, 
{ tags: [ "@report", "@client" ] }, () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo(`1. Proceed to the Report > Client page.`);
        _NavigationSection.navigateToClientPage();

        cy.stepInfo(`2. Click on the Edit button for Intended User and Identification of the Client sections.`);
        Report._Client.verifyProgressBarNotExist()
            .Page.formEditBtn().click();
        Report._Client.Page.formEditBtn().click();

        cy.stepInfo(`3. Enter the “=F“ and select the 'Foreclosure sale' option for both sections.`);
        Report._Client.enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue)
            .enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue, 1);

        cy.stepInfo(`4. Verify that the following text appears in both sections.`);
        Report._Client.verifyIntendedUserTextBox(testData.verifyAreaValue)
            .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);
    });
});
