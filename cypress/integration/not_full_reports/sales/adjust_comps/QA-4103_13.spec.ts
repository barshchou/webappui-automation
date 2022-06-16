import { Sales } from './../../../../actions/index';
import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4103_13.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe("Net Property Adjustments in Sales Adjustment Grid is calculated with correct formula", 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        NavigationSection.navigateToFindComps();
        Sales._FindComps.selectCompFromMapByAddress(testData.comparable.address)
            .clickSaveButton();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("[QA-4103]", () => {
        NavigationSection.navigateToAdjustComps();
        testData.calculationUnits.forEach(val => {
            Sales._AdjustComps.checkCalculationUnitsRadio(val);
            // Sales.AdjustComps.enterSizeAdjustmentByColumn(testData.comparable.sizeAdjustment)
            // .enterConditionAdjustmentByColumn(testData.comparable.conditionAdjustment)
            // .clickAddOtherAdjustmentButton()
            // .enterOtherAdjustmentByColumn(testData.comparable.otherAdjustment)
            // .verifyNetPropertyAdjustmentsByCompIndex();
        });
    });

    it("[QA-4113]", () => {
        NavigationSection.navigateToFindComps();
        Sales._FindComps.selectCompFromMapByAddress(testData.comparable.address);
        NavigationSection.navigateToAdjustComps();
        Sales._AdjustComps.enterSizeAdjustmentByColumn(testData.comparable.sizeAdjustment)
            .enterConditionAdjustmentByColumn(testData.comparable.conditionAdjustment)
            .clickAddOtherAdjustmentButton()
            .enterOtherAdjustmentByColumn(testData.comparable.otherAdjustment)
            .verifyNetPropertyAdjustmentsByCompIndex();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});