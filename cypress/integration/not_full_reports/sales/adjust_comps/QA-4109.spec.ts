import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4109.fixture";
import Sales from "../../../../actions/sales/sales.manager";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { ReviewExport } from "../../../../actions";
import { pathSpecData } from "../../../../../utils/fixtures.utils";

describe("Adjusted Price per Residential Unit in Sales Adjustment Grid is calculated with correct formula", 
    { tags: [ "@adjust_comps", "@sales", "@check_export" ] }, () => {

        it("Test body", () => {
            createReport(testData.reportCreationData);

            NavigationSection.navigateToFindComps();
            Sales.FindComps.selectCompFromMap();
        
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
        
            deleteReport(testData.reportCreationData.reportNumber);
        });

        it("Check export", () => {
            Cypress.config().baseUrl = null;
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.stepInfo(`[QA-4109] → open Sales Adjustment Grid → 
                    verify the 'Cumulative Price Per SF:' label and the same calculations`);
                    cy.readFile(`./cypress/spec_data/${Cypress.spec.name}.txt`).then(text => {
                        cy.contains("Cumulative Price Per SF")
                            .parent().parent().parent()
                            .scrollIntoView().find("td").last()
                            .should("have.text", text);
                    });
                }); 
        });
    });
    });
