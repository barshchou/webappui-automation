import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4633.fixture';

describe(`Verify the Revert to Original button functionality for Intended User 
and Identification of the Client sections`,
{ tags:[ "@report", "@client" ] }, () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo(`1. Click on the Edit button on the Report > Client page for Intended User section.`);
        _NavigationSection.navigateToClientPage();
        Report._Client.verifyProgressBarNotExist()
            .activateTextAreaInput(Report._Client.Page.intendedUserTextBox);

        cy.stepInfo(`2. Verify that the Revert to Original button is displayed`);
        Report._Client.Page.formRevertToOriginalBtn().should("be.visible");

        cy.stepInfo(`3. Edit comment and verify that the Revert to Original button becomes enabled`);
        Report._Client.enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifySuggestion);
        Report._Client.Page.formRevertToOriginalBtn().should("be.enabled");

        cy.stepInfo(`4. Click on the Revert to Original button and verify the 'Changes will be lost modal' 
        is displayed`);
        Report._Client.Page.formRevertToOriginalBtn().click();
        Report._Client.Page.formYesRevertBtn.click();
        Report._Client.verifyIntendedUserTextBox(testData.verifyIntendedUserTextArea);
           
        cy.stepInfo(`5. Click on the Edit button on the Report > Client page for 
                     Identification of the Client section.`);
        Report._Client.activateTextAreaInput(Report._Client.Page.identificationOfClientTextBox);

        cy.stepInfo(`6. Verify that the Revert to Original button is displayed`);
        Report._Client.Page.formRevertToOriginalBtn(1).should("be.visible");

        cy.stepInfo(`7. Edit comment and verify that the Revert to Original button becomes enabled`);
        Report._Client.enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifySuggestion, 1);
        Report._Client.Page.formRevertToOriginalBtn(1).should("be.enabled");

        cy.stepInfo(`8. Click on the Revert to Original button and verify the 'Changes will be lost modal' 
        is displayed`);
        Report._Client.Page.formRevertToOriginalBtn(1).click();
        Report._Client.Page.formYesRevertBtn.click();
        Report._Client.verifyIdentificationOfTheClientTextBox(testData.verifyIdentificationOfTheClientTextArea);  
    });
});