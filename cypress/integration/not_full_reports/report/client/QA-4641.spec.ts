import { Report, ReviewExport } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4641.fixture';

describe(`[QA-4641] Verify the "Linked" chips dropdown in the new narrative component for As Is and As Stabilized 
    report for Intended User and Identification of the Client sections`,
    { tags:[ "@report", "@client" ] }, () => {

    it("Test body", { tags: "@check_export" }, () => {
        cy.stepInfo("Login, create report");
        createReport(testData.reportCreationData);

        cy.stepInfo("1. Proceed to the Report > Client page.");
        _NavigationSection.navigateToClientPage()
            .verifyProgressBarNotExist();

        cy.stepInfo("2. Click on the Edit button for Intended User and Identification of the Client sections.");
        Report._Client.Page.formEditBtn().click();
        Report._Client.Page.formEditBtn().click();

        cy.stepInfo(`3. Enter the “=“ and verify the "Linked" chips dropdown for both sections: options 'Gross Building Area', 
            'Building Name', 'Property Type', 'Residential Unit Count', 'Commercial Unit Count', 'Street Address', 'Street Name', 
            'Site Area', 'Year Built', 'Block', 'Lot', 'Concluded Cap Rate', 'Zones', 'Condition'.`); 
        testData.chips.forEach(chip => {
            Report._Client.enterIntendedUser(`=${chip.typeSuggestValue}`, false, false, false)
                .clickNarrativeSuggestions(chip.suggestionName);
            Report._Client.Page.intendedUserTextBox.should("include.text", chip.verifySuggest);
            Report._Client.enterIdentificationOfTheClient(`=${chip.typeSuggestValue}`, false, false, false)
                .clickNarrativeSuggestions(chip.suggestionName, 1);
            Report._Client.Page.identificationOfClientTextBox.should("include.text", chip.verifySuggest);
        });

        cy.stepInfo("4. Download report");
        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Verify export report", () => {
        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docx_html: "html" }).then(file => {
            cy.log(<string>file);
            cy.stepInfo("5. Verify the linked chips on export for both sections:");
            cy.visit(<string>file);

            testData.chips.forEach(item => {
                cy.contains("Identification of the Client").next().scrollIntoView().should("include.text", item.verifyExport);
                cy.contains("Intended Use & User").next().scrollIntoView().should("include.text", item.verifyExport);
            });
        });
    });
});