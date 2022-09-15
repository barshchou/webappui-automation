import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4529.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Sales, ReviewExport } from "../../../../actions";

// ToDo: Test fails due to problem with rounding: https://bowery.atlassian.net/browse/QA-6954
describe("Check custom Utilities adjustment", 
    { tags:[ "@sales", "@adjust_comps", "@check_export" ] }, () => {
        it("Verify custom utilities adjustments on UI and prepare report for export", () => {
            createReport(testData.reportCreationData);

            cy.stepInfo(`1. Navigate to Find comps page and add a couple of sales comps`);
            _NavigationSection.navigateToFindComps();
            for (let i = 1; i < 3; i++) {
                Sales._FindComps.AddressSearch.openAddressSearchTab()
                    .addCompByParameter(i, testData.compProperty, testData.compStatusDate);
            }

            cy.stepInfo(`2. Open Adjust comps page, verify custom utilities adjustment row can be added and deleted`);
            _NavigationSection.navigateToAdjustComps();
            Sales._AdjustComps.clickAddCustomUtilitiesAdjustment()
                .editOtherUtilitiesAdjustmentRowName(testData.customUtilitiesAdjustmentDefaultName, 
                    testData.newCustomUtilitiesAdjustmentName)
                .deleteOtherAdjustmentRow(testData.newCustomUtilitiesAdjustmentName);

            cy.stepInfo(`3. Other Utilities Adjustment name checks`);
            Sales._AdjustComps.clickAddCustomUtilitiesAdjustment()
                .editOtherUtilitiesAdjustmentRowName(testData.customUtilitiesAdjustmentDefaultName, 
                    testData.newCustomUtilitiesAdjustmentName)
                .clickSaveButton()
                .deleteOtherAdjustmentRow(testData.newCustomUtilitiesAdjustmentName);
            cy.reload();
            Sales._AdjustComps.verifyRowWithNameExists(testData.newCustomUtilitiesAdjustmentName)
                .editOtherUtilitiesAdjustmentRowName(testData.newCustomUtilitiesAdjustmentName, 
                    testData.customUtilitiesAdjustmentDefaultName)
                .clickSaveButton()
                .editOtherUtilitiesAdjustmentRowName(testData.customUtilitiesAdjustmentDefaultName, 
                    testData.newCustomUtilitiesAdjustmentName);
            cy.reload();
            Sales._AdjustComps.verifyRowWithNameExists(testData.customUtilitiesAdjustmentDefaultName)
                .verifyRowWithNameNotExists(testData.newCustomUtilitiesAdjustmentName)
                .editOtherUtilitiesAdjustmentRowName(testData.customUtilitiesAdjustmentDefaultName, 
                    testData.newCustomUtilitiesAdjustmentName)
                .clickAddCustomUtilitiesAdjustment()
                .editOtherUtilitiesAdjustmentRowName(testData.customUtilitiesAdjustmentDefaultName, 
                    testData.newCustomUtilitiesAdjustmentName, 1);

            cy.stepInfo(`4. Custom other adjustment values checks`);
            Sales._AdjustComps
                .enterOtherUtilitiesAdjustmentByColumn(testData.comparableFirst.otherUtilityAdjustment, 0, 0)
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
                .verifyAdjustedPriceByColumn(1)
                .enterOtherUtilitiesAdjustmentByColumn(testData.comparableFirst.otherUtilityAdjustment, 0, 0)
                .enterOtherUtilitiesAdjustmentByColumn(testData.comparableSecond.otherUtilityAdjustment, 0, 1)
                .clickSaveButton();

            cy.stepInfo(`5. Prepare report for export validation`);
            _NavigationSection.openReviewAndExport();
            ReviewExport.selectSectionsToIncludeInExport(testData.sectionToExport)
                .generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it(`Check export document other utilities values and commentaries`, () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.stepInfo(`6. Verify that other utilities adjustments are added to 
                                Comparable Sales Adjustment Grid `);
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.contains(testData.exportSectionName).next().scrollIntoView()
                        .find("tr").contains("Utility").parent().parent().within((element) => {
                            cy.wrap(element).find("td").eq(2).find("p")
                                .should("have.text", `${testData.comparableFirst.otherUtilityAdjustment}%`);
                            cy.wrap(element).find("td").eq(3).find("p")
                                .should("have.text", `${testData.comparableSecond.otherUtilityAdjustment}%`);
                        });

                    cy.stepInfo(`7. Verify that generated commentaries contain valid other utilities adjustments`);
                    cy.contains(testData.exportSectionName).next().next().next().scrollIntoView()
                        .find("tr").contains("Utility").parent().parent().within((element) => {
                            cy.wrap(element).find("td").eq(1).find("p").eq(2)
                                .should("have.text", `${testData.otherUtilitiesCommentaries}`);
                        });
                });
        });
    });