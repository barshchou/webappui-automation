import testData from "../../../../fixtures/not_full_reports/income/expense_history/QA-4846.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from "../../../../actions";
import Enums from "../../../../enums/enums";

describe("Verify that combined utilities expenses is enabled", { tags: [ "@income", "@expense_history" ] }, () => {

    beforeEach("Create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        const combinedElectricityFuel = testData.electricity + testData.fuel;
        const combinedAll = testData.electricity + testData.fuel + testData.waterAndSewer;
        _NavigationSection.navigateToExpenseHistory();
        Income._ExpenseHistory.selectExpensePeriod(testData.expensePeriodType)
            .enterExpenseYear(testData.year)
            .clickAddExpenseYearButton()
            .enterIssueByColIndex(testData.electricity, Enums.EXPENSE_HISTORY_TABLE_ROWS.electricity)
            .enterIssueByColIndex(testData.fuel, Enums.EXPENSE_HISTORY_TABLE_ROWS.fuel)
            .enterIssueByColIndex(testData.waterAndSewer, Enums.EXPENSE_HISTORY_TABLE_ROWS.waterAndSewer)
            .checkUtilitiesExpensesOption(Enums.UTILITY_EXPENSES.combinedElectricityAndFuel)
            .verifyTableStateByUtilityExpensesRadio(Enums.UTILITY_EXPENSES.combinedElectricityAndFuel)
            .verifyIssueTextByColIndex(combinedElectricityFuel, Enums.EXPENSE_HISTORY_TABLE_ROWS.utilities)
            .verifyIssueTextByColIndex(testData.waterAndSewer, Enums.EXPENSE_HISTORY_TABLE_ROWS.waterAndSewer)
            .checkUtilitiesExpensesOption(Enums.UTILITY_EXPENSES.combinedAll)
            .verifyTableStateByUtilityExpensesRadio(Enums.UTILITY_EXPENSES.combinedAll)
            .verifyIssueTextByColIndex(combinedAll, Enums.EXPENSE_HISTORY_TABLE_ROWS.utilities)
            .checkUtilitiesExpensesOption(Enums.UTILITY_EXPENSES.combinedElectricityAndFuel)
            .verifyTableStateByUtilityExpensesRadio(Enums.UTILITY_EXPENSES.combinedElectricityAndFuel)
            .verifyIssueTextByColIndex(combinedAll, Enums.EXPENSE_HISTORY_TABLE_ROWS.utilities)
            .verifyIssueTextByColIndex(0, Enums.EXPENSE_HISTORY_TABLE_ROWS.waterAndSewer)
            .enterIssueByColIndex(testData.waterAndSewer, Enums.EXPENSE_HISTORY_TABLE_ROWS.waterAndSewer)
            .checkUtilitiesExpensesOption(Enums.UTILITY_EXPENSES.brokenOut)
            .verifyTableStateByUtilityExpensesRadio(Enums.UTILITY_EXPENSES.brokenOut)
            .verifyIssueTextByColIndex(combinedAll, Enums.EXPENSE_HISTORY_TABLE_ROWS.electricity)
            .verifyIssueTextByColIndex(0, Enums.EXPENSE_HISTORY_TABLE_ROWS.fuel)
            .verifyIssueTextByColIndex(testData.waterAndSewer, Enums.EXPENSE_HISTORY_TABLE_ROWS.waterAndSewer)
            .enterIssueByColIndex(testData.electricity, Enums.EXPENSE_HISTORY_TABLE_ROWS.electricity)
            .enterIssueByColIndex(testData.fuel, Enums.EXPENSE_HISTORY_TABLE_ROWS.fuel)
            .checkUtilitiesExpensesOption(Enums.UTILITY_EXPENSES.combinedAll)
            .verifyTableStateByUtilityExpensesRadio(Enums.UTILITY_EXPENSES.combinedAll)
            .verifyIssueTextByColIndex(combinedAll, Enums.EXPENSE_HISTORY_TABLE_ROWS.utilities)
            .checkUtilitiesExpensesOption(Enums.UTILITY_EXPENSES.brokenOut)
            .verifyTableStateByUtilityExpensesRadio(Enums.UTILITY_EXPENSES.brokenOut)
            .verifyIssueTextByColIndex(combinedAll, Enums.EXPENSE_HISTORY_TABLE_ROWS.electricity)
            .verifyIssueTextByColIndex(0, Enums.EXPENSE_HISTORY_TABLE_ROWS.fuel)
            .verifyIssueTextByColIndex(0, Enums.EXPENSE_HISTORY_TABLE_ROWS.waterAndSewer);
        // TODO: Add stepInfos for test

    });
});