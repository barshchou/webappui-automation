import { ReviewExport } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4069.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Report } from "../../../../actions";

describe("[QA-4069] Check the helper text for Provided Documents)",
    { tags: [ "@report", "@key_info", "@check_export" ] }, () => {
        it("Test body", () => {
            cy.stepInfo(`1. Create report`);
            createReport(testData.reportCreationData);

            // TODO: [QA-6759] AQA - Remove duplicate navigation to KeyInfo page
            cy.stepInfo(`2. Go to Report → Key Info → Engagement tab and upload files`);
            _NavigationSection.navigateToReportKeyInfo();
            Report._KeyInfo.uploadFile(testData.pdfFileName);

            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it("Check export", () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    
                    cy.stepInfo(`3. Verify uploaded file in following the Rent Roll & Financial Statements`);
                    cy.contains(testData.exportSectionName).next().scrollIntoView().should("be.visible");
                }); 
        });
    });