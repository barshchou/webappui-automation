/// <reference types="cypress-grep" />
import testData from "../../../../fixtures/not_full_reports/income/expense_history/QA-4931.fixture";
import {
  createReport,
  deleteReport,
} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Income from "../../../../actions/income/income.manager";

describe("Historical expense Repairs & Maintenance Per Unit is correctly calculated and displayed", () => {
  before("Login, create report", () => {
    createReport(testData.reportCreationData);
  });

  it("Test body", { tags: "@snapshot_tests" }, () => {
    cy.stepInfo("1. Go to Income > Expense History");
    NavigationSection.Actions.navigateToExpenseHistory();

    cy.stepInfo(
      "2. Add columns for all types of Expense Period: Actual, Actual T12, Annualized Historical and Projection"
    );
    testData.periods.forEach((per, index) => {
      Income.ExpenseHistory.Actions.selectExpensePeriod(per.expensePeriod)
        .enterExpenseYear(per.year)
        .clickAddExpenseYearButton()
        .enterRepairsAndMaintenanceByColIndex(per.repairsAndMaintenance, index);
    });

    testData.periodsMonth.forEach((per, index) => {
      Income.ExpenseHistory.Actions.selectExpensePeriod(per.expensePeriod)
        .enterExpenseMonth(per.month)
        .enterExpenseYear(per.year)
        .clickAddExpenseYearButton()
        .enterRepairsAndMaintenanceByColIndex(per.repairsAndMaintenance, index);
    });

    cy.stepInfo(
      "3. Fill in Repairs & Maintenance field for all added columns and save changes"
    );
    Income.ExpenseHistory.Actions.verifyAverageTable();

    cy.stepInfo(
      "4. Go to Expense Forecast and make sure that Per Unit radiobutton is selected for Repairs & Maintenance card"
    );
    // Income.ExpenseForecast.Actions.verifyForecastItemBasis(
    //   testData.repairsItem
    // ); // before need to navigate

    // cy.stepInfo(`5. Check historical expenses values for Repairs & Maintenance card. They should be
    //   5.1 calculated for each expense type as: [Expense Period type]Repairs & Maintenance / # of Residential Units
    //   5.2 correctly displayed on slidebars`);
  });
});