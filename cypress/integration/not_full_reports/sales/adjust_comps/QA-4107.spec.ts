import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4107.fixture";
import {Sales} from "../../../../actions";
import { _NavigationSection as NavigationSection} from "../../../../actions/base";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";

describe("Adjusted Price per Residential Unit in Sales Adjustment Grid is calculated with correct formula", () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToFindComps();
        Sales.FindComps.selectCompFromMapByAddress(testData.comparable.address);
        NavigationSection.openAdjustCompsInSales();
        Sales.AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits)
            .enterSizeAdjustmentByColumn(testData.comparable.sizeAdjustment)
            .enterConditionAdjustmentByColumn(testData.comparable.conditionAdjustment)
            .clickAddOtherAdjustmentButton()
            .enterOtherAdjustmentByColumn(testData.comparable.otherAdjustment)
            .enterPropertyRightsByColumn(testData.comparable.propertyRights)
            .verifyAdjustedPriceByColumn();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});