import { DataCollections, ReviewExport } from '../../../../actions';
import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/key_info/QA-4720.fixture';

// TODO: Test fail. [QA-7001]
describe(`Verify the "Linked" chips dropdown in the new narrative component for 
ACAS reports for Property Rights Appraised and Definition 
    of Market Value sections`, { tags:[ "@report", "@key_info", "@check_export", 
    "@narrative_comp", "@performance_issues" ] }, () => {
    it("[QA-4720]", () => {
        cy.stepInfo("Login, create report");
        createReport(testData.reportCreationData);

        cy.stepInfo("Precondition: Set building name");
        _NavigationSection.navigateToSubjectPropertyData();
        DataCollections._SubjectPropertyData.enterBuildingName(testData.buildingName);

        cy.stepInfo("1. Proceed to the Report > Key Info page.");
        _NavigationSection.navigateToReportKeyInfo();

        cy.stepInfo(`2.Enter the “=“ and verify the "Linked" chips dropdown for both sections: 
        options 'Gross Building Area', 'Building Name', 'Property Type', 'Residential Unit Count', 
        'Commercial Unit Count', 'Street Address', 'Street Name', 'Site Area', 'Year Built', 'Block', 
        'Lot', 'Concluded Cap Rate', 'Zones', 'Condition'.`);
        Report._KeyInfo.activateTextAreaInput(Report._KeyInfo.Page
            .formCommentTextBox(testData.propertyRightsAppraisedTitle));
        testData.chips.forEach(chip => {
            Report._KeyInfo.Page.formCommentTextBox(testData.propertyRightsAppraisedTitle)
                .realType(`=${chip.typeSuggestValue}`);
            Report._KeyInfo.clickNarrativeSuggestions(chip.suggestionName);
            Report._KeyInfo.verifyFormCommentTextBoxText(testData.propertyRightsAppraisedTitle, chip.verifySuggest);
        });

        /*
         * [QA-7001] When typing 'condition' in narrative component clicked value isn't appear in 
         * text box. Need to add workaround or investigate issue and submit a bug.
         * ernst: there will be a tech-task regrading performance
         * since we could've split this spec in two like we did with QA-4718,
         * but I ain't decided right solution
         */
        Report._KeyInfo.activateTextAreaInput(Report._KeyInfo.Page
            .formCommentTextBox(testData.definitionOfMarketValueTitle));
        testData.chips.forEach(chip => {
            // [QA-7001] - possible solution: activating textarea on every chip
            Report._KeyInfo.activateTextAreaInput(Report._KeyInfo.Page
                .formCommentTextBox(testData.definitionOfMarketValueTitle));
            Report._KeyInfo.Page.formCommentTextBox(testData.definitionOfMarketValueTitle)
                .realType(`=${chip.typeSuggestValue}`);
            Report._KeyInfo.clickNarrativeSuggestions(chip.suggestionName, 2);
            Report._KeyInfo.verifyFormCommentTextBoxText(testData.definitionOfMarketValueTitle, chip.verifySuggest);
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
                    cy.contains(testData.propertyRightsAppraisedTitle).next().scrollIntoView()
                        .should("include.text", chip.verifyExport);
                    cy.contains(testData.definitionOfMarketValueTitle).next().next().scrollIntoView()
                        .should("include.text", chip.verifySuggest);
                });
            }); 
    });
});

    