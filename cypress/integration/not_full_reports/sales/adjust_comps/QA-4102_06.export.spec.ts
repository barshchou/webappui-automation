import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4102_06.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { ReviewExport, Sales } from "../../../../actions";

describe("[QA-4102_06] -> Total Utility Adjustments in Sales Adjustment Grid is calculated with correct formula", 
    { tags:[ "@sales", "@adjust_comps", "@check_export", ] }, () => {
        it("Test body", () => {
            cy.stepInfo(`1. Precondition: Create a new report with Multifamily or Mixed-use income type`);
            createReport(testData.reportCreationData);

            // test case note: According to Ira - we're allow to add one comp
            cy.stepInfo(`2. Precondition: Add several comps in the Sales > Find Sales Comparables page`);
            _NavigationSection.navigateToFindComps();
            Sales._FindComps.selectCompFromMap();

            cy.stepInfo(`3. Precondition: Open Sales > Adjust Comps page`);
            _NavigationSection.navigateToAdjustComps();
            Sales._AdjustComps.checkCalculationUnitsRadio()
                .enterMarketAdjustmentsGroup(Object.keys(testData.comparablesAdjustments), 
                    Object.values(testData.comparablesAdjustments))
                .verifyTrendedPricePerBasis(Object.values(testData.comparablesAdjustments), testData.basis);

            cy.stepInfo(`4. Verify PSF, Per Residential Units, Per Total Units radio buttons are displayed`);
            testData.calculationUnits.forEach(unit => {
                Sales._AdjustComps.checkCalculationUnitsRadio(unit);
            });

            cy.stepInfo(`5. Precondition: Per Residential Units is selected as 
                        Calculation Units in Sales Comparables Setup`);
            Sales._AdjustComps.checkCalculationUnitsRadio()
                .enterMarketAdjustmentsGroup(Object.keys(testData.comparablesAdjustments), 
                    Object.values(testData.comparablesAdjustments));
            
            cy.stepInfo(`6. Verify the row below Net Market Adjustments row in 
                        Total Footer of the Sales Adjustment Grid`);
            /**
             * note: If we want position assert - we better add data-qa first 
             * since it's completely impossible to access cells elements
             */
            Sales._AdjustComps.Page.cellCumulativePriceName("Unit").should("be.visible");

            cy.stepInfo("7. Verify the the calculations of the Cumulative Price Per Unit row"); 
            Sales._AdjustComps.verifyTrendedPricePerBasis(Object.values(testData.comparablesAdjustments), 
                testData.basis);

            cy.stepInfo("8. Cumulative Price Per Unit' is displayed in bold");
            Sales._AdjustComps.Actions.checkCumulativePriceName("Unit");

            cy.stepInfo("9. Generate and download this report");
            _NavigationSection.Actions.openReviewAndExport();
            ReviewExport.Actions.generateDocxReport()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it("Check export", () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
            
                    cy.stepInfo(`10. Open Sales Adjustment Grid → verify the 'Cumulative Price Per Unit:' 
                                label and the same calculations`);
                    cy.contains(testData.exportSectionName)
                        .parent().parent().parent()
                        .scrollIntoView().find("td").last().should("have.text", testData.cumulativePricePerUnit);
                }); 
        });
    });