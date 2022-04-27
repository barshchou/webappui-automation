import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4640.fixture';

describe(`Verify the "Linked" chips dropdown in the new narrative component for As Is and As Stabilized 
    report for Intended User and Identification of the Client sections`, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", {tags: "@to_check_export"}, () => {
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
        testData.suggestions.forEach(el => {
            Report._Client.verifyNarrativeSuggestions(el.suggestionName)
            .Page.IntendedUserTextBox.type("{downarrow}");
        });

        Report._Client.Page.IdentificationOfClientTextBox.click();
        Report._Client.enterIdentificationOfTheClientTextBox(testData.textToType);
        testData.suggestions.forEach(el => {
            Report._Client.verifyNarrativeSuggestions(el.suggestionName, 1)
            .Page.IdentificationOfClientTextBox.type("{downarrow}");
        });

        cy.stepInfo(`4. Verify that each option can be selected for both sections.
            5. Verify that the form displays updated chips values for both sections.`);
        Report._Client.Page.IntendedUserTextBox.click();
        testData.suggestions.forEach(el => {
            Report._Client.enterIntendedUserTextBox(`=${el.typeSuggestValue}`)
            .clickNarrativeSuggestions(el.suggestionName)
            .verifyIntendedUserTextBox(el.verifySuggest);
        });

        Report._Client.Page.IdentificationOfClientTextBox.click();
        testData.suggestions.forEach(el => {
            Report._Client.enterIdentificationOfTheClientTextBox(`=${el.typeSuggestValue}`)
            .clickNarrativeSuggestions(el.suggestionName, 1)
            .verifyIdentificationOfTheClientTextBox(el.verifySuggest);

        });

        cy.stepInfo("6. Verify the linked chips on export for both sections:");
        // TODO: Add export verify
        // Proceed to the Sales Comparison Approach > Value Opinion via the Sales Comparison Approach and verify the value.
        
        deleteReport(testData.reportCreationData.reportNumber);
    });
});