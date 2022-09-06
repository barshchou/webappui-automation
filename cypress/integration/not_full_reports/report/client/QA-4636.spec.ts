import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4636.fixture';

describe(`Verify the Modified label functionality for Intended User and Identification of the Client sections`,
    { tags:[ "@report", "@client" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Activate text field on the Report > Client page for Intended User 
            section.`);
            _NavigationSection.navigateToClientPage();
            Report._Client.verifyProgressBarNotExist()
                .activateTextAreaInput(Report._Client.Page.formCommentTextBox(testData.intendedUser));

            cy.stepInfo(`2. Edit Intended User comment and verify modified label visible`);
            Report._Client.enterIntendedUserTextBox(testData.textToType)
                .clickNarrativeSuggestions(testData.verifySuggestion)
                .Page.modifiedLabel(true, 0).should("be.visible");
               
            cy.stepInfo(`3. Revert commentary and verify label not exist`);
            Report._Client.revertToOriginalCommentarySectionByName(testData.intendedUser)
                .Page.modifiedLabel(false).should("not.exist");

            cy.stepInfo(`4. Activate text field on the Report > Client page for Identification of the Client section`);
            Report._Client.verifyProgressBarNotExist()
                .activateTextAreaInput(Report._Client.Page.formCommentTextBox(testData.identificationOfTheClient));

            cy.stepInfo(`5. Edit Identification Of The Client comment and verify modified label visible`);
            Report._Client.enterIdentificationOfTheClientTextBox(testData.textToType)
                .clickNarrativeSuggestions(testData.verifySuggestion, 1);
               
            cy.stepInfo(`6. Verify that the Modified label appears after saving changes made to commentary`);
            Report._Client.Page.modifiedLabel(true, 0).should("be.visible");
            Report._Client.revertToOriginalCommentarySectionByName(testData.identificationOfTheClient)
                .Page.modifiedLabel(false).should("not.exist");
        });
    });