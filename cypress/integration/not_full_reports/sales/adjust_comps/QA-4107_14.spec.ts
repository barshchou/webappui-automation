import fixture from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4107_14.fixture";
import { Sales } from "../../../../actions";
import { _NavigationSection as NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe("Adjusted Price per Residential Unit in Sales Adjustment Grid is calculated with correct formula", 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {

    it("[QA-4107]", () => {
        cy.stepInfo("Login, create report");
        createReport(fixture.reportMixedCreationData);

        cy.stepInfo("2. Navigate to Sales > Find Comps and select comps");
        NavigationSection.navigateToFindComps();
        Sales._FindComps.selectCompFromMapByAddress(fixture.comparable.address);

        cy.stepInfo("3. Navigate to Sales > Adjust Comps > Sales Adjustment Grid");
        NavigationSection.openAdjustCompsInSales();

        cy.stepInfo("4. Fill fields and verify Adjusted Price");
        Sales._AdjustComps.checkCalculationUnitsRadio(fixture.calculationUnits)
            .enterSizeAdjustmentByColumn(fixture.comparable.sizeAdjustment)
            .enterConditionAdjustmentByColumn(fixture.comparable.conditionAdjustment)
            .clickAddOtherAdjustmentButton()
            .enterOtherAdjustmentByColumn(fixture.comparable.otherAdjustment)
            .enterPropertyRightsByColumn(fixture.comparable.propertyRights)
            .verifyAdjustedPriceByColumn();

        deleteReport(fixture.reportMixedCreationData.reportNumber);
    });

    it("[QA-4114]", () => {
        cy.stepInfo("Login, create report");
        createReport(fixture.reportCreationData);

        cy.stepInfo("2. Navigate to Sales > Find Comps and select comps");
        NavigationSection.navigateToFindComps();
        Sales._FindComps.selectCompFromMapByAddress(fixture.comparable.address);

        cy.stepInfo("3. Navigate to Sales > Adjust Comps > Sales Adjustment Grid");
        NavigationSection.openAdjustCompsInSales();

        cy.stepInfo("4. Fill fields and verify Adjusted Price");
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