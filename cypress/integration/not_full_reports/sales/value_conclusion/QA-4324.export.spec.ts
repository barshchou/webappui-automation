import { conditionalDescribe } from './../../../checkIsProd.utils';
import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4324.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { ReviewExport } from "../../../../actions";
import { pathSpecData } from "../../../../../utils/fixtures.utils";

// TODO: Remove conditional describe (due to sales comp update) when find comp approach change 
conditionalDescribe("Sales Value Conclusion Discussion Generated Commentary has dynamic prices", 
    { tags: [ "@sales", "@value_conclusion" ] }, () => {
        it("[QA-4324]", () => {
            cy.stepInfo(`1. Create new report or open the report which is already created`);
            createReport(testData.reportCreationData);

            cy.stepInfo(`2. Go to Sales → Find Comps and select some comps`);
            NavigationSection.navigateToFindComps();
            Sales.FindComps.resetAllFilters();
            for (let comp = 0; comp < testData.compsAmount; comp++) {
                Sales.FindComps.selectCompFromMap(comp)
                    .openCompForEdit(comp)
                    .updateCompPropertyInfo(testData.compGbaInput)
                    .updateSaleInfoPrice(testData.contractPrice)
                    .saveCompChanges();
            }

            cy.stepInfo(`3. Go to Sales → Adjust Comps → Sales Adjustment Grid table and adjust prices`);
            NavigationSection.navigateToAdjustComps();
            Sales.AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits);
            testData.compsAdjustments.forEach((adjustments, index) => {
                Sales.AdjustComps.enterMarketAdjustmentsGroup(Object.keys(adjustments), 
                    Object.values(adjustments), index);
            });

            cy.stepInfo(`4. Verify generated commentary with adjusted prices`);
            NavigationSection.navigateToSalesValueConclusion();
            Sales.ValueConclusion.enterSaleValueConclusion(testData.valueConclusion)
                .verifyGeneratedCommentaryCalculated();

            cy.stepInfo('5. Export report');
            NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it(`Check export`, () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.stepInfo(`6. Open downloaded report and go to Sales Comparison Approach. Compare Generated 
                    Commentary from the downloaded report with the Generated Commentary from the App → Sales → 
                    Value Conclusion → Sales Value Conclusion Discussion → Generated Commentary`);
                    cy.readFile(`${pathSpecData()}${Cypress.spec.name}.txt`).then(text => { 
                        cy.contains(text);
                    });
                }); 
        });
    });