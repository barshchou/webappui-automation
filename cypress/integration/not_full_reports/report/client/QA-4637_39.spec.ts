import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4637_39.fixture';

describe(`Verify the Modified label functionality for Intended User and Identification of the Client sections`,
    { tags:[ "@report", "@client" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        testData.data.forEach(data => {
            it(`${data.specName}`, () => {
                cy.stepInfo(`1. Proceed to the Report > Client page.`);
                _NavigationSection.navigateToClientPage()
                    .verifyProgressBarNotExist();
    
                cy.stepInfo(`2. Enter the ${data.textToType} and select the ${data.verifySuggestion} option`);
                Report._Client.enterFormCommentTextBox(testData.intendedUser, data.textToType, false)
                    .clickNarrativeSuggestions(data.verifySuggestion);
                   
                cy.stepInfo(`3. Verify that the following text appears for both sections.`);
                Report._Client.verifyFormCommentTextBoxText(testData.intendedUser, 
                    data.verifyTextArea);
    
                cy.stepInfo(`4. Enter the ${data.textToType} and select the ${data.verifySuggestion} option`);
                Report._Client.enterFormCommentTextBox(testData.identificationOfTheClient, data.textToType, false)
                    .clickNarrativeSuggestions(data.verifySuggestion, 1);
                   
                cy.stepInfo(`5. Verify that the following text appears for both sections.`);
                Report._Client.verifyFormCommentTextBoxText(testData.identificationOfTheClient,
                    data.verifyTextArea);
            });
        });
    });