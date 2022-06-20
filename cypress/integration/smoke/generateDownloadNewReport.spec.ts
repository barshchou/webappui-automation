import { createReport, deleteReport } from "../../actions/base/baseTest.actions";
import ReportDataCreator from "../../fixtures/data_creator/reportData.creator";
import { Base, ReviewExport } from "../../actions";
import { BoweryAutomation } from "../../types";

const reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("generateDownloadNewReport");

describe("Generate new report and download it", { tags: [ "@smoke" ] }, () => {

    it("Generate and download report", () => {
        createReport(reportCreationData);
        ReviewExport.generateDocxReport()
            .waitForReportGenerated()
            .downloadAndConvertDocxReport(reportCreationData.reportNumber);
        deleteReport(reportCreationData.reportNumber);
    });

    it("Verify exported report", () => {
        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: reportCreationData.reportNumber, _docx_html: "html" }).then(file => {
            cy.visit(<string>file);
            const addressToContain = reportCreationData.address.split(",")[0];
            cy.contains(addressToContain).should("exist");
        });
    });
});