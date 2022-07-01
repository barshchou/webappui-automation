import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4924.fixture";
import Property from "../../../../actions/property/property.manager";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Income from "../../../../actions/income/income.manager";
import tableExpenseHistoryCellNames from "../../../../../cypress/enums/expense/expenseHistoryTableRows.enum";

describe("User selects Per SF radiobutton for Repairs & Maintenance on Expense Forecast form and historical expenses per SF are correctly calculated and displayed", 
    { tags:[ "@income", "@expense_forecast", "@snapshot_tests" ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterGrossBuildingArea(testData.buildingDescription.grossArea)
            .enterNumberOfResUnits(testData.buildingDescription.numberOfUnits); 
    });

    it("Test body", () => {

        cy.stepInfo(`QA-4924 =>1. Go to Income > Expense History`);
        NavigationSection.navigateToExpenseHistory();

        cy.stepInfo('QA-4924 => 2. Add columns for all types of Expense Period: Actual, Actual T12, Annualized Historical and Projection');
        Income.ExpenseHistory.selectExpensePeriod(testData.actual.periodValue)
            .verifyExpenseMonth(testData.actual.month, testData.actual.periodValue)
            .enterExpenseYear(testData.actual.expenseYear)
            .clickAddExpenseYearButton()
            .selectExpensePeriod(testData.t12.periodValue)
            .enterExpenseMonth(testData.t12.month)
            .enterExpenseYear(testData.t12.expenseYear)
            .clickAddExpenseYearButton()
            .selectExpensePeriod(testData.historical.periodValue)
            .enterExpenseMonth(testData.historical.month)
            .enterExpenseYear(testData.historical.expenseYear)
            .clickAddExpenseYearButton()
            .selectExpensePeriod(testData.projection.periodValue)
            .verifyExpenseMonth(testData.projection.month, testData.projection.periodValue)
            .verifyExpenseYear(testData.projection.expenseYear)
            .clickAddExpenseYearButton();


        cy.stepInfo(`QA-4924 => 3. Fill in Repairs & Maintenance field for all added columns and save changes`);
        Income.ExpenseHistory.enterIssueByColIndex(testData.actual.repairsAndMaintenanceExpense, tableExpenseHistoryCellNames.repairsAndMaintenance, 3)
            .enterIssueByColIndex(testData.t12.repairsAndMaintenanceExpense, tableExpenseHistoryCellNames.repairsAndMaintenance, 2)
            .enterIssueByColIndex(testData.historical.repairsAndMaintenanceExpense, tableExpenseHistoryCellNames.repairsAndMaintenance, 1)
            .enterIssueByColIndex(testData.projection.repairsAndMaintenanceExpense, tableExpenseHistoryCellNames.repairsAndMaintenance, 0);
        NavigationSection.navigateToExpenseForecast();


        cy.stepInfo(`QA-4924 =>4. Go to Expense Forecast and make sure that Per SF radiobutton is selected for Repairs & Maintenance card`);
        Income.ExpenseForecast.Actions.verifyForecastItemBasis(testData.actualRepairsAndMaintenanceItem);


        cy.stepInfo('QA-4924 =>5.1 Check historical expenses values for Repairs & Maintenance card. They should be calculated for each expense type as: [Expense Period type]Repairs & Maintenance / GBA');
        Income.ExpenseForecast.Actions.verifyForecastItemByExpensePeriodType(testData.actualRepairsAndMaintenanceItem, testData.buildingDescription, "Actual")
            .verifyForecastItemByExpensePeriodType(testData.t12RepairsAndMaintenanceItem, testData.buildingDescription, "Actual T12")
            .verifyForecastItemByExpensePeriodType(testData.historicalRepairsAndMaintenanceItem, testData.buildingDescription, "Annualized Historical")
            .verifyForecastItemByExpensePeriodType(testData.ownerProjectionRepairsAndMaintenanceItem, testData.buildingDescription, "Owner's Projection")
            .hideHeader();

        cy.stepInfo(`QA-4924 =>5.2 Check historical expenses values for Repairs & Maintenance card. They should be correctly displayed on slidebars`);

        Income.ExpenseForecast.Actions.matchElementSnapshot(
            Income.ExpenseForecast.Page.repairsAndMaintenanceCard, testData.repairsAndMaintenanceCardSnapshotName,
            { padding: [ 10, 100 ] });

        deleteReport(testData.reportCreationData.reportNumber);
    });

});
