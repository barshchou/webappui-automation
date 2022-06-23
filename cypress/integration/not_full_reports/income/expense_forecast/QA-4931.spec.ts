import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4931.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Income from "../../../../actions/income/income.manager";
import Property from "../../../../actions/property/property.manager";
import tableExpenseHistoryCellNames from "../../../../../cypress/enums/expense/expenseHistoryTableRows.enum";

describe("Historical expense Repairs & Maintenance Per Unit is correctly calculated and displayed", 
  { tags:[ "@expense_forecast", "@income", "@snapshot_tests" ] }, () => {
    
  before("Login, create report", () => {
    createReport(testData.reportCreationData);
  });

  it("Test body", () => {
    cy.stepInfo("Pre-condition: Residential Units should be filled in on Property > Summary form");
    NavigationSection.navigateToPropertySummary();
    Property.Summary.enterNumberOfResUnits(Object.values(testData.buildingDescription)[1]);


    cy.stepInfo("1. Go to Income > Expense History");
    NavigationSection.Actions.navigateToExpenseHistory();

    cy.stepInfo("2. Add columns for all types of Expense Period: Actual, Actual T12, Annualized Historical and Projection");
    testData.periods.forEach((per) => {
      Income.ExpenseHistory.Actions.selectExpensePeriod(per.expensePeriodType)
        .enterExpenseYear(per.year)
        .clickAddExpenseYearButton()
        .enterIssueByColIndex(per.repairsAndMaintenance, tableExpenseHistoryCellNames.repairsAndMaintenance);
    });

    testData.periodsMonth.forEach((per) => {
      Income.ExpenseHistory.Actions.selectExpensePeriod(per.expensePeriodType)
        .enterExpenseMonth(per.month)
        .enterExpenseYear(per.year)
        .clickAddExpenseYearButton()
        .enterIssueByColIndex(per.repairsAndMaintenance, tableExpenseHistoryCellNames.repairsAndMaintenance);
    });

    cy.stepInfo("3. Fill in Repairs & Maintenance field for all added columns and save changes");
    Income.ExpenseHistory.Actions.verifyAverageTable();

    cy.stepInfo("4. Go to Expense Forecast and make sure that Per Unit radiobutton is selected for Repairs & Maintenance card");
    NavigationSection.Actions.navigateToExpenseForecast();
    Income.ExpenseForecast.chooseForecastItemBasis(testData.actualRepairsItem);
    Income.ExpenseForecast.Actions.verifyForecastItemBasis(testData.actualRepairsItem);

    cy.stepInfo(`5. Check historical expenses values for Repairs & Maintenance card. They should be
      5.1 calculated for each expense type as: [Expense Period type]Repairs & Maintenance / # of Residential Units
      5.2 correctly displayed on slidebars`);
      Income.ExpenseForecast.Actions.verifyForecastItemByExpensePeriodType(testData.actualRepairsItem, testData.buildingDescription, "Actual")
      .verifyForecastItemByExpensePeriodType(testData.t12RepairsItem, testData.buildingDescription, "Actual T12")
      .verifyForecastItemByExpensePeriodType(testData.historicalRepairsItem, testData.buildingDescription, "Annualized Historical")
      .verifyForecastItemByExpensePeriodType(testData.ownerProjectionRepairsItem, testData.buildingDescription, "Owner's Projection")
      .hideExpenseForecastHeader();

      Income.ExpenseForecast.Actions.matchElementSnapshot(
        Income.ExpenseForecast.Page.repairsAndMaintenanceCard, testData.repairsCardSnapshotName, { padding: [ 10, 100 ] });
  
      deleteReport(testData.reportCreationData.reportNumber);
  
  }); 
});