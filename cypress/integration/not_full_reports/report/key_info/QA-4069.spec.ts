import { ReviewExport } from './../../../../actions/index';
import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4069.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Report } from "../../../../actions";

describe("[QA-4069] Check the helper text for Provided Documents)",
    { tags: [ "@report", "@key_info", "@check_export" ] }, () => {
        it("Test body", () => {
            cy.stepInfo(`1. Create report`);
            createReport(testData.reportCreationData);

            cy.stepInfo(`2. Go to Report → Key Info → Engagement tab and upload files`);
            _NavigationSection.navigateToReportInformation();
            Report._KeyInfo.uploadFile(testData.pdfFileName);

            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
            deleteReport(testData.reportCreationData.reportNumber);
        });

        it("Check export", () => {
            Cypress.config().baseUrl = null;
            cy.task("getFilePath", { reportName: testData.reportCreationData.reportNumber, docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    
                    cy.stepInfo(`3. Verify uploaded file in following the Rent Roll & Financial Statements`);
                    cy.contains("Letter of Engagement").next().scrollIntoView().should("be.visible");
                }); 
        });
    });