import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5777.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { Property, Income } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import tableExpenseHistoryCellNames from "../../../../enums/expense/expenseHistoryTableRows.enum";

describe("[QA-5777] Historical expense Replacement Reserves Per SF is correctly calculated and displayed",
    { tags: [ "@snapshot_tests", "@income", "@expense_forecast" ] }, () => {

        before("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {

            cy.stepInfo("1. Pre-condition: Fill in Residential Units and GBA on Property > Summary form");
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits)
                .enterGrossBuildingArea(testData.buildingDescription.grossArea);

            cy.stepInfo("2. Go to Income > Expense History");
            _NavigationSection.Actions.navigateToExpenseHistory();

            cy.stepInfo(`3. Add columns for all types of Expense Period: Actual, Actual T12, Annualized Historical and Projection + 
                         Fill in Replacement Reserves field for all added columns and save changes`);
            testData.periods.forEach((period) => {
                Income._ExpenseHistory.Actions.selectExpensePeriod(period.expensePeriodType)
                    .enterExpenseYear(period.year)
                    .clickAddExpenseYearButton()
                    .enterIssueByColIndex(period.replacementReserves, tableExpenseHistoryCellNames.reserves);
            });
            testData.periodsMonth.forEach((period) => {
                Income._ExpenseHistory.Actions.selectExpensePeriod(period.expensePeriodType)
                    .enterExpenseMonth(period.month)
                    .enterExpenseYear(period.year)
                    .clickAddExpenseYearButton()
                    .enterIssueByColIndex(period.replacementReserves, tableExpenseHistoryCellNames.reserves);
            });
            Income._ExpenseHistory.Actions.verifyAverageTable();

            cy.stepInfo("4. Go to Expense Forecast and make sure that Per SF radiobutton is selected for Replacement Reserves card");
            _NavigationSection.Actions.navigateToExpenseForecast();
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.actualReplacementReservesItem)
                .verifyForecastItemBasis(testData.actualReplacementReservesItem);

            cy.stepInfo(`5.1 Check historical expenses values for Replacement Reserves card. They should be calculated 
                         for each expense type as: [Expense Period type]Replacement Reserves / GBA`);
            Income._ExpenseForecastActions.Actions.verifyForecastItemByExpensePeriodType(testData.actualReplacementReservesItem,
                testData.buildingDescription, "Actual")
                .verifyForecastItemByExpensePeriodType(testData.t12ReplacementReservesItem,
                    testData.buildingDescription, "Actual T12")
                .verifyForecastItemByExpensePeriodType(testData.historicalReplacementReservesItem,
                    testData.buildingDescription, "Annualized Historical")
                .verifyForecastItemByExpensePeriodType(testData.ownerProjectionReplacementReservesItem,
                    testData.buildingDescription, "Owner's Projection")
                .hideHeader()
                .clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo("5.2 Check historical expenses values for Replacement Reserves card. They should be correctly displayed on slidebars");
            Income._ExpenseForecastActions.Actions.matchElementSnapshot(
                Income._ExpenseForecastActions.Page.forecastItemCard(
                    Income._ExpenseForecastActions.getItemNameForAverage(
                        testData.actualReplacementReservesItem.name)), testData.replacementReservesPerSfCardSnapshotName, { padding: [ 0, 100 ] });
        });
    });
