import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4106.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { ReviewExport, Sales } from "../../../../actions";

describe("[QA-4106] -> Total Utility Adjustments in Sales Adjustment Grid is calculated with correct formula", 
    { tags:[ "@sales", "@adjust_comps", "@check_export", ] }, () => {

    it("Test body", () => {
        cy.stepInfo(`[QA-4106] -> Precondition: Create a new report with Multifamily or Mixed-use income type`);
        createReport(testData.reportCreationData);

        // test case note: According to Ira - we're allow to add one comp
        cy.stepInfo(`[QA-4106] -> Precondition: Add several comps in the Sales > Find Sales Comparables page`);
        _NavigationSection.navigateToFindComps();
        Sales._FindComps.selectCompFromMapByAddress(testData.compAddress);

        cy.stepInfo(`[QA-4106] -> Precondition: Open Sales > Adjust Comps page`);
        _NavigationSection.navigateToAdjustComps();

        cy.stepInfo(`[QA-4106] -> Precondition: Per Residential Units is selected as Calculation Units in Sales Comparables Setup`);
        Sales._AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits)
            .enterMarketAdjustmentsGroup(Object.keys(testData.comparablesAdjustments), Object.values(testData.comparablesAdjustments));
            
        cy.stepInfo(`1.[QA-4106] -> Verify the row below Net Market Adjustments row in Total Footer of the Sales Adjustment Grid`);
        /**
         * note: If we want position assert - we better add data-qa first 
         * since it's completely impossible to acces cells elements
         */
        Sales._AdjustComps.Page.cellCumulativePriceName("Unit").should("be.visible");

        cy.stepInfo(`2.[QA-4106] -> Verify the the calculations of the Cumulative Price Per Unit row`); 
        Sales._AdjustComps.verifyTrendedPricePerBasis(Object.values(testData.comparablesAdjustments), testData.basis);

        cy.stepInfo(`[QA-4106] -> 'Cumulative Price Per SF' is displayed in bold`);
        Sales._AdjustComps.Page.cellCumulativePriceName("Unit").should("have.css", "font-weight", "500");

        cy.stepInfo(`[QA-4106] -> Generate and download this report `);
        Sales._AdjustComps.Page.SaveBtn.click();
        _NavigationSection.Actions.openReviewAndExport();
        ReviewExport.Actions.generateDocxReport().downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Check export", () => {
        cy.stepInfo(`
        [QA-4106] → open Sales Adjustment Grid 
        → verify the 'Cumulative Price Per Unit:' label and the same calculations`);

        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docx_html: "html" }).then(file => {
            cy.log(<string>file);
            cy.visit(<string>file);
            cy.contains("Cumulative Price Per Unit")
            .parent().parent().parent()
            .scrollIntoView().find("td").last().should("have.text", testData.cumulativePricePerUnit);
        }); 
    });
});