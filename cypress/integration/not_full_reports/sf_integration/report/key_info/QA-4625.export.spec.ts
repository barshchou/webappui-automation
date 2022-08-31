import testData from "../../../../../fixtures/not_full_reports/sf_integration/report/key_info/QA-4625.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { Report, ReviewExport } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";

describe("Verify the report export with a pre-filled Letter of Engagement from Dropbox",
    { tags: [ "@report", "@key_info", "@salesforce", "@check_export" ] }, () => {
        it("Test body", () => {
            cy.stepInfo(`1. Create a new report on the WebApp (Note: the JOB # of that report 
                        corresponds with the JOB # of an open job on SalesForce)`);
            createReport(testData.reportCreationData);
        
            cy.stepInfo(`2. Navigate to the Report > Key Info > Engagement and Verify that 
                        the Letter Of Engagement field is auto-filled from Dropbox`);
            _NavigationSection.navigateToReportInformation();
            Report._KeyInfo.Page.inputToCheckUpload.should("have.value", testData.verifyValue);
            
            // TODO: Create method for unchecking redundant checkboxes for export

            cy.stepInfo(`3. Export the report`);
            _NavigationSection.openReviewAndExport();
            ReviewExport.selectSectionsToIncludeInExport(testData.sectionToExport)
                .generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(`JOB-${testData.reportCreationData.reportNumber}_462`);
        });

        it("Check export", () => {
            cy.task("getFilePath",
                { _reportName: `${testData.reportCreationData.reportNumber}_462`, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    
                    cy.stepInfo(`4. Proceed to the Addenda > Letter of Engagement section.
                                Verify the correct Letter Of Engagement is displayed.`);
                    testData.LOESourceStrings.forEach((sourceString, index) => {
                        cy.contains(testData.exportSectionName).nextUntil("h2").eq(index).children()
                            .should("have.attr", "src").and("include", sourceString);
                    });
                });
        });
    });