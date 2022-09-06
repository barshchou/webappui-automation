import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4639.fixture';

describe(`Verify the Modified label functionality for Intended User and Identification of the Client sections`,
    { tags:[ "@report", "@client" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Proceed to the Report > Client page.`);
            _NavigationSection.navigateToClientPage()
                .verifyProgressBarNotExist();
        
            cy.stepInfo(`2. Activate text area for Intended User section.`);
            Report._Client.verifyProgressBarNotExist()
                .activateTextAreaInput( Report._Client.Page.formCommentTextBox(testData.intendedUser));

            cy.stepInfo(`3.Enter the “=Un“ and select the 'Unchanged Renovation' option `);
            Report._Client.enterIntendedUserTextBox(testData.textToType)
                .clickNarrativeSuggestions(testData.verifySuggestion);
               
            cy.stepInfo(`4. Verify that the following text appears for both sections.`);
            Report._Client.verifyFormCommentTextBoxText(testData.intendedUser, 
                testData.verifyTextArea);
 
            cy.stepInfo(`5. Activate text area for Identification of the Client section.`);
            Report._Client.activateTextAreaInput( Report._Client.Page
                .formCommentTextBox(testData.identificationOfTheClient));

            cy.stepInfo(`6.Enter the “=Un“ and select the 'Unchanged Renovation' option `);
            Report._Client.enterIdentificationOfTheClientTextBox(testData.textToType)
                .clickNarrativeSuggestions(testData.verifySuggestion, 1);
               
            cy.stepInfo(`7. Verify that the following text appears for both sections.`);
            Report._Client.verifyFormCommentTextBoxText(testData.identificationOfTheClient,
                testData.verifyTextArea);
               
        });
    });