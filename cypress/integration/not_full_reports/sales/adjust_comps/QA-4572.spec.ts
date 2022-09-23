import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4572.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import { Sales, ReviewExport } from "../../../../actions";

describe("Check custom adjustment", 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        //TODO: Find out about values round in this test
        it("Test body", () => {
            cy.stepInfo("1. Navigate to Find comps page and add a couple of sales comps");
            NavigationSection.navigateToFindComps();
            for (let i = 1; i < 3; i++) {
                Sales._FindComps.AddressSearch.openAddressSearchTab()
                    .addCompByParameter(testData.filter, i);
            }

            cy.stepInfo("2. Open Adjust comps page, verify custom adjustment row can be added and edited");
            NavigationSection.navigateToAdjustComps();
            Sales._AdjustComps.enterSizeAdjustmentByColumn(testData.comparableFirst.sizeAdjustment, 0)
                .enterSizeAdjustmentByColumn(testData.comparableSecond.sizeAdjustment, 1)
                .enterConditionAdjustmentByColumn(testData.comparableFirst.conditionAdjustment, 0)
                .enterConditionAdjustmentByColumn(testData.comparableSecond.conditionAdjustment, 1)
                .verifyNetPropertyAdjustmentsByCompIndex()
                .verifyNetPropertyAdjustmentsByCompIndex(1)
                .verifyAdjustedPriceByColumn()
                .verifyAdjustedPriceByColumn(1)
                .clickAddOtherAdjustmentButton()
                .editOtherAdjustmentRowName(testData.otherAdjustmentName, testData.otherAdjustmentNewName)
                .deleteOtherAdjustmentRow(testData.otherAdjustmentNewName);

            cy.stepInfo("3. Custom other adjustment name checks");
            Sales._AdjustComps.clickAddOtherAdjustmentButton()
                .editOtherAdjustmentRowName(testData.otherAdjustmentName, testData.otherAdjustmentNewName)
                .clickSaveButton()
                .deleteOtherAdjustmentRow(testData.otherAdjustmentNewName);
            cy.reload();
            Sales._AdjustComps.verifyRowWithNameExists(testData.otherAdjustmentNewName)
                .editOtherAdjustmentRowName(testData.otherAdjustmentNewName, testData.otherAdjustmentName)
                .clickSaveButton()
                .editOtherAdjustmentRowName(testData.otherAdjustmentName, testData.otherAdjustmentNewName);
            cy.reload();
            Sales._AdjustComps.verifyRowWithNameExists(testData.otherAdjustmentName)
                .verifyRowWithNameNotExists(testData.otherAdjustmentNewName)
                .editOtherAdjustmentRowName(testData.otherAdjustmentName, testData.otherAdjustmentNewName)
                .clickAddOtherAdjustmentButton()
                .editOtherAdjustmentRowName(testData.otherAdjustmentName, testData.otherAdjustmentNewName, 1);

            cy.stepInfo("4. Custom other adjustment values checks");
            Sales._AdjustComps.enterOtherAdjustmentByColumn(testData.comparableFirst.otherAdjustment, 0, 0)
                .enterOtherAdjustmentByColumn(testData.comparableSecond.otherAdjustment, 0, 1)
                .verifyNetPropertyAdjustmentsByCompIndex()
                .verifyNetPropertyAdjustmentsByCompIndex(1)
                .verifyAdjustedPriceByColumn()
                .verifyAdjustedPriceByColumn(1)
                .enterOtherAdjustmentByColumn(testData.comparableFirst.otherNewAdjustment, 0, 0)
                .enterOtherAdjustmentByColumn(testData.comparableSecond.otherNewAdjustment, 0, 1)
                .verifyNetPropertyAdjustmentsByCompIndex()
                .verifyNetPropertyAdjustmentsByCompIndex(1)
                .verifyAdjustedPriceByColumn()
                .verifyAdjustedPriceByColumn(1)
                .clearOtherAdjustmentByColumn(0, 0)
                .enterOtherAdjustmentByColumn(0, 0, 1)
                .verifyNetPropertyAdjustmentsByCompIndex()
                .verifyNetPropertyAdjustmentsByCompIndex(1)
                .verifyAdjustedPriceByColumn()
                .verifyAdjustedPriceByColumn(1);
            NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport()
                .waitForReportGenerated();
        });
    });