import { createReport } from "../../actions/base/baseTest.actions";
import ReportDataCreator from "../../fixtures/data_creator/reportData.creator";
import { ReviewExport } from "../../actions";
import { BoweryAutomation } from "../../types/boweryAutomation.type";

const reportCreationData: BoweryAutomation.ReportCreationData = 
    ReportDataCreator.getReportData("generateDownloadNewReport");

describe("Generate new report and download it", { tags: [ "@smoke" ] }, () => {

    it("Generate and download report", () => {
        createReport(reportCreationData);
        ReviewExport.generateDocxReport()
            .waitForReportGenerated()
            .downloadAndConvertDocxReport(reportCreationData.reportNumber);
    });

    it("Check export report", () => {
        cy.task("getFilePath", { _reportName: reportCreationData.reportNumber, _docxHtml: "html" }).then(file => {
            cy.visit(<string>file);
            const addressToContain = reportCreationData.address.split(",")[0];
            cy.contains(addressToContain).should("exist");
        });
    });
});
