import testData from "../../../../fixtures/not_full_reports/income/expense_history/QA-4778.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from "../../../../actions";
import ExpenseHistoryCells from "../../../../enums/expense/expenseHistoryTableRows.enum";

describe("Verify the calculation on the Expense History page", { tags: [ "@income", "@expense_history" ] }, () => {

    beforeEach("Create report", () => {
        createReport(testData.reportCreationData);
        cy.stepInfo("Navigate to Income -> Expense History page");
        _NavigationSection.navigateToExpenseHistory();
    });

    testData.periods.forEach(period => {
        it(`Test with ${period.expensePeriodType} expense period`, () => {
            cy.stepInfo(`1. Add '${period.expensePeriodType}' expense period`);
            Income._ExpenseHistory.selectExpensePeriod(period.expensePeriodType)
                .enterExpenseYear(period.year);
            if (period.month) {
                Income._ExpenseHistory.enterExpenseMonth(period.month);
            }
            Income._ExpenseHistory.clickAddExpenseYearButton();

            cy.stepInfo("2. Fill table with data");
            ExpenseHistoryCells.operatingExpensesCellsNamesArray.forEach(cell => {
                Income._ExpenseHistory.enterIssueByColIndex(period[cell], cell);
            });

            cy.stepInfo(`3. Verify calculations for Total OP Expenses, TOE excl RET and NET OP Income 
            for ${period.expensePeriodType} expense period`);
            Income._ExpenseHistory.verifyTotalOpExpensesByColIndex()
                .verifyTOEExcludingRETByIndex(period.realEstateTaxes, )
                .verifyNetOpIncomeByIndex(period.grossRevenue)
                .clickRemoveExpensePeriodButtonBuColIndex();
        });
    });
});