import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4625.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Report, ReviewExport } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";

describe("Verify the report export with a prefilled Letter of Engagement from Dropbox",
    { tags: [ "@report", "@key_info", "@salesforce", "@check_export" ] }, () => {
    it("Test body", () => {
        cy.stepInfo(`1. Create a new report on the WebApp (Note: the JOB # of that report 
            corresponds with the JOB # of an open job on SalesForce)`);
        createReport(testData.reportCreationData);
        
        cy.stepInfo(`2. Navigate to the Report > Key Info > Engagement and Verify that 
            the Letter Of Engagement field is auto-filled from Dropbox`);
        _NavigationSection.navigateToReportInformation();
        Report._KeyInfo.Page.inputToCheckUpload.should("have.value", testData.verifyValue);
        
        cy.stepInfo(`3. Export the report`);
        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);

        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Check export", () => {
        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docx_html: "html" }).then(file => {
            cy.log(<string>file);
            cy.stepInfo(`4. proceed to the Addenda > Letter of Engagement section.
                Verify the correct Letter Of Engagement is displayed.`);
            cy.visit(<string>file);
            cy.contains("Current Commercial Rent Roll").next().scrollIntoView();
        });
    });
});