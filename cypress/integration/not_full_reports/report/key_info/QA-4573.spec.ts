import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4573.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { ReviewExport } from "../../../../actions";
import { conditionalDescribe } from "../../../../../utils/env.utils";

conditionalDescribe("[QA-4573] Verify the Source text is correct in the Survey of Competitive Rates table",
    { tags: [ "@report", "@key_info", "@check_export" ] }, () => {
        
    it("Test body", () => {
        cy.stepInfo(`1. Create a new report on the WebApp and export the report.`);
        createReport(testData.reportCreationData);
        _NavigationSection.openReviewAndExport();
        
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);

        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Check export", () => {
        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docx_html: "html" }).then(file => {
            cy.log(<string>file);

            cy.stepInfo(`2. Proceed to the Income Capitalization Approach > Income Capitalization > 
                        Mortgage Component > Survey of Competitive Rates and verify Source text`);
            cy.visit(<string>file);
            cy.xpath(`//h1[.='Income Capitalization Approach']/following-sibling
                    ::h2[.='Income Capitalization']/following-sibling
                    ::h4[.='Mortgage Component']/following-sibling
                    ::p[.='Survey of Competitive Rates']`).scrollIntoView()
                    .next().next("p").should("have.text", testData.sourceText);
        });
    });
});