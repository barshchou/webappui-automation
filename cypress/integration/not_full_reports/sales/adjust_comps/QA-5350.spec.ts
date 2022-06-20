import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-5350.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";


describe("Calculation of Market Condition adjustment", 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Navigate to Find comps page and add a sales comp");
        NavigationSection.navigateToFindComps();
        Sales.FindComps.selectCompFromMapByAddress(testData.address);

        cy.stepInfo("2. Open Adjust comps page, and copy paste value into Market Condition Adjustment field");
        NavigationSection.navigateToAdjustComps();
        Sales.AdjustComps.emulateCopyPaste(Sales.AdjustComps.Page.getMarketAdjustmentsRowCells(
            Object.keys(testData.comparablesAdjustments)[0]), 
            `${Object.values(testData.comparablesAdjustments)[1]}`
        );
        Sales.AdjustComps.Page.getMarketAdjustmentsRowCells(Object.keys(testData.comparablesAdjustments)[0])
            .should("have.value", `${Object.values(testData.comparablesAdjustments)[1]}`);

        cy.stepInfo("3. Fill all Market Condition Adjustment field");
        Sales.AdjustComps.enterMarketAdjustmentsGroup(Object.keys(testData.comparablesAdjustments), Object.values(testData.comparablesAdjustments));

        cy.stepInfo("4. Verify there is a tooltip icon which explains the derivation of the formula");
        Sales.AdjustComps.Page.marketConditionAdjustmentTooltip.trigger("mouseover").invoke("show");
        cy.get('[role="tooltip"]').invoke("text").then(text => {
            expect(text).to.be.equal(testData.tooltipText);
        });

        cy.stepInfo("5. Verify there is a button to Apply the calculation as market condition adjustments to the comps");
        Sales.AdjustComps.Page.applyMarketConditionAdjustmentButton.should("be.visible");

        cy.stepInfo("6. Verify Market Condition Calculation formula");

        deleteReport(testData.reportCreationData.reportNumber);
    });
});