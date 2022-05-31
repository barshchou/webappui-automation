import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4606.fixture";
import { Sales } from "../../../../actions";
import { _NavigationSection as NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe("[QA-4606] Check the reference 'Condition' line in the Sales Adjustment Grid", 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {
    it("Test body", () => {
        cy.stepInfo("Login, create report");
        createReport(testData.reportCreationData);

        cy.stepInfo(`2. Verify that the subject column displays the subject property condition as set in Property 
            > Property Description > Site Description`);
        NavigationSection.navigateToFindComps();
        Sales._FindComps.selectCompFromMapByAddress(testData.comparable.address);

        cy.stepInfo("3. Navigate to Sales > Adjust Comps > Sales Adjustment Grid");
        NavigationSection.openAdjustCompsInSales();

        cy.stepInfo("4. Fill fields and verify Adjusted Price PSF");
        Sales._AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits[0])
            .enterSizeAdjustmentByColumn(testData.comparable.sizeAdjustment)
            .enterConditionAdjustmentByColumn(testData.comparable.conditionAdjustment)
            .clickAddOtherAdjustmentButton()
            .enterOtherAdjustmentByColumn(testData.comparable.otherAdjustment)
            .enterPropertyRightsByColumn(testData.comparable.propertyRights)
            .verifyAdjustedPriceByColumn();

        // deleteReport(testData.reportCreationData.reportNumber);
    });
});