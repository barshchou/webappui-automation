import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import Enums from "../../../../enums/enums";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4633.fixture';

describe(`Verify the Revert to Original button functionality for Intended User 
and Identification of the Client sections`,
{ tags:[ "@report", "@client" ] }, () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("[QA-4633]", () => {
        cy.stepInfo(`1. Click on the Edit button on the Report > Client page for Intended User section.`);
        _NavigationSection.navigateToClientPage();
        Report._Client.verifyProgressBarNotExist()
            .activateTextAreaInput(Report._Client.Page.intendedUserTextBox);

        cy.stepInfo(`2. Verify that the Revert to Original button is displayed, but it's disabled`);
        Report._Client.Page.formRevertToOriginalBtnBySectionName(Enums.PAGES_TEXTBOX_NAMES.intendedUser)
            .should("be.visible").and("be.disabled");

        cy.stepInfo(`3. Edit comment and verify that the Revert to Original button becomes enabled`);
        Report._Client.enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifySuggestion);
        Report._Client.Page.formRevertToOriginalBtnBySectionName(Enums.PAGES_TEXTBOX_NAMES.intendedUser)
            .should("be.enabled");

        cy.stepInfo(`4. Click on the Revert to Original button and verify the 'Changes will be lost modal' 
        is displayed`);
        Report._Client.Page.formRevertToOriginalBtnBySectionName(Enums.PAGES_TEXTBOX_NAMES.intendedUser).click();
        Report._Client.Page.formYesRevertBtn.click();
        Report._Client.verifyFormCommentTextBoxText(Enums.PAGES_TEXTBOX_NAMES.intendedUser, 
            testData.verifyIntendedUserTextArea);
           
        cy.stepInfo(`5. Click on the Edit button on the Report > Client page for 
                     Identification of the Client section.`);
        Report._Client.activateTextAreaInput(Report._Client.Page.identificationOfClientTextBox);

        cy.stepInfo(`6. Verify that the Revert to Original button is displayed, but it's disabled`);
        Report._Client.Page.formRevertToOriginalBtnBySectionName(Enums.PAGES_TEXTBOX_NAMES.identificationOfTheClient)
            .should("be.visible").and("be.disabled");

        cy.stepInfo(`7. Edit comment and verify that the Revert to Original button becomes enabled`);
        Report._Client.enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifySuggestion, 1);
        Report._Client.Page.formRevertToOriginalBtnBySectionName(Enums.PAGES_TEXTBOX_NAMES.identificationOfTheClient)
            .should("be.enabled");

        cy.stepInfo(`8. Click on the Revert to Original button and verify the 'Changes will be lost modal' 
        is displayed`);
        Report._Client.Page.formRevertToOriginalBtnBySectionName(Enums.PAGES_TEXTBOX_NAMES.identificationOfTheClient)
            .click();
        Report._Client.Page.formYesRevertBtn.click();
        Report._Client.verifyFormCommentTextBoxText(Enums.PAGES_TEXTBOX_NAMES.identificationOfTheClient,
            testData.verifyIdentificationOfTheClientTextArea);
    });
});