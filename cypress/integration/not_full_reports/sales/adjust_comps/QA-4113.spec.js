import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4113.fixture";
import Homepage from "../../../../actions/base/homepage.actions";
import Sales from "../../../../actions/sales/sales.manager";
import NavigationSection from "../../../../actions/base/navigationSection.actions";


describe("Net Property Adjustments in Sales Adjustment Grid is calculated with correct formula", () => {
    before("Login, create report", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToFindComps();
        Sales.FindComps.selectCompFromMapByAddress(testData.comparable.address);
        NavigationSection.openAdjustCompsInSales();
        Sales.AdjustComps.enterSizeAdjustmentByColumn(testData.comparable.sizeAdjustment)
            .enterConditionAdjustmentByColumn(testData.comparable.conditionAdjustment)
            .enterOtherAdjustmentByColumn(testData.comparable.otherAdjustment)
            .verifyNetPropertyAdjustmentsByCompIndex();
    });

    after("Delete report", () => {
        Sales.AdjustComps.returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});