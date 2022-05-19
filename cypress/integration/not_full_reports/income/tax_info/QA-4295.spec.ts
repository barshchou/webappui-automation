import testData from "../../../../fixtures/not_full_reports/income/tax_info/QA-4295.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { _TaxInfo } from "../../../../actions/income";
import { ReviewExport } from './../../../../actions/index';
import { Tag } from "../../../../utils/tags.utils";

describe("[Assessed Value & RE Taxes] Verify the 'Tax Calculation Discussion' generated commentary is displayed on the Tax Info page.", () => {

    it("Test body", { tags: [ Tag.check_export, Tag.income, Tag.tax_info ] }, () => {
        createReport(testData.reportCreationData);

        cy.stepInfo("1. Navigate to Income -> Tax Info");
        _NavigationSection.navigateToTaxInfo();

        cy.stepInfo("2. Verify  Tax Calculation discussion title and commentary is diplayed");
        _TaxInfo.verifyTaxSummaryDiscussionTitle(testData.title).verifyTaxSummaryCommentary(testData.commentary);

        cy.stepInfo("3. Verify Tax Calculation discussion's tooltip content");
        _TaxInfo.verifyTaxSummaryTooltip(testData.tooltip);

        cy.stepInfo("4. Export the report");
        _NavigationSection.Actions.openReviewAndExport(true);
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);

        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Check export", () => {
        cy.task("getFilePath",
        { _reportName: testData.reportCreationData.reportNumber, _docx_html: "html" }
        ).then(file => {
            cy.log(<string>file);
            
            cy.stepInfo("Check that Tax Calculation Discussion commentary exports in the 'Assessed Value & RE Taxes' section of the report.");
            
            cy.visit(<string>file);
            cy.contains("Assessed Value & Real Estate Taxes").scrollIntoView().next().next()
                .next().next().next().next().next().should("have.text", testData.commentary);
        });
    });
});