import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4648.fixture';

describe("[QA-4648] Verify the Save button functionality on the Report > Client page", 
    { tags:[ "@report", "@client" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. The Save button is displayed on the Client page.`);
            _NavigationSection.navigateToClientPage();
            Report._Client.verifyProgressBarNotExist()
                .Page.formSaveBtn().should('be.visible');

            cy.stepInfo(`2. Fill in the editable fields with values and click on the Save button.`);
            Report._Client.activateTextAreaInput(Report._Client.Page.intendedUserTextBox)
                .enterIntendedUserTextBox(testData.textToType)
                .clickNarrativeSuggestions(testData.verifyListValue)
                .activateTextAreaInput(Report._Client.Page.identificationOfClientTextBox)
                .enterIdentificationOfTheClientTextBox(testData.textToType)
                .clickNarrativeSuggestions(testData.verifyListValue, 1)
                .inactivateTextAreaInput()
                .verifyIntendedUserTextBox(testData.verifyAreaValue)
                .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);
            //Saving without cy.wait() impossible, because cypress interaction with buttons is to fast
            cy.wait(500);           

            cy.stepInfo(`3. Refresh the page / or re-enter the page and verify that 
                         the changes from step 2 are still applied.`);
            Report._Client.clickSaveButton()
                .verifyProgressBarNotExist();
            cy.reload();
            Report._Client.verifyIntendedUserTextBox(testData.verifyAreaValue)
                .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);
        });
    });