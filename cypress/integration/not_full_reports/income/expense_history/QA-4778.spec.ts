import testData from "../../../../fixtures/not_full_reports/income/expense_history/QA-4778.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from "../../../../actions";
import ExpenseHistoryCells from "../../../../enums/expense/expenseHistoryTableRows.enum";

describe("Verify the calculation on the Expense History page", { tags: [ "@income", "@expense_history" ] }, () => {

    beforeEach("Create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        _NavigationSection.navigateToExpenseHistory();
        testData.periods.forEach(period => {
            Income._ExpenseHistory.selectExpensePeriod(period.expensePeriodType)
                .enterExpenseYear(period.year);
            if (period.month) {
                Income._ExpenseHistory.enterExpenseMonth(period.month);
            }
            Income._ExpenseHistory.clickAddExpenseYearButton();
            ExpenseHistoryCells.operatingExpensesCellsNamesArray.forEach(cell => {
                Income._ExpenseHistory.enterIssueByColIndex(period[cell], cell);
            });
            Income._ExpenseHistory.verifyTotalOpExpensesByColIndex()
                .verifyTOEExcludingRETByIndex(period.realEstateTaxes, )
                .verifyNetOpIncomeByIndex(period.grossRevenue)
                .clickRemoveExpensePeriodButtonBuColIndex();
        });
        // TODO: Add stepInfos for test
    });
});