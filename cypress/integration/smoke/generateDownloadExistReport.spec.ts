import { loginAction } from '../../actions/base/baseTest.actions';
import { Base, ReviewExport } from "../../actions";
import testData from "../../fixtures/smoke/generateDownloadExistReport.fixture";
import { createReport, deleteReport } from "../../actions/base/baseTest.actions";

describe("Open any existing report, generate report and download it", { tags: [ "@smoke" ] }, () => {
    it("Download, generate report", () => {
        loginAction(testData.username, testData.password);
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

    it("Check export report", () => {
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
            .then(file => {
                cy.visit(<string>file);
                cy.contains(testData.textToVerifyInReport).should("exist");
            });
    });

    it("Create new report for next tests", () => {
        createReport(testData.reportCreationData);
        /*
         * ernst: remove second call after cypress 10 migration
         * slava: removed 2nd deleteReport as there were no duplicate reports after run
         * and test fails
         */
        deleteReport(testData.reportCreationData.reportNumber);
    });
});