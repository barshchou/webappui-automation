import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4054.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";
import { Sales } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe("The amount column of the # of Units shows the correct number of units", 
    { tags: [ "@sales", "@value_conclusion" ] }, () => {
        
    before("Login action", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Navigate to Property -> Summary and enter number of residential units and number of commercial units");
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfResUnits(testData.data.numberOfResUnits);
        Property._Summary.enterNumberOfCommercialUnits(testData.data.numberOfCommercialUnits);
        cy.stepInfo("2. Select the Per Total Units radio button in the Sale Comparables Setup and save it.");
        _NavigationSection.clickSalesButton().openAdjustCompsInSales();
        Sales._AdjustComps.checkCalculationUnitsRadio(testData.data.calculationUnits);
        cy.stepInfo("3. Proceed to the Sales > Value Conclusion >  Sales Value Conclusion Table and verify the value column is labeled # of Units.");
        _NavigationSection.navigateToSalesValueConclusion();
        cy.xpath("//tbody[@data-qa='as-is-as-stabilized']/tr[2]/td[2]").should('have.text', testData.data.valueColumnLabel);
        cy.stepInfo("4. Verify that the # of Units shows the correct number of units (residential + commercial).");
        Sales._ValueConclusion.verifyNumberOfUnitsAmount(testData.data.totalNumberOfUnitsLabel);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});