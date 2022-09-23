import { DataCollections, ReviewExport } from '../../../../actions';
import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/key_info/QA-4718.fixture';

describe(`Verify the "Linked" chips dropdown in the new narrative component for 
        Property Rights Appraised and Definition of Market Value sections`,
{ tags:[ "@report", "@key_info", "@check_export" ] }, () => {
    it("[QA-4718]", () => {
        cy.stepInfo("Login, create report");
        createReport(testData.reportCreationData);

        cy.stepInfo(`Precondition: Set building name`);
        _NavigationSection.navigateToSubjectPropertyData();
        DataCollections._SubjectPropertyData.enterBuildingName(testData.buildingName);

        cy.stepInfo(`1. Proceed to the Report > Key Info page.`);
        _NavigationSection.navigateToReportKeyInfo();

        cy.stepInfo(`2.Enter the “=“ and verify the "Linked" chips dropdown for for 
        Property Rights Appraised and Definition of Market Value sections sections: 
        options 'Gross Building Area', 'Building Name', 'Property Type', 'Residential Unit Count', 
        'Commercial Unit Count', 'Street Address', 'Street Name', 'Site Area', 'Year Built', 
        'Block', 'Lot', 'Concluded Cap Rate', 'Zones', 'Condition'.`);
        Report._KeyInfo.activateTextAreaInput(Report._KeyInfo.Page
            .formCommentTextBox(testData.propertyRightsAppraisedTitle));
        testData.chips.forEach(chip => {
            Report._KeyInfo.Page.formCommentTextBox(testData.propertyRightsAppraisedTitle)
                .realType(`=${chip.typeSuggestValue}`);
            Report._KeyInfo.clickNarrativeSuggestions(chip.suggestionName);
            Report._KeyInfo.verifyFormCommentTextBoxText(testData.propertyRightsAppraisedTitle, chip.verifySuggest);
        });

        Report._KeyInfo.activateTextAreaInput( Report._KeyInfo.Page
            .formCommentTextBox(testData.definitionOfMarketValueTitle));
        testData.chips.forEach(chip => {
            Report._KeyInfo.Page.formCommentTextBox(testData.definitionOfMarketValueTitle)
                .realType(`=${chip.typeSuggestValue}`);
            Report._KeyInfo.clickNarrativeSuggestions(chip.suggestionName, 2);
            Report._KeyInfo.verifyFormCommentTextBoxText(testData.definitionOfMarketValueTitle, chip.verifySuggest);
        });
        Report._KeyInfo.inactivateTextAreaInput();

        cy.stepInfo("3. Verify chip style");
        testData.chipNames.forEach(chip => {
            Report._KeyInfo.verifyStyleInDefaultChip(chip);
        });

        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
    });
    
    it("Check export", () => {
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
            .then(file => {
                cy.log(<string>file);
                cy.stepInfo(`4. Verify the linked chips on export for both sections`);
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

    