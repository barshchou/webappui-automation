import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4109.fixture";
import Sales from "../../../../actions/sales/sales.manager";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe("Adjusted Price per Residential Unit in Sales Adjustment Grid is calculated with correct formula", 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToFindComps();
        Sales.FindComps.selectCompFromMapByAddress(testData.comparable.address);
        NavigationSection.navigateToAdjustComps();
        Sales.AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits)
            .enterPropertyRightsByColumn(testData.comparable.propertyRights)
            .verifyTrendedPriceByColumn(testData.comparable.trendedPrice);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});