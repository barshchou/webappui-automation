/// <reference types="cypress-grep" />
import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4942.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Income from "../../../../actions/income/income.manager";

describe("Comparable Min, Max, Avg values for Fuel Per SF are correctly calculated and displayed", () => {

    before("Login, create report",  () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", { tags: '@snapshot_tests' }, () => {
        cy.stepInfo("1. Go to Income > Comparable Expenses");
        NavigationSection.Actions.navigateToComparableExpenses();

        cy.stepInfo(`2. Add several comps (via Search, Filter or Add blank column) and make sure that Fuel  
        and Square Feet fields are filled in for all added columns and save changes`);
        testData.comparables.forEach((comp) => {
            Income.ComparableExpenses.Actions.clickAddBlankColumnButton()
                .enterAddressByColumnIndex(comp.address)
                .enterCellDollarValueByColumnIndex(Income.ComparableExpenses.Page.fuelCells, comp.fuel)
                .enterSquareFeetByColumnIndex(comp.squareFeet);
        });

        cy.stepInfo("3. Go to Expense Forecast and make sure that Per SF radiobutton is selected for Fuel card");
        NavigationSection.Actions.navigateToExpenseForecast();
        Income.ExpenseForecast.Actions.verifyForecastItemBasis(testData.fuelItem);

        cy.stepInfo(`4. Check Comp Min, Comp Max and Comp Avg values for Fuel card. They should be calculated as: 
        Min, Max and Avg of range of values [CompFuel / Square Feet]`);
        Income.ExpenseForecast.Actions.verifyForecastItemCompMin(testData.fuelItem, testData.comparables)
            .verifyForecastItemCompAverage(testData.fuelItem, testData.comparables)
            .verifyForecastItemCompMax(testData.fuelItem, testData.comparables)
            .hideExpenseForecastHeader();

        cy.stepInfo("4. Check Comp Min, Comp Max and Comp Avg values for Fuel card. They should be correctly displayed on a slidebar");
        Income.ExpenseForecast.Actions.matchElementSnapshot(
            Income.ExpenseForecast.Page.FuelCard, testData.fuelCardSnapshotName, {padding: [10, 100]});
        deleteReport(testData.reportCreationData.reportNumber);
    });
});