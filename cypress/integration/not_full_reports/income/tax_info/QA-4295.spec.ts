import testData from "../../../../fixtures/not_full_reports/income/tax_info/QA-4295.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { _TaxInfo } from "../../../../actions/income";
import { ReviewExport} from './../../../../actions/index';

describe("Assessed Value & RE Taxes] Verify the 'Tax Calculation Discussion' generated commentary is displayed on the Tax Info page.", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", {tags: '@to_check_export'} ,() => {
        cy.stepInfo("1. Navigate to Income -> Tax Info");
        _NavigationSection.navigateToTaxInfo();

        cy.stepInfo("2. Verify  Tax Calculation discussion title and commentary is diplayed");
        cy.get(".MuiTypography-subtitle1").should("have.text", testData.title);
        _TaxInfo.verifyTaxSummaryCommentary(testData.commentary);

        cy.stepInfo("3. Verify Tax Calculation discussion's tooltip content");
        _TaxInfo.verifyTaxSummaryTooltip(testData.tooltip);

        cy.stepInfo("4. Export the report");
        _NavigationSection.Actions.openReviewAndExport(true);
        ReviewExport.generateDocxReport().waitForReportGenerated();

        deleteReport(testData.reportCreationData.reportNumber);
    });
});