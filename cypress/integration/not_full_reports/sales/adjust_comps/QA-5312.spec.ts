import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-5312.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Sales } from "../../../../actions";

describe("Total Utility Adjustments in Sales Adjustment Grid is calculated with correct formula", 
    { tags:[ "@sales", "@adjust_comps", ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Navigate to Find comps page and add a sales comps");
        _NavigationSection.navigateToFindComps().pause();
        [ 0, 1, 2 ].forEach((index) => {
            Sales._FindComps.selectCompFromMap();
            Sales._FindComps.Page.getSelectedComparable(index).should('be.visible');
        });
        _NavigationSection.navigateToAdjustComps();
        Sales._AdjustComps.Page.getAdjustmentArrow("market-adjustment").click().pause();
        [ 0, 1, 2 ].forEach((index) => {
            cy.get('[data-qa="expansion-row-market-adjustment"] [data-qa="Property Description"] a').eq(index).click();
            cy.get('[id="salesApproach.salesAdjustmentGrid-final-form"]').should("be.visible");
            cy.get('[aria-label="Close"]', { includeShadowDom:true }).click();
            cy.pause();
        });
        deleteReport(testData.reportCreationData.reportNumber);
    });
});