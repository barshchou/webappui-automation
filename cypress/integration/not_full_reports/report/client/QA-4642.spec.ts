import { Report, ReviewExport } from './../../../../actions/index';
import testData from "../../../../fixtures/not_full_reports/report/client/QA-4642.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from '../../../../actions/base';

describe("Verify the Client Guidelines Discussion on the page", () => {
    it("[QA-4642]", { tags: [ "@report", "@client", "@check_export" ] }, () => {
        cy.stepInfo("1. Proceed to the Report > Client page");
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToClientPage().verifyProgressBarNotExist();

        cy.stepInfo("2. Click on the Edit button for Intended User and Identification of the Client sections");
        Report._Client.Page.formEditBtn().click();
        Report._Client.Page.formEditBtn().click();

        cy.stepInfo(`3. Enter the “=“ and verify the "Linked" chips dropdown for both sections: options 'Gross Building Area', 'Building Name', 'Property Type', 
            'Current Residential Unit Count', 'As Complete Residential Unit Count', 'Current Commercial Unit Count', 'As Complete Commercial Unit Count', 'Street Address', 
            'Street Name', 'Site Area', 'Year Built', 'Block', 'Lot', 'Concluded Cap Rate', 'Zones', 'CurrentCondition', 'As Stabilized Condition'`);
        testData.chips.forEach(chip => {
            Report._Client.enterIntendedUserTextBox(`=${chip.typeSuggestValue}`)
                .clickNarrativeSuggestions(chip.suggestionName)
                .verifyIntendedUserTextBox(chip.verifySuggest);

            Report._Client.enterIdentificationOfTheClientTextBox(`=${chip.typeSuggestValue}`)
                .clickNarrativeSuggestions(chip.suggestionName, 1)
                .verifyIdentificationOfTheClientTextBox(chip.verifySuggest);
        });

        cy.stepInfo("4. Download report");
        _NavigationSection.openReviewAndExport(true);
        ReviewExport.generateDocxReport().waitForReportGenerated()
        .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Check export", () => {
        cy.task("getFilePath", { _reportName: `Bowery Appraisal_${testData.reportCreationData.reportNumber}`, _docx_html: "html" }).then(file => {
            cy.log(<string>file);
            cy.stepInfo("5. Verify the linked chips on export for both sections");
            cy.visit(<string>file);

            testData.chips.forEach(item => {
                cy.contains("Identification of the Client").next().scrollIntoView().should("include.text", item.verifyExport);
                cy.contains("Intended Use & User").next().scrollIntoView().should("include.text", item.verifyExport);
            });
        }); 
    });
});