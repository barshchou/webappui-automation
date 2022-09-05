import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import Enums from "../../../../enums/enums";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4634.fixture';

describe(`Verify the 'Changes will be lost' modal functionality for Intended User 
and Identification of the Client sections`, 
{ tags: [ "@report", "@client" ] }, () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("[QA-4634]", () => {
        cy.stepInfo(`1. Activate text field on the Report > Client page for Intended User 
        section.`);
        _NavigationSection.navigateToClientPage();

        Report._Client.verifyProgressBarNotExist()
            .activateTextAreaInput(Report._Client.Page.intendedUserTextBox);

        cy.stepInfo(`2. Edit comment and click on the Revert to Original button.`);
        Report._Client.enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue);

        cy.stepInfo(`3. Verify the 'Changes will be lost modal' is displayed.`);
        Report._Client.Page.formRevertToOriginalBtn().click();
        Report._Client.Page.modalWindow.should('be.visible');
        Report._Client.Page.formYesRevertBtn.click();

        cy.stepInfo(`4. Click on the Revert to Original button again.`);
        Report._Client.activateTextAreaInput(Report._Client.Page.intendedUserTextBox)
            .enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue)
            .Page.formRevertToOriginalBtn().click();

        cy.stepInfo(`5. Click on the X icon and verify that the modal is closed and no changes are applied.`);
        Report._Client.clickCloseIcon()
            .verifyFormCommentTextBoxText(Enums.PAGES_TEXTBOX_NAMES.intendedUser, testData.verifyAreaValue);

        cy.stepInfo(`6. Click on the Revert to Original button again.`);
        Report._Client.activateTextAreaInput(Report._Client.Page.intendedUserTextBox)
            .enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue)
            .Page.formRevertToOriginalBtn().click();
        Report._Client.clickCloseIcon();

        cy.stepInfo(`7. Click on the Cancel button in the modal and verify that 
        the modal is closed and no changes are applied.`);
        Report._Client.verifyFormCommentTextBoxText(Enums.PAGES_TEXTBOX_NAMES.intendedUser, testData.verifyAreaValue);
            
        cy.stepInfo(`8. Click on the Revert to Original button again.`);
        Report._Client.activateTextAreaInput(Report._Client.Page.intendedUserTextBox)
            .enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue)
            .Page.formRevertToOriginalBtn().click();
        Report._Client.Page.formYesRevertBtn.click();

        cy.stepInfo(`9.Click on the 'Yes, revert' button in the modal and verify that the modal is closed and all 
            custom changes made to the Current Commercial Income Discussion are deleted.`);
        Report._Client.verifyFormCommentTextBoxText(Enums.PAGES_TEXTBOX_NAMES.intendedUser, 
            testData.verifyAreaValue, testData.matcher);

        cy.stepInfo(`10. Activate text field on the Report > Client page for Identification of the Client section`);
        Report._Client.activateTextAreaInput(Report._Client.Page.identificationOfClientTextBox);

        cy.stepInfo(`11. Edit comment and click on the Revert to Original button.`);
        Report._Client.enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue, 1);

        cy.stepInfo(`12. Verify the 'Changes will be lost modal' is displayed.`);
        Report._Client.Page.formRevertToOriginalBtn(1).click();
        Report._Client.Page.modalWindow.should('be.visible');
        Report._Client.Page.formYesRevertBtn.click();

        cy.stepInfo(`13. Click on the Revert to Original button again.`);
        Report._Client.activateTextAreaInput(Report._Client.Page.identificationOfClientTextBox)
            .enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue, 1)
            .Page.formRevertToOriginalBtn(1).click();

        cy.stepInfo(`14. Click on the X icon and verify that the modal is closed and no changes are applied.`);
        Report._Client.clickCloseIcon()
            .verifyFormCommentTextBoxText(Enums.PAGES_TEXTBOX_NAMES.identificationOfTheClient,
                testData.verifyAreaValue);

        cy.stepInfo(`15. Click on the Revert to Original button again.`);
        Report._Client.activateTextAreaInput(Report._Client.Page.identificationOfClientTextBox)
            .enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue, 1)
            .Page.formRevertToOriginalBtn(1).click();
        Report._Client.clickCloseIcon();

        cy.stepInfo(`16. Click on the Cancel button in the modal and verify that 
        the modal is closed and no changes are applied.`);
        Report._Client.verifyFormCommentTextBoxText(Enums.PAGES_TEXTBOX_NAMES.identificationOfTheClient,
            testData.verifyAreaValue);
            
        cy.stepInfo(`17. Click on the Revert to Original button again.`);
        Report._Client.activateTextAreaInput(Report._Client.Page.identificationOfClientTextBox)
            .enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue, 1)
            .Page.formRevertToOriginalBtn(1).click();
        Report._Client.Page.formYesRevertBtn.click();

        cy.stepInfo(`18.Click on the 'Yes, revert' button in the modal and verify that the modal is closed and all 
            custom changes made to the Current Commercial Income Discussion are deleted.`);
        Report._Client.verifyFormCommentTextBoxText(Enums.PAGES_TEXTBOX_NAMES.identificationOfTheClient,
            testData.verifyAreaValue, testData.matcher);
    });
});
