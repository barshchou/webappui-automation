import testData from "../../../../fixtures/not_full_reports/property/market/QA-4516_17.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property, ReviewExport } from "../../../../actions";

describe(`[Property > Market] Summary of Rent Stabilization Laws`,
    { tags: [ "@property", "@market", "@check_export" ] }, () => {

        const url = `${Cypress.config().baseUrl}`;

        it(`[QA-4516] Check that "Summary of Rent Stabilization Laws" 
        docs can be deleted from report`, () => {
            cy.stepInfo(`1. Create a new report on the WebApp and navigate to Property > Market.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToPropertyMarket();

            cy.stepInfo(`2. Upload file to "Summary of Rent Stabilization Laws".`);
            Property._Market.uploadRentStabilizationFile(testData.fileName)
                .verifyRentStabilizationFile(testData.fileName);

            cy.stepInfo(`3. Verify that "Summary of Rent Stabilization Laws" file 
                    can be deleted from report by clicking on the trashcan icon.`);
            Property._Market.clickTrashCanButton(testData.fileSelectionName)
                .verifyRentStabilizationFile("");

            cy.stepInfo(`4. Export the report.`);
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it("[QA-4516] Check export", () => {
            Cypress.config().baseUrl = null;
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, 
                // eslint-disable-next-line camelcase
                _docx_html: "html" }).then(file => {
                cy.log(<string>file);

                cy.stepInfo(`5. Verify that nothing shows up in the export in the Addenda 
                        after Comparable sales outline and before Qualifications sections.`);
                cy.visit(<string>file);
                cy.xpath(`//h2[.='${testData.sectionBeforeName}']/following-sibling::h2`)
                    .eq(0).scrollIntoView().should("have.text", testData.sectionAfterName);
            });
        });

        it(`[QA-4517] Check that when "Summary of Rent Stabilization Laws" 
        is empty in the report nothing shows up in export`, () => {
            Cypress.config().baseUrl = url;
        
            cy.stepInfo(`1. Create a new report on the WebApp and navigate to Property > Market.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToPropertyMarket();
        
            cy.stepInfo(`2. Verify that "Summary of Rent Stabilization Laws" don't have a report filled in.`);
            Property._Market.verifyRentStabilizationFile("");

            cy.stepInfo(`3. Export the report.`);
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it("[QA-4517] Check export", () => {
            Cypress.config().baseUrl = null;
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, 
                // eslint-disable-next-line camelcase
                _docx_html: "html" }).then(file => {
                cy.log(<string>file);

                cy.stepInfo(`4. Verify that nothing shows up in the export in the Addenda 
                        after Comparable sales outline and before Qualifications sections.`);
                cy.visit(<string>file);
                cy.xpath(`//h2[.='${testData.sectionBeforeName}']/following-sibling::h2`)
                    .eq(0).scrollIntoView().should("have.text", testData.sectionAfterName);
            });
        });
    });