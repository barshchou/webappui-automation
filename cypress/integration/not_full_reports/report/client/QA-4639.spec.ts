import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4639.fixture';
import { Tag } from "../../../../utils/tags.utils";

describe(`Verify the Modified label functionality for Intended User and Identification of the Client sections`, { tags:[ Tag.report, Tag.client, "test_client" ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Proceed to the Report > Client page.");
        _NavigationSection.navigateToClientPage()
            .verifyProgressBarNotExist();
        
        cy.stepInfo("2. Click on the Edit button for Intended User and Identification of the Client sections.");
        Report._Client.Page.formEditBtn(0).click();
        Report._Client.Page.formEditBtn(0).click();

        cy.stepInfo("3.Enter the “=Un“ and select the 'Unchanged Renovation' option for both sections.");
        Report._Client.enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifySuggestion)
            .enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifySuggestion, 1);
       

        cy.stepInfo("4. Verify that the following text appears for both sections.");
        Report._Client.verifyIntendedUserTextBox(testData.verifyTextArea)
            .verifyIdentificationOfTheClientTextBox(testData.verifyTextArea);

         deleteReport(testData.reportCreationData.reportNumber);
    });
});