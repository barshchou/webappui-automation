import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5052.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe(`[QA-5052] Appraiser's Forecast of Custom Expense Forecast is included 
in Total Operating Expenses calculation`,
{ tags:[ "@fix", "@income", "@expense_forecast", "@snapshot_tests" ] }, () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo(`[QA-5052] => 1. Go to Expense Forecast`);
        _NavigationSection.navigateToExpenseForecast();

        cy.stepInfo(`[QA-5052] => 2. Add new custom categories`);
        Income._ExpenseForecastActions.addCustomExpenseCategory(testData.firstCustomCategory.name);
        Income._ExpenseForecastActions.addCustomExpenseCategory(testData.secondCustomCategory.name);

        cy.stepInfo(`[QA-5052] => 3. Fill expenses forecast for custom and regular categories`);
        testData.expensesItems.forEach(foreCastItem => {
            Income._ExpenseForecastActions.enterForecastItemForecast(foreCastItem);
        });
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.firstCustomCategory, true, 0);
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.secondCustomCategory, true, 1);
        
        cy.stepInfo(`[QA-5052] => 4. Verify total expenses calculation and commentary`);
        Income._ExpenseForecastActions.verifyTOECommentary(testData.commentaryTotalExpenses.generatedPerSF)
            .verifyTotalForecast();

        cy.stepInfo(`[QA-5052] => 5. Verify if Sliding bar graphic on Total Operating Expenses card 
        is displayed correctly`);
        Income._ExpenseForecastActions.Actions.matchElementSnapshot(
            Income._ExpenseForecastActions.Page.toeCard, testData.totalExpensesSnapshotName, { padding: [ 0, 100 ] }
        );
    });
});