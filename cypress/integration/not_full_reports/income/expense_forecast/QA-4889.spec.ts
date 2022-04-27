/// <reference types="cypress-grep" />

import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4889.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import Income from "../../../../actions/income/income.manager";
import {_NavigationSection} from "../../../../actions/base";


describe("Comparable Min, Max, Avg values for Electricity Per Unit are correctly calculated and displayed", {tags:"@fix"},() => {


  before("Login, create report", () => {
    createReport(testData.reportCreationData);
  });


  it("Test body", { tags: "@snapshot_tests" }, () => {
    cy.stepInfo("1. Go to Income > Comparable Expenses");
    _NavigationSection.Actions.navigateToComparableExpenses();

    cy.stepInfo("2. Add several comps (via Search, Filter or Add blank column)");
    testData.comparables.forEach((comp, index) => {
      Income.ComparableExpenses.Actions.clickAddBlankColumnButton()
        .enterAddressByColumnIndex(comp.address, index)
        .enterResidentialUnitsByColumnIndex(comp.resUnits, index)
        .enterCellDollarValueByColumnIndex(Income.ComparableExpenses.Page.electricityCells, comp.electricity, index);
    });

    cy.stepInfo("3. Make sure that Electricity and Residential Units fields are filled in for all added columns and save changes");
    _NavigationSection.Actions.navigateToExpenseForecast();

    cy.stepInfo("4. Go to Expense Forecast and make sure that Per Unit radiobutton is selected for Electricity card");
    Income.ExpenseForecast.chooseForecastItemBasis(testData.electricityItem);
    Income.ExpenseForecast.Actions.verifyForecastItemBasis(testData.electricityItem);

    cy.stepInfo(`
      5. Check Comp Min, Comp Max and Comp Avg values for Electricity card. They should be
        5.1 calculated as: Min, Max and Avg of range of values [CompElectricity / Residential Units]
        5.2 correctly displayed on slidebar`);
    Income.ExpenseForecast.Actions.verifyForecastItemCompMin(testData.electricityItem, testData.comparables)
      .verifyForecastItemCompAverage(testData.electricityItem, testData.comparables)
      .verifyForecastItemCompMax(testData.electricityItem, testData.comparables)
      .hideExpenseForecastHeader();

    Income.ExpenseForecast.Actions.matchElementSnapshot(
      Income.ExpenseForecast.Page.ElectricityCard, testData.electricityCardSnapshotName, { padding: [10, 100] });

    cy.stepInfo("6. Delete report");
    deleteReport(testData.reportCreationData.reportNumber);
  });
});