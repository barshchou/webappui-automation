import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4112.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Sales } from "../../../../actions";

describe("Total Utility Adjustments in Sales Adjustment Grid is calculated with correct formula", 
    { tags:[ "@sales", "@adjust_comps", ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Navigate to Find comps page and add a sales comps`);
            _NavigationSection.navigateToFindComps();
            Sales._FindComps.selectCompFromMap();

            cy.stepInfo(`2. Open Adjust comps page, add all types of utilities adjustment and  
                    Verify Total Utility Adjustments in Total Footer = 
                    Commercial Space Adjustment + Corner Adjustment + Finishes Adjustment + 
                    Elevator Adjustment + Amenities Adjustment + Air Rights Adjustment + Other Utility Adjustment)`);
            _NavigationSection.navigateToAdjustComps();
            Sales._AdjustComps.clickAddCustomUtilitiesAdjustment()
                .editOtherUtilitiesAdjustmentRowName(testData.customUtilitiesAdjustmentDefaultName, 
                    testData.newCustomUtilitiesAdjustmentName)
                .enterOtherUtilitiesAdjustmentByColumn(testData.comparableFirst.otherUtilityAdjustment, 0, 0)
                .enterUtilitiesAdjustmentGroup(Object.keys(testData.compsAdj), Object.values(testData.compsAdj))
                .verifyTotalUtilitiesAdjustmentsByCompIndex();
        });
    });