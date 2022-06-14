import { Base, ReviewExport } from "../../actions";
import testData from "../../fixtures/smoke/generateDownloadExistReport.fixture";
import { createReport, deleteReport } from "../../actions/base/baseTest.actions";

describe("Open any existing report, generate report and download it", { tags: [ "@smoke" ] }, () => {

    it("Download, generate report", () => {
        cy.loginByApi(
            Cypress.config().baseUrl, 
            Cypress.env("USERNAME"), 
            Cypress.env("PASSWORD")
        );
        Base._HomePage.clickAllReportsTab()
            .verifyProgressBarNotExist()
            .enterReportNumberToSearch(testData.reportCreationData.reportNumber)
            .openReportByName(testData.reportCreationData.reportNumber)
            .verifyProgressBarNotExist();
        Base._NavigationSection.openReviewAndExport(false)
            .verifyProgressBarNotExist();
        ReviewExport.generateDocxReport()
            .waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
    });

    it("Verify exported report", () => {
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docx_html: "html" }).then(file => {
            cy.visit(<string>file);
            cy.contains(testData.textToVerifyInReport).should("exist");
        });
    });

    it("Create new report for next tests", () => {
        createReport(testData.reportCreationData);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});