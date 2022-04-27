import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4641.fixture';

describe(`Verify the "Linked" chips dropdown in the new narrative component for As Is and As Stabilized 
    report for Intended User and Identification of the Client sections`, () => {
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

        cy.stepInfo(`3. Enter the “=“ and verify the "Linked" chips dropdown for both sections: options 'Gross Building Area', 
            'Building Name', 'Property Type', 'Residential Unit Count', 'Commercial Unit Count', 'Street Address', 'Street Name', 
            'Site Area', 'Year Built', 'Block', 'Lot', 'Concluded Cap Rate', 'Zones', 'Condition'.`);
        Report._Client.enterIntendedUserTextBox(testData.textToType);
        testData.verifyListValues.forEach(el => {
            Report._Client.verifyNarrativeSuggestions(el)
            .Page.IntendedUserTextBox.type("{downarrow}");
        });

        Report._Client.Page.IdentificationOfClientTextBox.click();
        Report._Client.enterIdentificationOfTheClientTextBox(testData.textToType);
        testData.verifyListValues.forEach(el => {
            Report._Client.verifyNarrativeSuggestions(el, 1)
            .Page.IdentificationOfClientTextBox.type("{downarrow}");
        });

        cy.stepInfo("4. Verify that each option can be selected for both sections.");
        Report._Client.Page.IntendedUserTextBox.click();
        testData.typeListValues.forEach(el => {
            Report._Client.enterIntendedUserTextBox(`=${el}`)
            .clickNarrativeSuggestions(el);
        });

        Report._Client.Page.IdentificationOfClientTextBox.click();
        testData.typeListValues.forEach(el => {
            Report._Client.enterIdentificationOfTheClientTextBox(`=${el}`)
            .clickNarrativeSuggestions(el, 1);
        });

        // cy.stepInfo("5. Verify that the form displays updated chips values for both sections.");
        // cy.stepInfo("6. Verify the linked chips on export for both sections:");
        
        // deleteReport(testData.reportCreationData.reportNumber);
    });
});