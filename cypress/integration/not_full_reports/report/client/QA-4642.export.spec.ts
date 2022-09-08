import { DataCollections, Report, ReviewExport } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/report/client/QA-4642.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from '../../../../actions/base';

describe("Verify the Client Guidelines Discussion on the page",
    { tags: [ "@report", "@client", "@check_export" ] }, () => {
        it("[QA-4642]",  () => {
            cy.stepInfo(`1. Proceed to the Report > Client page`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterBuildingName(testData.buildingName);
            _NavigationSection.navigateToClientPage().verifyProgressBarNotExist();

            cy.stepInfo(`2. Enter the “=“ and verify the "Linked" chips dropdown for both sections: 
                        options 'Gross Building Area', 'Building Name', 'Property Type', 
                        'Current Residential Unit Count', 'As Complete Residential Unit Count', 
                        'Current Commercial Unit Count', 'As Complete Commercial Unit Count', 
                        'Street Address', 'Street Name', 'Site Area', 'Year Built', 'Block', 
                        'Lot', 'Concluded Cap Rate', 'Zones', 'CurrentCondition', 'As Stabilized Condition'`);
            Report._Client.activateTextAreaInput(Report._Client.Page.intendedUserTextBox);
            testData.chips.forEach(chip => {
                Report._Client
                    .enterIntendedUserTextBox(`=${chip.typeSuggestValue}`)
                    .clickNarrativeSuggestions(chip.suggestionName)
                    .verifyIntendedUserTextBox(chip.verifySuggest);
            });
            Report._Client.activateTextAreaInput(Report._Client.Page.identificationOfClientTextBox);
            testData.chips.forEach(chip => {
                Report._Client
                    .enterIdentificationOfTheClientTextBox(`=${chip.typeSuggestValue}`)
                    .clickNarrativeSuggestions(chip.suggestionName, 1)
                    .verifyIdentificationOfTheClientTextBox(chip.verifySuggest);
            });
            Report._Client.inactivateTextAreaInput();
    
            cy.stepInfo(`3. Download report`);
            _NavigationSection.openReviewAndExport(true);
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it("Check export", () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.stepInfo(`5. Verify the linked chips on export for both sections`);
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
