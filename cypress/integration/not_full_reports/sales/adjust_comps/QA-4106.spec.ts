import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4106.fixture";
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
        _NavigationSection.navigateToFindComps();
        Sales._FindComps.selectCompFromMapByAddress(testData.comparable.address);

        cy.stepInfo(`2. Verify if Per Residential Units is selected as Sales Comparables Setup then
                    Trended Price per Unit in Total Footer = Price  per Unit + Price  per Unit * Property Rights + 
                    Price  per Unit * Financing Terms + Price  per Unit * Conditions of Sale +  per Unit * Market Conditions (Time))
                    or
                    Trended Price per Unit = [Unadjusted Price] * (1 + (SUM[Unadjusted Adjustments]))/ # of total units`);
        _NavigationSection.openAdjustCompsInSales();
        Sales._AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits)
            .enterMarketAdjustmentsGroup(Object.keys(testData.comparablesAdjustments), Object.values(testData.comparablesAdjustments))
            .verifyTrendedPricePerBasis(testData.basis);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});