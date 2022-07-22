import testData from "../../../../fixtures/not_full_reports/property/market/QA-4517.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property, ReviewExport } from "../../../../actions";
import { conditionalDescribe } from "../../../../../utils/env.utils";

conditionalDescribe(`[QA-4517] Check that when "Summary of Rent Stabilization Laws" 
                    is empty in the report nothing shows up in export`,
    { tags: [ "@property", "@market", "@check_export" ] }, () => {
        
    it("Test body", () => {
        cy.stepInfo(`1. Create a new report on the WebApp and navigate to Property > Market.`);
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToPropertyMarket();
        
        cy.stepInfo(`2. Verify that "Summary of Rent Stabilization Laws" don't have a report filled in.`);
        Property._Market.Page.rentStabilizationFile.should("have.value", "");

        cy.stepInfo(`3. Export the report`);
        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
    });

    it("Check export", () => {
        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docx_html: "html" }).then(file => {
            cy.log(<string>file);

            cy.stepInfo(`4. Verify that nothing shows up in the export in the Addenda 
                        after Comparable sales outline and before Qualifications sections.`);
            cy.visit(<string>file);
            cy.xpath(`//h2[.='${testData.sectionBeforeName}']/following-sibling::h2`)
                .eq(0).scrollIntoView().should("have.text", testData.sectionAfterName);
        });
    });
});