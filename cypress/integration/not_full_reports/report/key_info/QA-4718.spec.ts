import { Property, ReviewExport } from '../../../../actions';
import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/key_info/QA-4718.fixture';

describe(`[QA-4718] Verify the "Linked" chips dropdown in the new narrative component for 
Property Rights Appraised and Definition of Market Value sections`,
{ tags:[ "@report", "@key_info", "@check_export" ] }, () => {
    it("Test body", () => {
        cy.stepInfo("Login, create report");
        createReport(testData.reportCreationData);

        cy.stepInfo(`Precondition: Set building name`);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterBuildingName(testData.buildingName);

        cy.stepInfo(`1. Proceed to the Report > Key Info page.`);
        _NavigationSection.navigateToReportInformation();

        cy.stepInfo(`2.Enter the “=“ and verify the "Linked" chips dropdown for both sections: 
        options 'Gross Building Area', 'Building Name', 'Property Type', 'Residential Unit Count', 
        'Commercial Unit Count', 'Street Address', 'Street Name', 'Site Area', 'Year Built', 
        'Block', 'Lot', 'Concluded Cap Rate', 'Zones', 'Condition'.`);
        Report._KeyInfo.Page.formEditBtn().click();
        Report._KeyInfo.Page.formEditBtn().click();
        testData.chips.forEach(chip => {
            Report._KeyInfo.enterPropertyRightsAppraisedComment(`=${chip.typeSuggestValue}`, false, false, false);
            Report._KeyInfo.clickNarrativeSuggestions(chip.suggestionName);
            Report._KeyInfo.verifyCommentaryContainsText(chip.verifySuggest, 
                testData.propertyRightsAppraisedCommentaryTitle);
            Report._KeyInfo.enterDefinitionMarketValue(`=${chip.typeSuggestValue}`, false, false, false);
            Report._KeyInfo.clickNarrativeSuggestions(chip.suggestionName, 1);
            Report._KeyInfo.verifyCommentaryContainsText(chip.verifySuggest, 
                testData.definitionOfMarketValueCommentaryTitle);
        });
        Report._KeyInfo.Page.formSaveBtn().click();
        Report._KeyInfo.Page.formSaveBtn(1).click();

        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
    });
    
    it("Check export", () => {
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
            .then(file => {
                cy.log(<string>file);
                cy.stepInfo(`3. Verify the linked chips on export for both sections`);
                cy.visit(<string>file);
                testData.chips.forEach(chip => {
                    cy.contains("Property Rights Appraised").next().scrollIntoView()
                        .should("include.text", chip.verifyExport);
                    cy.contains("Definition of Market Value").next().next().scrollIntoView()
                        .should("include.text", chip.verifySuggest);
                });
            }); 
    });
});

    