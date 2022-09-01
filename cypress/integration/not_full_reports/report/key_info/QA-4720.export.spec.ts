import { Property, ReviewExport } from '../../../../actions';
import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/key_info/QA-4720.fixture';

describe(`Verify the "Linked" chips dropdown in the new narrative component for 
ACAS reports for Property Rights Appraised and Definition 
    of Market Value sections`, { tags:[ "@report", "@key_info", "@check_export" ] }, () => {
    it("[QA-4720]", () => {
        cy.stepInfo("Login, create report");
        createReport(testData.reportCreationData);

        cy.stepInfo("Precondition: Set building name");
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterBuildingName(testData.buildingName);

        cy.stepInfo("1. Proceed to the Report > Key Info page.");
        _NavigationSection.navigateToReportKeyInfo();

        cy.stepInfo(`2.Enter the “=“ and verify the "Linked" chips dropdown for both sections: 
        options 'Gross Building Area', 'Building Name', 'Property Type', 'Residential Unit Count', 
        'Commercial Unit Count', 'Street Address', 'Street Name', 'Site Area', 'Year Built', 'Block', 
        'Lot', 'Concluded Cap Rate', 'Zones', 'Condition'.`);
        testData.chips.forEach(chip => {
            Report._KeyInfo.enterFormCommentTextBox(testData.propertyRightsAppraisedTitle,
                `=${chip.typeSuggestValue}`, false)
                .clickNarrativeSuggestions(chip.suggestionName)
                .verifyFormCommentTextBoxText(testData.propertyRightsAppraisedTitle, chip.verifySuggest);
        });
        testData.chips.forEach(chip => {
            Report._KeyInfo.enterFormCommentTextBox(testData.definitionOfMarketValueTitle,
                `=${chip.typeSuggestValue}`, false)
                .clickNarrativeSuggestions(chip.suggestionName, 2)
                .verifyFormCommentTextBoxText(testData.definitionOfMarketValueTitle, chip.verifySuggest);
        });
        Report._KeyInfo.inactivateTextAreaInput()
            .clickSaveButton();

        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
    });
    
    it("Check export", () => {
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
            .then(file => {
                cy.log(<string>file);
                cy.stepInfo("3. Verify the linked chips on export for both sections");
                cy.visit(<string>file);
                testData.chips.forEach(chip => {
                    cy.contains(testData.propertyRightsSection).next().scrollIntoView()
                        .should("include.text", chip.verifyExport);
                    cy.contains(testData.definitionOfMarketValueSection).next().next().scrollIntoView()
                        .should("include.text", chip.verifySuggest);
                });
            }); 
    });
});

    