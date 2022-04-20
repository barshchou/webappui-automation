/// <reference types="cypress-grep" />
import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4932.fixture";
import {
  createReport,
  deleteReport,
} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Income from "../../../../actions/income/income.manager";


describe("Comparable Min, Max, Avg values for Repairs & Maintenance Per Unit are correctly calculated and displayed", () => {
  before("Login, create report", () => {
    createReport(testData.reportCreationData);
  });

  it("Test body", { tags: "@snapshot_tests" }, () => {
    cy.stepInfo("1. Go to Income > Comparable Expenses");
    NavigationSection.Actions.navigateToComparableExpenses();

    cy.stepInfo("2. Add several comps (via Search, Filter or Add blank column)");
    testData.comparables.forEach((comp, index) => {
      Income.ComparableExpenses.Actions.clickAddBlankColumnButton()
        .enterAddressByColumnIndex(comp.address, index)
        .enterResidentialUnitsByColumnIndex(comp.resUnits, index)
        .enterCellDollarValueByColumnIndex(Income.ComparableExpenses.Page.repairsCells, comp.repairsAndMaintenance, index);
    });

    cy.stepInfo("3. Make sure that Repairs & Maintenance and Residential Units fields are filled in for all added columns and save changes");
    NavigationSection.Actions.navigateToExpenseForecast();

    cy.stepInfo("4. Go to Expense Forecast and make sure that Per Unit radiobutton is selected for Repairs & Maintenance card");
    Income.ExpenseForecast.chooseForecastItemBasis(testData.repairsItem);
    Income.ExpenseForecast.Actions.verifyForecastItemBasis(testData.repairsItem);

    cy.stepInfo(`
      5. Check Comp Min, Comp Max and Comp Avg values for Repairs & Maintenance card. They should be
        5.1 calculated as: Min, Max and Avg of range of values [Comp_Repairs & Maintenance / Residential Units]
        5.2 correctly displayed on slidebar`);
    Income.ExpenseForecast.Actions.verifyForecastItemCompMin(testData.repairsItem,testData.comparables)
      .verifyForecastItemCompAverage(testData.repairsItem, testData.comparables)
      .verifyForecastItemCompMax(testData.repairsItem, testData.comparables)
      .hideExpenseForecastHeader();

    Income.ExpenseForecast.Actions.matchElementSnapshot(
      Income.ExpenseForecast.Page.RepairsAndMaintenanceCard, testData.repairsCardSnapshotName, {padding: [10, 100]});

    deleteReport(testData.reportCreationData.reportNumber);
  });
});