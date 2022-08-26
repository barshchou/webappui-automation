import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4104.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Report, ReviewExport } from "../../../../actions";

describe("[QA-4104] Verify the Market Value generated commentary", 
    { tags: [ "@report", "@key_info", "@check_export" ] }, () => {
        it("Test body", () => {
            cy.stepInfo(`1. Create report while creating set the same Job number 
                        as report from SalesForce has (e.g. JOB-1764459005) 
                        Make sure that there is no Inspection Date in the Salesforce job`);
            createReport(testData.reportCreationData);

            cy.stepInfo(`2. Go to Report > Key Info > Definition of Market Value`);
            _NavigationSection.navigateToReportInformation();
        
            cy.stepInfo(`3. Check that this sentence exports in the Introduction, 
                        replacing the boilerplate sentence currently exported there`);
            Report._KeyInfo.Page.textBoxDefinitionOfMarketValue().should("include.text", testData.verifyText);

            cy.stepInfo(`4. Verify text letting know where the text exports.`);
            Report._KeyInfo.Page.definitionOfMarketValue.should("include.text", testData.tooltipText);

            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(`JOB-${testData.reportCreationData.reportNumber}_462`);
        });

        it("Check export", () => {
            cy.task("getFilePath",
                { _reportName: `${testData.reportCreationData.reportNumber}_462`, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);

                    cy.stepInfo(`5. Check that this sentence exports in the Introduction, 
                                replacing the boilerplate sentence currently exported there`);
                    cy.contains(testData.exportSectionName).next().next().scrollIntoView()
                        .should("have.text", testData.verifyText);
                });
        });
    });