import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4054.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Sales from "../../../../actions/sales/sales.manager";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";

describe(`Prospective Market Value As Stabilized -> Less Residential Rent Loss 
                data is pulled from Cap Rate Conclusion`, () => {
    before("Login action", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfResUnits(testData.data.numberOfResUnits);
        Property.Summary.enterNumberOfCommercialUnits(testData.data.numberOfCommercialUnits);
        NavigationSection.clickSalesButton().openAdjustCompsInSales();
        Sales.AdjustComps.checkCalculationUnitsRadio(testData.data.calculationUnits);
        NavigationSection.navigateToSalesValueConclusion();
        cy.xpath("//tbody[@data-qa='as-is-as-stabilized']/tr[2]/td[2]").should('have.text', testData.data.valueColumnLabel);
        Sales.ValueConclusion.verifyNumberOfUnitsAmount(testData.data.totalNumberOfUnitsLabel);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});