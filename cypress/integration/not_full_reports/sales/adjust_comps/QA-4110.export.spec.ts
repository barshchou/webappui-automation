import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4110.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { ReviewExport, Sales } from "../../../../actions";

describe("Total Utility Adjustments in Sales Adjustment Grid is calculated with correct formula", 
    { tags:[ "@sales", "@adjust_comps", "@check_export" ] }, () => {

        it("Test body", () => {
            createReport(testData.reportCreationData);
            cy.stepInfo(`1. Navigate to Find comps page and add a sales comps`);
            _NavigationSection.navigateToFindComps();
            Sales._FindComps.selectCompFromMapByAddress(testData.compAddress);


            cy.stepInfo(`2. Verify if Per Total Units is selected as Sales Comparables Setup then
                        Trended Price per Unit in Total Footer = Price  per Unit + Price  per Unit * Property Rights + 
                        Price  per Unit * Financing Terms + Price  per Unit * 
                        Conditions of Sale + per Unit * Market Conditions (Time)) 
                        or Trended Price per Unit = [Unadjusted Price] * (1 + (SUM[Unadjusted Adjustments]))/ # 
                        of total units`);
            _NavigationSection.navigateToAdjustComps();
            Sales._AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits)
                .enterMarketAdjustmentsGroup(Object.keys(testData.comparablesAdjustments),
                    Object.values(testData.comparablesAdjustments))
                .verifyTrendedPricePerBasis(Object.values(testData.comparablesAdjustments), testData.basis);

            cy.stepInfo(`[QA-4110] -> 'Cumulative Price Per Unit' is displayed in bold`);
            Sales._AdjustComps.checkCumulativePriceName("Unit");

            cy.stepInfo(`[QA-4110] -> Generate and download this report `);
            _NavigationSection.openReviewAndExport();
            ReviewExport.selectSectionsToIncludeInExport(testData.sectionToExport)
                .generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it("Check export", () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.stepInfo(`[QA-4110] → open Sales Adjustment Grid → verify the 'Cumulative Price Per Unit:' 
                                label and the same calculations`);
                    cy.contains(testData.exportSectionName)
                        .parent().parent().parent()
                        .scrollIntoView().find("td").last().should("have.text", testData.cumulativePricePerUnit);
                }); 
        }
        ); 
    });