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
            cy.stepInfo(`1. Click on the Edit button on the Report > Client page for Intended User 
            and Identification of the Client sections.`);
            _NavigationSection.navigateToClientPage();
            Report._Client.verifyProgressBarNotExist()
                .Page.formEditBtn().click();
            Report._Client.Page.formEditBtn().click();

            cy.stepInfo(`2. Edit comment and click on the Save button for both sections.`);
            Report._Client.enterIntendedUserTextBox(testData.textToType)
                .clickNarrativeSuggestions(testData.verifySuggestion)
                .enterIdentificationOfTheClientTextBox(testData.textToType)
                .clickNarrativeSuggestions(testData.verifySuggestion, 1)
                .Page.formSaveBtn().click();

            cy.stepInfo(`3. Verify that the Modified label appears after saving changes made to commentary.`);
            Report._Client.Page.chipModified(0).should("be.visible");
            Report._Client.Page.chipModified(1).should("be.visible");

        });
    });