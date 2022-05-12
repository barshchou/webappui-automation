import { Tag } from './../../../../utils/tags.utils';
import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4529.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Sales, ReviewExport } from "../../../../actions/index";

describe("Check custom Utilities adjustment", { tags:[ Tag.sales, Tag.adjust_comps, Tag.check_export ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Navigate to Find comps page and add a couple of sales comps");
        _NavigationSection.navigateToFindComps();
        Sales._FindComps.selectCompFromMapByAddress(testData.comparableFirst.address)
            .selectCompFromMapByAddress(testData.comparableSecond.address);

        cy.stepInfo("2. Open Adjust comps page, verify custom utilities adjustment row can be added and deleted");
        _NavigationSection.openAdjustCompsInSales();
        Sales._AdjustComps.clickAddCustomUtilitiesAdjustment()
            .editOtherUtilitiesAdjustmentRowName(testData.customUtilitiesAdjustmentDefaultName, testData.newCustomUtilitiesAdjustmentName)
            .deleteOtherAdjustmentRow(testData.newCustomUtilitiesAdjustmentName);

        cy.stepInfo("3. Other Utilities Adjustment name checks");
        Sales._AdjustComps.clickAddCustomUtilitiesAdjustment()
            .editOtherUtilitiesAdjustmentRowName(testData.customUtilitiesAdjustmentDefaultName, testData.newCustomUtilitiesAdjustmentName)
            .clickSaveButton()
            .deleteOtherAdjustmentRow(testData.newCustomUtilitiesAdjustmentName);
        cy.reload();
        Sales._AdjustComps.verifyRowWithNameExists(testData.newCustomUtilitiesAdjustmentName)
            .editOtherUtilitiesAdjustmentRowName(testData.newCustomUtilitiesAdjustmentName, testData.customUtilitiesAdjustmentDefaultName)
            .clickSaveButton()
            .editOtherUtilitiesAdjustmentRowName(testData.customUtilitiesAdjustmentDefaultName, testData.newCustomUtilitiesAdjustmentName);
        cy.reload();
        Sales._AdjustComps.verifyRowWithNameExists(testData.customUtilitiesAdjustmentDefaultName)
            .verifyRowWithNameNotExists(testData.newCustomUtilitiesAdjustmentName)
            .editOtherUtilitiesAdjustmentRowName(testData.customUtilitiesAdjustmentDefaultName, testData.newCustomUtilitiesAdjustmentName)
            .clickAddCustomUtilitiesAdjustment()
            .editOtherUtilitiesAdjustmentRowName(testData.customUtilitiesAdjustmentDefaultName, testData.newCustomUtilitiesAdjustmentName, 1);

        cy.stepInfo("4. Custom other adjustment values checks");
        Sales._AdjustComps.enterOtherUtilitiesAdjustmentByColumn(testData.comparableFirst.otherUtilityAdjustment, 0, 0)
            .enterOtherUtilitiesAdjustmentByColumn(testData.comparableSecond.otherUtilityAdjustment, 0, 1)
            .verifyTotalUtilitiesAdjustmentsByCompIndex()
            .verifyTotalUtilitiesAdjustmentsByCompIndex(1)
            .verifyAdjustedPriceByColumn()
            .verifyAdjustedPriceByColumn(1)
            .enterOtherUtilitiesAdjustmentByColumn(testData.comparableFirst.otherNewUtilityAdjustment, 0, 0)
            .enterOtherUtilitiesAdjustmentByColumn(testData.comparableSecond.otherNewUtilityAdjustment, 0, 1)
            .verifyTotalUtilitiesAdjustmentsByCompIndex()
            .verifyTotalUtilitiesAdjustmentsByCompIndex(1)
            .verifyAdjustedPriceByColumn()
            .verifyAdjustedPriceByColumn(1)
            .clearOtherUtilitiesAdjustmentByColumn(0, 0)
            .enterOtherUtilitiesAdjustmentByColumn(0, 0, 1)
            .verifyTotalUtilitiesAdjustmentsByCompIndex()
            .verifyTotalUtilitiesAdjustmentsByCompIndex(1)
            .verifyAdjustedPriceByColumn()
            .verifyAdjustedPriceByColumn(1);

        cy.stepInfo("5. Prepare report for export validation");
        _NavigationSection.openReviewAndExport(true);
        ReviewExport.generateDocxReport()
            .waitForReportGenerated();
    });
});