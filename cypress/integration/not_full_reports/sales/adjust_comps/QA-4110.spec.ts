import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4110.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { ReviewExport, Sales } from "../../../../actions";

describe("Total Utility Adjustments in Sales Adjustment Grid is calculated with correct formula", 
    { tags:[ "@sales", "@adjust_comps", "@check_export" ] }, () => {

    it("Test body", () => {
        createReport(testData.reportCreationData);
        cy.stepInfo("1. Navigate to Find comps page and add a sales comps");
        _NavigationSection.navigateToFindComps();
        Sales._FindComps.selectCompFromMapByAddress(testData.compAddress);


        cy.stepInfo(`2. Verify if Per Total Units is selected as Sales Comparables Setup then
                    Trended Price per Unit in Total Footer = Price  per Unit + Price  per Unit * Property Rights + 
                    Price  per Unit * Financing Terms + Price  per Unit * Conditions of Sale +  per Unit * Market Conditions (Time))
                    or
                    Trended Price per Unit = [Unadjusted Price] * (1 + (SUM[Unadjusted Adjustments]))/ # of total units`);
        _NavigationSection.navigateToAdjustComps();
        Sales._AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits)
            .enterMarketAdjustmentsGroup(Object.keys(testData.comparablesAdjustments), Object.values(testData.comparablesAdjustments))
            .verifyTrendedPricePerBasis(Object.values(testData.comparablesAdjustments), testData.basis);

        cy.stepInfo(`[QA-4110] -> 'Cumulative Price Per SF' is displayed in bold`);
        Sales._AdjustComps.Page.cellCumulativePriceName("Unit").should("have.css", "font-weight", "500");

        cy.stepInfo(`[QA-4110] -> Generate and download this report `);
        Sales._AdjustComps.Page.SaveBtn.click();
        _NavigationSection.Actions.openReviewAndExport();
        ReviewExport.Actions.generateDocxReport().downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Check export", () => {
        cy.stepInfo(`
        [QA-4110] → open Sales Adjustment Grid 
        → verify the 'Cumulative Price Per Unit:' label and the same calculations`);

        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docx_html: "html" }).then(file => {
            cy.log(<string>file);
            cy.visit(<string>file);
            cy.contains("Cumulative Price Per Unit")
            .parent().parent().parent()
            .scrollIntoView().find("td").last().should("have.text", testData.cumulativePricePerUnit);
        }); 
    }
);});