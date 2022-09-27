import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4572.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from '../../../../actions/base';
import { Sales, ReviewExport } from "../../../../actions";

// ToDo: Test might fail due to problem with rounding: https://bowery.atlassian.net/browse/QA-6594
describe("Check custom adjustment", 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {

        it("Test body", () => {
            cy.stepInfo("1. Create report");
            createReport(testData.reportCreationData);

            cy.stepInfo("2. Navigate to Find comps page and add a couple of sales comps");
            _NavigationSection.navigateToFindComps();
            for (let i = 1; i < 3; i++) {
                Sales._FindComps.AddressSearch.openAddressSearchTab()
                    .addCompByParameter(testData.filter, i);
            }

            cy.stepInfo("3. Open Adjust comps page, verify custom adjustment row can be added and edited");
            _NavigationSection.navigateToAdjustComps();
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

            cy.stepInfo("4. Custom other adjustment name checks");
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

            cy.stepInfo("5. Custom other adjustment values checks");
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

            cy.stepInfo("6. Export report");
            _NavigationSection.openReviewAndExport();
            ReviewExport.selectSectionsToIncludeInExport(testData.sectionToExport)
                .generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it('Check export', () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.stepInfo(`7. Verify that any custom adjustments added to the report export 
                        in the Sales Comparison Approach > Comparables Sales Adjustment Grid`);
                    cy.xpath(`//h1[.='${testData.exportSection}']
                        /following-sibling::p[.='Comparable Sales Adjustment Grid']`)
                        .next().within(() => {
                            cy.contains("tr", "Net Adjustments").prev().find("td").eq(0)
                                .should("have.text", testData.otherAdjustmentNewName);
                        });
                });
        });
    });