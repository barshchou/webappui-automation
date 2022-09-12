import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4635.fixture';

describe(`Verify the Save button functionality for Intended User and Identification of the Client sections.`, 
    { tags: [ "@report", "@client" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Activate text field on the Report > Client page for Intended User section.`);
            _NavigationSection.navigateToClientPage();
            Report._Client.verifyProgressBarNotExist()
                .activateTextAreaInput(Report._Client.Page.intendedUserTextBox);

            cy.stepInfo(`2. Edit comment and click on the Save button`);
            Report._Client.enterIntendedUserTextBox(testData.textToType)
                .clickNarrativeSuggestions(testData.verifyListValue)
                .clickSaveButton();
            
            cy.stepInfo(`3. Verify that the changes from step 2 are saved.`);
            Report._Client.verifyProgressBarNotExist()
                .verifyIntendedUserTextBox(testData.verifyAreaValue);
               
            cy.stepInfo(`4. Activate text field on the Report > Client page for 
                         Identification of the Client section.`);
            Report._Client.activateTextAreaInput(Report._Client.Page.identificationOfClientTextBox);

            cy.stepInfo(`5. Edit comment and click on the Save button`);
            Report._Client.enterIdentificationOfTheClientTextBox(testData.textToType)
                .clickNarrativeSuggestions(testData.verifyListValue, 1)
                .clickSaveButton();

            cy.stepInfo(`6. Verify that the changes from step 2 are saved.`);
            Report._Client.verifyProgressBarNotExist()
                .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);
        });
    });
