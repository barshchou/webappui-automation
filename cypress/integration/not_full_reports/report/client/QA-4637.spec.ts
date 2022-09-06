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

        cy.stepInfo(`2. Activate text area for Intended User section.`);
        Report._Client.verifyProgressBarNotExist()
            .activateTextAreaInput( Report._Client.Page.formCommentTextBox(testData.intendedUser));

        cy.stepInfo(`3. Enter the “=F“ and select the 'Foreclosure sale' option`);
        Report._Client.enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue);

        cy.stepInfo(`4. Verify that the following text appears`);
        Report._Client.verifyFormCommentTextBoxText(testData.intendedUser, testData.verifyAreaValue);
            
        cy.stepInfo(`5. Activate text area for Identification of the Client section.`);
        Report._Client.activateTextAreaInput( Report._Client.Page
            .formCommentTextBox(testData.identificationOfTheClient));

        cy.stepInfo(`6. Enter the “=F“ and select the 'Foreclosure sale' option`);
        Report._Client.enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue, 1);

        cy.stepInfo(`7. Verify that the following text appears`);
        Report._Client.verifyFormCommentTextBoxText(testData.identificationOfTheClient,
            testData.verifyAreaValue);
    });
});
