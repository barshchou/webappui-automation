import fixture from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4107.fixture";
import { Sales } from "../../../../actions";
import { _NavigationSection as NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe("Adjusted Price per Residential Unit in Sales Adjustment Grid is calculated with correct formula", 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {

    before("Login, create report", () => {
        createReport(fixture.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToFindComps();
        Sales._FindComps.selectCompFromMapByAddress(fixture.comparable.address);
        NavigationSection.openAdjustCompsInSales();
        Sales._AdjustComps.checkCalculationUnitsRadio(fixture.calculationUnits)
            .enterSizeAdjustmentByColumn(fixture.comparable.sizeAdjustment)
            .enterConditionAdjustmentByColumn(fixture.comparable.conditionAdjustment)
            .clickAddOtherAdjustmentButton()
            .enterOtherAdjustmentByColumn(fixture.comparable.otherAdjustment)
            .enterPropertyRightsByColumn(fixture.comparable.propertyRights)
            .verifyAdjustedPriceByColumn();
        deleteReport(fixture.reportCreationData.reportNumber);
    });
});