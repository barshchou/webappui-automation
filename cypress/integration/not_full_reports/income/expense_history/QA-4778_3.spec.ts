import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from "../../../../fixtures/not_full_reports/income/expense_history/QA-4778_3.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from "../../../../actions";
import ExpenseHistoryCells from "../../../../enums/expense/expenseHistoryTableRows.enum";

describe(`Verify the calculation on the Expense History page with ${testData.period.expensePeriodType}`,
    { tags: [ "@income", "@expense_history" ] }, () => {

        beforeEach("Create report", () => {
            createReport(testData.reportCreationData);
            cy.stepInfo("Navigate to Income -> Expense History page");
            _NavigationSection.navigateToExpenseHistory();
        });

        it(`[QA-4778] Test body`, () => {
            cy.stepInfo(`1. Add '${testData.period.expensePeriodType}' expense period`);
            Income._ExpenseHistory.selectExpensePeriod(testData.period.expensePeriodType)
                .enterExpenseMonth(testData.period.month)
                .enterExpenseYear(testData.period.year);
            Income._ExpenseHistory.clickAddExpenseYearButton();

            cy.stepInfo("2. Fill table with data");
            ExpenseHistoryCells.operatingExpensesCellsNamesArray.forEach(cell => {
                Income._ExpenseHistory.enterIssueByColIndex(testData.period[cell], cell);
            });

            cy.stepInfo(`3. Verify calculations for Total OP Expenses, TOE excl RET and NET OP Income 
            for ${testData.period.expensePeriodType} expense period`);
            Income._ExpenseHistory.verifyTotalOpExpensesByColIndex()
                .verifyTOEExcludingRETByIndex(testData.period.realEstateTaxes,)
                .verifyNetOpIncomeByIndex(testData.period.grossRevenue)
                .clickRemoveExpensePeriodButtonBuColIndex();
        });
    });