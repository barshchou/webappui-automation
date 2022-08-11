import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4017.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { ReviewExport } from '../../../../actions';

describe('Verify that "Date of the Report" row is displayed on the Salient Facts.', () => {

    it("Test body", { tags: [ "@report", "@key_info", "@check_export" ] }, () => {
        createReport(testData.reportCreationData);

        cy.stepInfo("1. Export the report");
        _NavigationSection.Actions.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);

        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Check export", () => {
        cy.task("getFilePath",
            { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" }
        ).then(file => {
            cy.log(<string>file);
            
            cy.stepInfo("2. Proceed to the Salient Facts");
            cy.visit(<string>file);
            cy.xpath("//h1[.='Summary of Salient Facts & Conclusions']/following-sibling::table")
                .eq(1).scrollIntoView().within(() => {
                    
                    cy.stepInfo("3. Verify that Date of the Report row is displayed below Date of Inspection row");
                    cy.get("tr").eq(4).find("td").eq(2).should("have.text", testData.dateOfInspectionRowName);
                    cy.get("tr").eq(5).find("td").eq(2).should("have.text", testData.dateOfTheReportRowName);

                    cy.stepInfo("4. Verify that the date is updated to today’s date when the document is opened");
                    cy.get("tr").eq(5).find("td").eq(3).should("have.text", testData.currentDate);
                });
        });
    });
});