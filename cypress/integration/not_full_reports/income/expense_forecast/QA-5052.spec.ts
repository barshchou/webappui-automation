import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5052.fixture";
import { _NavigationSection} from "../../../../actions/base";
import { Income } from "../../../../actions";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";

describe(`[QA-5052] Appraiser's Forecast of Custom Expense Forecast is included in Total Operating Expenses calculation`, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        cy.saveLocalStorage();
    });
    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("Test body", () => {
        cy.stepInfo(`[QA-5052] => 1. Go to Expense Forecast`);
        _NavigationSection.navigateToExpenseForecast();

        cy.stepInfo(`[QA-5052] => 2. Add new custom categories`);
        _NavigationSection.navigateToExpenseForecast();
        Income._ExpenseForecastActions.addCustomExpenseCategory(testData.firstCustomCategory.name);
        Income._ExpenseForecastActions.addCustomExpenseCategory(testData.secondCustomCategory.name);

        cy.stepInfo(`[QA-5052] => 3. Fill expenses forecast for custom and regular categories`);
        testData.expensesItems.forEach(foreCastItem => {
            Income._ExpenseForecastActions.enterForecastItemForecast(foreCastItem);
        });
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.firstCustomCategory, true);
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.secondCustomCategory, true);
        
        cy.stepInfo(`[QA-5052] => 4. Verify total expenses calcualtion and commentary`);
        Income._ExpenseForecastActions.verifyForecastCommentary(testData.commentaryTotalExpenses.generatedPerSF, testData.expensesItems.find(itemName => itemName.name=="total"));

        deleteReport(testData.reportCreationData.reportNumber);
    });
});