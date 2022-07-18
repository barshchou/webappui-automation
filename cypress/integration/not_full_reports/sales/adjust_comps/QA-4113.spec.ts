import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4103_13_30.fixture";
//../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4113.fixture"
import Sales from "../../../../actions/sales/sales.manager";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe("Net Property Adjustments in Sales Adjustment Grid is calculated with correct formula", 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToFindComps();
        Sales.FindComps.selectCompFromMap();
        NavigationSection.navigateToAdjustComps();
        Sales.AdjustComps.enterSizeAdjustmentByColumn(testData.comparable.sizeAdjustment)
            .enterConditionAdjustmentByColumn(testData.comparable.conditionAdjustment)
            .clickAddOtherAdjustmentButton()
            .enterOtherAdjustmentByColumn(testData.comparable.otherAdjustment)
            .verifyNetPropertyAdjustmentsByCompIndex();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});