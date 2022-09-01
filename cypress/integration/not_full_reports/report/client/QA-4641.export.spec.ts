import { Property, Report, ReviewExport } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4641.fixture';

describe(`Verify the "Linked" chips dropdown in the new narrative component for As Is and As Stabilized 
        report for Intended User and Identification of the Client sections`,
{ tags:[ "@report", "@client", "@check_export" ] }, () => {

    it("[QA-4641]",  () => {
        cy.stepInfo(`Login, create report`);
        createReport(testData.reportCreationData);

        cy.stepInfo(`Precondition: Set building name`);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterBuildingName(testData.buildingName);

        cy.stepInfo(`1. Proceed to the Report > Client page.`);
        _NavigationSection.navigateToClientPage()
            .verifyProgressBarNotExist();

        cy.stepInfo(`2. Enter the “=“ and verify the "Linked" chips dropdown for Intended User 
                    and Identification of the Client sections: 
                    options 'Gross Building Area', 'Building Name', 'Property Type', 'Residential Unit Count', 
                    'Commercial Unit Count', 'Street Address', 'Street Name', 'Site Area', 'Year Built', 
                    'Block', 'Lot', 'Concluded Cap Rate', 'Zones', 'Condition'.`); 
        Report._Client.activateTextAreaInput( Report._Client.Page.intendedUserTextBox);
        testData.chips.forEach(chip => {
            Report._Client.enterIntendedUser(`=${chip.typeSuggestValue}`, false, false, false)
                .clickNarrativeSuggestions(chip.suggestionName);
            Report._Client.verifyCommentaryContainsText(chip.verifySuggest, testData.intendedUserCommentaryTitle);
        });
        Report._Client.activateTextAreaInput( Report._Client.Page.identificationOfClientTextBox);
        testData.chips.forEach(chip => {
            Report._Client.enterIdentificationOfTheClient(`=${chip.typeSuggestValue}`, false, false, false)
                .clickNarrativeSuggestions(chip.suggestionName, 1);
            Report._Client.verifyCommentaryContainsText(chip.verifySuggest, 
                testData.identificationOfTheClientCommentaryTitle);
        });
        Report._Client.inactivateTextAreaInput();

        cy.stepInfo(`3. Download report`);
        _NavigationSection.openReviewAndExport();
        ReviewExport.selectSectionsToIncludeInExport(testData.sectionToExport)
            .generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
    });

    it(`Check export report`, () => {
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
            .then(file => {
                cy.log(<string>file);
                cy.stepInfo("5. Verify the linked chips on export for both sections:");
                cy.visit(<string>file);

                testData.chips.forEach(item => {
                    cy.contains(testData.identificationOfTheClientSection).next().scrollIntoView()
                        .should("include.text", item.verifyExport);
                    cy.contains(testData.intendedUseSection).next().scrollIntoView()
                        .should("include.text", item.verifyExport);
                });
            });
    });
});