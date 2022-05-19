import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4635.fixture';
import { Tag } from "../../../../utils/tags.utils";

describe("Verify the Save button functionality for Intended User and Identification of the Client sections.", 
    { tags: [ Tag.report, Tag.client ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Click on the Edit button on the Report > Client page for Intended User and Identification of the Client sections.");
        _NavigationSection.navigateToClientPage();

        Report._Client.verifyProgressBarNotExist()
            .Page.formEditBtn(0).click();
        Report._Client.Page.formEditBtn(0).click();

        cy.stepInfo("2. Edit comment and click on the Save button for both sections.");
        Report._Client.enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue)
            .enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue, 1)
            .Page.formSaveBtn(0).click();
        Report._Client.Page.formSaveBtn(0).click();
            
        cy.stepInfo("3. Verify that the changes from step 2 are saved.");
        Report._Client.verifyIntendedUserTextBox(testData.verifyAreaValue)
            .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});
