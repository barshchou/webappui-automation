import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4635.fixture';

describe("Verify the display of the Client page.", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Proceed to the Report > Client page.");
        _NavigationSection.navigateToClientPage();

        // Report._Client.verifyProgressBarNotExist()
        //     .Page.formEditBtn(0).click();
        //     Report._Client.Page.formEditBtn(0).click();

        cy.stepInfo(`2. Verify the following elements are displayed on the page:
            Title of the page - Client
            Warning message: “Add new clients on the Organization Settings page.“
            Client field - “Search Clients“ placeholder
            Client File Number field
            NYCB Application No. (Optional)
            Intended User section with the Edit button
            Identification of the Client section with the Edit button
            Client Guidelines Discussion section`);
        // Report._Client.enterIntendedUserTextBox(testData.textToType)
        //     .clickNarrativeSuggestions(testData.verifyListValue)
        //     .enterIdentificationOfTheClientTextBox(testData.textToType)
        //     .clickNarrativeSuggestions(testData.verifyListValue, 1)
        //     .Page.formSaveBtn(0).click();
        //     Report._Client.Page.formSaveBtn(0).click();
            
        // cy.stepInfo("3. Verify that the changes from step 2 are saved.");
        // Report._Client.verifyIntendedUserTextBox(testData.verifyAreaValue)
        //     .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});