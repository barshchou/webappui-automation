import { conditionalDescribe } from './../../../checkIsProd.utils';
import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4109.fixture";
import Sales from "../../../../actions/sales/sales.manager";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { ReviewExport } from "../../../../actions";

conditionalDescribe("Adjusted Price per SF in Sales Adjustment Grid is calculated with correct formula", 
    { tags: [ "@adjust_comps", "@sales", "@check_export" ] }, () => {

        it("[QA-4109]", () => {
            createReport(testData.reportCreationData);

            NavigationSection.navigateToFindComps();
            Sales.FindComps.zoomInAndResetFilters();
            Sales.FindComps.selectCompFromMap()
                .openCompForEdit()
                .updateCompPropertyInfo()
                .updateSaleInfoPrice(testData.contractPrice)
                .saveCompChanges();
        
            NavigationSection.navigateToAdjustComps();
            Sales.AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits)
                .enterMarketAdjustmentsGroup(Object.keys(testData.comparableAdjustment), 
                    Object.values(testData.comparableAdjustment))
                .verifyTrendedPricePerBasis(Object.values(testData.comparableAdjustment), testData.basis);

            cy.stepInfo(`[QA-4109] -> 'Cumulative Price Per SF' is displayed in bold`);
            Sales.AdjustComps.Actions.checkCumulativePriceName("SF");

            cy.stepInfo(`[QA-4109] -> Generate and download this report `);
            NavigationSection.Actions.openReviewAndExport();
            ReviewExport.Actions.generateDocxReport()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it("Check export", () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.stepInfo(`[QA-4109] → open Sales Adjustment Grid → 
                                verify the 'Cumulative Price Per SF:' label and the same calculations`);
                    cy.readFile(`./cypress/spec_data/${Cypress.spec.name}/${Cypress.spec.name}.txt`).then(text => {
                        cy.contains(testData.exportSectionName)
                            .parent().parent().parent()
                            .scrollIntoView().find("td").last()
                            .should("have.text", text);
                    });
                }); 
        });
    });
