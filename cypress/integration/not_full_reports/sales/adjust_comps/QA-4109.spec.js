import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4109.fixture";
import Homepage from "../../../../actions/base/homepage.actions";
import Sales from "../../../../actions/sales/sales.manager";
import NavigationSection from "../../../../actions/base/navigationSection.actions";

describe("Adjusted Price per Residential Unit in Sales Adjustment Grid is calculated with correct formula", () => {

    before("Login, create report", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToFindComps();
        Sales.FindComps.selectCompFromMapByAddress(testData.comparable.address);
        NavigationSection.openAdjustCompsInSales();
        Sales.AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits)
            .enterPropertyRightsByColumn(testData.comparable.propertyRights)
            .verifyTrendedPriceByColumn(testData.comparable.trendedPrice);
        Sales.AdjustComps.returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});