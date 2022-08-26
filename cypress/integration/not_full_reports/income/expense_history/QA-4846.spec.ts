import testData from "../../../../fixtures/not_full_reports/income/expense_history/QA-4846.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from "../../../../actions";
import Enums from "../../../../enums/enums";

describe("Verify that combined utilities expenses is enabled", { tags: [ "@income", "@expense_history" ] }, () => {

    beforeEach("Create report", () => {
        createReport(testData.reportCreationData);
    });

    it("[QA-4846] Test body", () => {
        const combinedElectricityFuel = testData.electricity + testData.fuel;
        const combinedAll = testData.electricity + testData.fuel + testData.waterAndSewer;
        cy.stepInfo("1. Navigate to Expense History, add any Expense Period");
        _NavigationSection.navigateToExpenseHistory();
        Income._ExpenseHistory.selectExpensePeriod(testData.expensePeriodType)
            .enterExpenseYear(testData.year)
            .clickAddExpenseYearButton();

        cy.stepInfo("2. Broken out is selected by default, fill electricity, fuel and waterSewer values");
        Income._ExpenseHistory.enterIssueByColIndex(testData.electricity, Enums.EXPENSE_HISTORY_TABLE_ROWS.electricity)
            .enterIssueByColIndex(testData.fuel, Enums.EXPENSE_HISTORY_TABLE_ROWS.fuel)
            .enterIssueByColIndex(testData.waterAndSewer, Enums.EXPENSE_HISTORY_TABLE_ROWS.waterAndSewer);

        cy.stepInfo("3. Change from Broken out to Combined electricity and fuel, verify changed raws and cells values");
        Income._ExpenseHistory.checkUtilitiesExpensesOption(Enums.UTILITY_EXPENSES.combinedElectricityAndFuel)
            .verifyTableStateByUtilityExpensesRadio(Enums.UTILITY_EXPENSES.combinedElectricityAndFuel)
            .verifyIssueTextByColIndex(combinedElectricityFuel, Enums.EXPENSE_HISTORY_TABLE_ROWS.utilities)
            .verifyIssueTextByColIndex(testData.waterAndSewer, Enums.EXPENSE_HISTORY_TABLE_ROWS.waterAndSewer);

        cy.stepInfo("4. Change from Combined electricity and fuel to combined all, verify cells values and raws");
        Income._ExpenseHistory.checkUtilitiesExpensesOption(Enums.UTILITY_EXPENSES.combinedAll)
            .verifyTableStateByUtilityExpensesRadio(Enums.UTILITY_EXPENSES.combinedAll)
            .verifyIssueTextByColIndex(combinedAll, Enums.EXPENSE_HISTORY_TABLE_ROWS.utilities);

        cy.stepInfo("5. Change from Combined all to Combined electricity and fuel, verify cells values");
        Income._ExpenseHistory.checkUtilitiesExpensesOption(Enums.UTILITY_EXPENSES.combinedElectricityAndFuel)
            .verifyTableStateByUtilityExpensesRadio(Enums.UTILITY_EXPENSES.combinedElectricityAndFuel)
            .verifyIssueTextByColIndex(combinedAll, Enums.EXPENSE_HISTORY_TABLE_ROWS.utilities)
            .verifyIssueTextByColIndex(0, Enums.EXPENSE_HISTORY_TABLE_ROWS.waterAndSewer)
            .enterIssueByColIndex(testData.waterAndSewer, Enums.EXPENSE_HISTORY_TABLE_ROWS.waterAndSewer);

        cy.stepInfo("6. Change from Combined electricity and fuel to Broken out, verify cells values");
        Income._ExpenseHistory.checkUtilitiesExpensesOption(Enums.UTILITY_EXPENSES.brokenOut)
            .verifyTableStateByUtilityExpensesRadio(Enums.UTILITY_EXPENSES.brokenOut)
            .verifyIssueTextByColIndex(combinedAll, Enums.EXPENSE_HISTORY_TABLE_ROWS.electricity)
            .verifyIssueTextByColIndex(0, Enums.EXPENSE_HISTORY_TABLE_ROWS.fuel)
            .verifyIssueTextByColIndex(testData.waterAndSewer, Enums.EXPENSE_HISTORY_TABLE_ROWS.waterAndSewer)
            .enterIssueByColIndex(testData.electricity, Enums.EXPENSE_HISTORY_TABLE_ROWS.electricity)
            .enterIssueByColIndex(testData.fuel, Enums.EXPENSE_HISTORY_TABLE_ROWS.fuel);

        cy.stepInfo("7. Change from Broken out to Combined All, verify cells values");
        Income._ExpenseHistory.checkUtilitiesExpensesOption(Enums.UTILITY_EXPENSES.combinedAll)
            .verifyTableStateByUtilityExpensesRadio(Enums.UTILITY_EXPENSES.combinedAll)
            .verifyIssueTextByColIndex(combinedAll, Enums.EXPENSE_HISTORY_TABLE_ROWS.utilities);

        cy.stepInfo("8. Change from Combined All to Broken out, verify cells values");
        Income._ExpenseHistory.checkUtilitiesExpensesOption(Enums.UTILITY_EXPENSES.brokenOut)
            .verifyTableStateByUtilityExpensesRadio(Enums.UTILITY_EXPENSES.brokenOut)
            .verifyIssueTextByColIndex(combinedAll, Enums.EXPENSE_HISTORY_TABLE_ROWS.electricity)
            .verifyIssueTextByColIndex(0, Enums.EXPENSE_HISTORY_TABLE_ROWS.fuel)
            .verifyIssueTextByColIndex(0, Enums.EXPENSE_HISTORY_TABLE_ROWS.waterAndSewer);
    });
});