import { Sales } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4103_13.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe("Net Property Adjustments in Sales Adjustment Grid is calculated with correct formula", 
    { tags: [ "@adjust_comps", "@sales", "@feature_flag" ] }, () => {
        
        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            NavigationSection.navigateToFindComps();
            Sales._FindComps.selectCompFromMap()
                .clickSaveButton();
            cy.saveLocalStorage();
        });

        beforeEach(() => {
            cy.restoreLocalStorage();
            NavigationSection.navigateToAdjustComps();
        });

        it("[QA-4103]", () => {
            testData.calculationUnits.forEach(val => {
                Sales._AdjustComps.checkCalculationUnitsRadio(val)
                    .verifyRowWithNameExists(testData.existColumns[0])
                    .verifyRowWithNameExists(testData.existColumns[1]);
            });
        });

        it("[QA-4113]", () => {
            NavigationSection.navigateToAdjustComps();
            Sales._AdjustComps.enterSizeAdjustmentByColumn(testData.comparable.sizeAdjustment)
                .enterConditionAdjustmentByColumn(testData.comparable.conditionAdjustment)
                .clickAddOtherAdjustmentButton()
                .enterOtherAdjustmentByColumn(testData.comparable.otherAdjustment)
                .verifyNetPropertyAdjustmentsByCompIndex();
        });
    });