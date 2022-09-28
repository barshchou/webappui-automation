import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5812.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { Income, DataCollections } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import tableExpenseHistoryCellNames from "../../../../enums/expense/expenseHistoryTableRows.enum";

describe("[QA-5812] Historical expenses Per SF in Total Operating Expenses is correctly calculated and displayed",
    { tags: [ "@snapshot_tests", "@income", "@expense_forecast", "@bug", "@WEB-7110" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("1. Pre-condition: Fill in Residential Units and GBA on Property > Summary form");
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits)
                .enterGrossBuildingArea(testData.buildingDescription.grossArea);

            cy.stepInfo("2. Go to Income > Expense History");
            _NavigationSection.navigateToExpenseHistory();

            cy.stepInfo(`3. Add columns for all types of Expense Period: 
            Actual, Actual T12, Annualized Historical and Projection + 
            Fill in few Operating Expenses in Expense History table for all added columns and save changes`);
            testData.periods.forEach((period) => {
                Income._ExpenseHistory.selectExpensePeriod(period.expensePeriodType)
                    .enterExpenseYear(period.year)
                    .clickAddExpenseYearButton()
                    .enterIssueByColIndex(period.miscellaneous, tableExpenseHistoryCellNames.miscellaneous)
                    .enterIssueByColIndex(period.managementFees, tableExpenseHistoryCellNames.management)
                    .enterIssueByColIndex(period.replacementReserves, tableExpenseHistoryCellNames.reserves);
            });
            testData.periodsMonth.forEach((period) => {
                Income._ExpenseHistory.selectExpensePeriod(period.expensePeriodType)
                    .enterExpenseMonth(period.month)
                    .enterExpenseYear(period.year)
                    .clickAddExpenseYearButton()
                    .enterIssueByColIndex(period.miscellaneous, tableExpenseHistoryCellNames.miscellaneous)
                    .enterIssueByColIndex(period.managementFees, tableExpenseHistoryCellNames.management)
                    .enterIssueByColIndex(period.replacementReserves, tableExpenseHistoryCellNames.reserves);
            });
            Income._ExpenseHistory.verifyAverageTable();

            cy.stepInfo(`4. Go to Expense Forecast and make sure that Per SF radio button 
            is selected for Total Operating Expenses card`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.actualTotalOperatingExpensesItem)
                .verifyForecastItemBasis(testData.actualTotalOperatingExpensesItem);

            cy.stepInfo(`5.1 Check historical expenses values for Total Operating Expenses card. 
            They should be calculated for each expense type as: 
            [Expense Period type]Total Operating Expenses (excl. RE Taxes) / GBA`);
            Income._ExpenseForecastActions
                .verifyForecastItemByExpensePeriodType(testData.actualTotalOperatingExpensesItem,
                    testData.buildingDescription, "Actual", true)
                .verifyForecastItemByExpensePeriodType(testData.t12TotalOperatingExpensesItem,
                    testData.buildingDescription, "Actual T12", true)
                .verifyForecastItemByExpensePeriodType(testData.historicalTotalOperatingExpensesItem,
                    testData.buildingDescription, "Annualized Historical", true)
                .verifyForecastItemByExpensePeriodType(testData.ownerProjectionTotalOperatingExpensesItem,
                    testData.buildingDescription, "Owner's Projection", true)
                .hideHeader()
                .clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo(`5.2 Check historical expenses values for Total Operating Expenses card. 
            They should be correctly displayed on slide bars`);
            Income._ExpenseForecastActions.matchElementSnapshot(
                Income._ExpenseForecastActions.Page.toeCard, testData.totalOperatingExpensesPerSfCardSnapshotName, 
                { padding: [ 0, 100 ] });
        });
    });
