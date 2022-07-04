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
        testData.comparable.addresses.forEach(address => {
            Sales._FindComps.selectCompFromMapByAddress(address);
        });
        _NavigationSection.navigateToAdjustComps();
        Sales._AdjustComps.Page.getAdjustmentArrow("Other Adjustment").click();
        cy.pause();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});