import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4108.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Sales } from "../../../../actions";

describe("[QA-4108] Net Market Adjustments in Sales Adjustment Grid is calculated with correct formula", 
    { tags:[ "@sales", "@adjust_comps", ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Navigate to Sales > Find comps and select address");
        _NavigationSection.navigateToFindComps();
        Sales._FindComps.selectCompFromMapByAddress(testData.comparable.address);

        cy.stepInfo("2. Navigate to Sales > Adjust Comps > Sales Adjustment Grid");
        _NavigationSection.openAdjustCompsInSales();

        cy.stepInfo("3. Fill inputs in Market Adjustment");
        Sales._AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits)
            .enterMarketAdjustmentsGroup(Object.keys(testData.comparablesAdjustments), Object.values(testData.comparablesAdjustments));

        cy.stepInfo("3.Verify Net Market Adjustments = Property Rights + Financing Terms + Conditions of Sale + Market Conditions (Time)");
        Sales._AdjustComps.verifyNetMarketAdjustmentsByCompIndex();

        deleteReport(testData.reportCreationData.reportNumber);
    });
});