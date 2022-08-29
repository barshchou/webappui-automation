import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4635.fixture';

describe(`Verify the Save button functionality for Identification of the Client sections.`, 
    { tags: [ "@report", "@client" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Activate text field on the Report > Client page for Intended User section`);
            _NavigationSection.navigateToClientPage();
            Report._Client.verifyProgressBarNotExist()
                .activateTextAreaInput(Report._Client.Page.identificationOfClientTextBox);

            cy.stepInfo(`2. Edit comment, inactivate text area and verify text save`);
            Report._Client.enterIdentificationOfTheClientTextBox(testData.textToType)
                .clickNarrativeSuggestions(testData.verifyListValue, 1)
                .inactivateTextAreaInput()
                .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);
            
            cy.stepInfo(`3. Refresh the page and Verify the changes from previous step disappear`);
            cy.reload();
            Report._Client.verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue, false);

            cy.stepInfo(`4. Edit comment, inactivate text area and verify text save`);
            Report._Client.activateTextAreaInput(Report._Client.Page.identificationOfClientTextBox)
                .enterIdentificationOfTheClientTextBox(testData.textToType)
                .clickNarrativeSuggestions(testData.verifyListValue, 1)
                .inactivateTextAreaInput()
                .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);

            cy.stepInfo(`5. Click save button, refresh page and Verify text save`);
            Report._Client.clickSaveButton()
                .verifyProgressBarNotExist();
            cy.reload();
            Report._Client.verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);

            cy.stepInfo(`6. Revert previous changes`);
            Report._Client.activateTextAreaInput(Report._Client.Page.identificationOfClientTextBox)
                .Page.formRevertToOriginalBtn(1).click();
            Report._Client.Page.formYesRevertBtn.click();
            Report._Client.clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo(`7. Edit comment, inactivate text area and verify text save`);
            Report._Client.activateTextAreaInput(Report._Client.Page.identificationOfClientTextBox)
                .enterIdentificationOfTheClientTextBox(testData.textToType)
                .clickNarrativeSuggestions(testData.verifyListValue, 1)
                .inactivateTextAreaInput()
                .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);
            
            cy.stepInfo(`8. Refresh the page and Verify the changes from previous step disappear`);
            cy.reload();
            Report._Client.verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue, false);

            cy.stepInfo(`9. Edit comment, inactivate text area and verify text save`);
            Report._Client.activateTextAreaInput(Report._Client.Page.identificationOfClientTextBox)
                .enterIdentificationOfTheClientTextBox(testData.textToType)
                .clickNarrativeSuggestions(testData.verifyListValue, 1)
                .inactivateTextAreaInput()
                .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);

            cy.stepInfo(`10. Click save and continue button, return to previous page and Verify text save`);
            Report._Client.clickSaveContinueButton();
            _NavigationSection.navigateToClientPage();
            Report._Client.verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);

            cy.stepInfo(`11. Revert previous changes`);
            Report._Client.activateTextAreaInput(Report._Client.Page.identificationOfClientTextBox)
                .Page.formRevertToOriginalBtn(1).click();
            Report._Client.Page.formYesRevertBtn.click();
            Report._Client.clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo(`12. Edit comment, inactivate text area and verify text save`);
            Report._Client.activateTextAreaInput(Report._Client.Page.identificationOfClientTextBox)
                .enterIdentificationOfTheClientTextBox(testData.textToType)
                .clickNarrativeSuggestions(testData.verifyListValue, 1)
                .inactivateTextAreaInput()
                .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);
            
            cy.stepInfo(`13. Refresh the page and Verify the changes from previous step disappear`);
            cy.reload();
            Report._Client.verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue, false);

            cy.stepInfo(`14. Edit comment, inactivate text area and verify text save`);
            Report._Client.activateTextAreaInput(Report._Client.Page.identificationOfClientTextBox)
                .enterIdentificationOfTheClientTextBox(testData.textToType)
                .clickNarrativeSuggestions(testData.verifyListValue, 1)
                .inactivateTextAreaInput()
                .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);

            cy.stepInfo(`15. Navigate to another page and save changes, return to previous page and Verify text save`);
            _NavigationSection.navigateToPropertySummary()
                .navigateToClientPage();
            Report._Client.verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);
        });
    });
