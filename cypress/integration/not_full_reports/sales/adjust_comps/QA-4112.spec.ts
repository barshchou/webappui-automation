import { Tag } from './../../../../utils/tags.utils';
import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4112.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Sales } from "../../../../actions/index";

describe("Total Utility Adjustments in Sales Adjustment Grid is calculated with correct formula", 
    { tags:[ Tag.sales, Tag.adjust_comps, ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Navigate to Find comps page and add a sales comps");
        _NavigationSection.navigateToFindComps();
        Sales._FindComps.selectCompFromMapByAddress(testData.comparableFirst.address);

        cy.stepInfo("2. Open Adjust comps page, add all types of utilities adjustment and " + 
                    "Verify Total Utility Adjustments in Total Footer = " +
                    "Commercial Space Adjustment + Corner Adjustment + Finishes Adjustment + " + 
                    "Elevator Adjustment + Amenities Adjustment + Air Rights Adjustment + Other Utility Adjustment)");
        _NavigationSection.openAdjustCompsInSales();
        Sales._AdjustComps.clickAddCustomUtilitiesAdjustment()
            .editOtherUtilitiesAdjustmentRowName(testData.customUtilitiesAdjustmentDefaultName, testData.newCustomUtilitiesAdjustmentName)
            .enterOtherUtilitiesAdjustmentByColumn(testData.comparableFirst.otherUtilityAdjustment, 0, 0)
            .enterUtilitiesAdjustmentByColumn(Object.keys(testData.compsAdj), Object.values(testData.compsAdj))
            .verifyTotalUtilitiesAdjustmentsByCompIndex();

        deleteReport(testData.reportCreationData.reportNumber);
    });
});