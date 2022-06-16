import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4107_14-15.fixture";
import { Sales } from "../../../../actions";
import { _NavigationSection as NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe("Adjusted Price per Residential Unit in Sales Adjustment Grid is calculated with correct formula", 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {

    it("[QA-4107]", () => {
        cy.stepInfo("Login, create report");
        createReport(testData.reportMixedCreationData);

        cy.stepInfo("2. Navigate to Sales > Find Comps and select comps");
        NavigationSection.navigateToFindComps();
        Sales._FindComps.selectCompFromMapByAddress(testData.comparable.address);

        cy.stepInfo("3. Navigate to Sales > Adjust Comps > Sales Adjustment Grid");
        NavigationSection.navigateToAdjustComps();

        cy.stepInfo("4. Fill fields and verify Adjusted Price");
        Sales._AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits[1])
            .enterSizeAdjustmentByColumn(testData.comparable.sizeAdjustment)
            .enterConditionAdjustmentByColumn(testData.comparable.conditionAdjustment)
            .clickAddOtherAdjustmentButton()
            .enterOtherAdjustmentByColumn(testData.comparable.otherAdjustment)
            .enterPropertyRightsByColumn(testData.comparable.propertyRights)
            .verifyAdjustedPriceByColumn();

        deleteReport(testData.reportMixedCreationData.reportNumber);
    });

    it("[QA-4114]", () => {
        cy.stepInfo("Login, create report");
        createReport(testData.reportCreationData);

        cy.stepInfo("2. Navigate to Sales > Find Comps and select comps");
        NavigationSection.navigateToFindComps();
        Sales._FindComps.selectCompFromMapByAddress(testData.comparable.address);

        cy.stepInfo("3. Navigate to Sales > Adjust Comps > Sales Adjustment Grid");
        NavigationSection.navigateToAdjustComps();

        cy.stepInfo("4. Fill fields and verify Adjusted Price per Unit");
        Sales._AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits[1])
            .enterSizeAdjustmentByColumn(testData.comparable.sizeAdjustment)
            .enterConditionAdjustmentByColumn(testData.comparable.conditionAdjustment)
            .clickAddOtherAdjustmentButton()
            .enterOtherAdjustmentByColumn(testData.comparable.otherAdjustment)
            .enterPropertyRightsByColumn(testData.comparable.propertyRights)
            .verifyAdjustedPriceByColumn();

        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("[QA-4115]", () => {
        cy.stepInfo("Login, create report");
        createReport(testData.reportCreationData);

        cy.stepInfo("2. Navigate to Sales > Find Comps and select comps");
        NavigationSection.navigateToFindComps();
        Sales._FindComps.selectCompFromMapByAddress(testData.comparable.address);

        cy.stepInfo("3. Navigate to Sales > Adjust Comps > Sales Adjustment Grid");
        NavigationSection.navigateToAdjustComps();

        cy.stepInfo("4. Fill fields and verify Adjusted Price PSF");
        Sales._AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits[0])
            .enterSizeAdjustmentByColumn(testData.comparable.sizeAdjustment)
            .enterConditionAdjustmentByColumn(testData.comparable.conditionAdjustment)
            .clickAddOtherAdjustmentButton()
            .enterOtherAdjustmentByColumn(testData.comparable.otherAdjustment)
            .enterPropertyRightsByColumn(testData.comparable.propertyRights)
            .verifyAdjustedPriceByColumn();

        deleteReport(testData.reportCreationData.reportNumber);
    });
});