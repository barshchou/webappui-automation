import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5008.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe(`[] [Income>Expense forecast] “Include Expense on Pro Forma” checkbox is displayed under existing expense card`,
    { tags:[ "@income", "@expense_forecast" ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
 //  cy.saveLocalStorage();
    });
    
    // beforeEach(() => {
    //     cy.restoreLocalStorage();
    // });

    it("Test body", () => {
        cy.stepInfo(`1. Go to Expense Forecast`);
        _NavigationSection.navigateToExpenseForecast();



array.forEach(element => {
    
});



        cy.stepInfo(`2. Add new custom category`);
        Income._ExpenseForecastActions.addCustomExpenseCategory(testData.customCategory.name);
        

        cy.stepInfo(`[QA-5052] => 3. Fill expenses forecast for custom and regular categories`);
        testData.expensesItems.forEach(foreCastItem => {
            Income._ExpenseForecastActions.enterForecastItemForecast(foreCastItem);
        });
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.firstCustomCategory, true, 0);
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.secondCustomCategory, true, 1);
        
        cy.stepInfo(`[QA-5052] => 4. Verify total expenses calculation and commentary`);
        Income._ExpenseForecastActions.verifyTOECommentary(testData.commentaryTotalExpenses.generatedPerSF)
            .verifyTotalForecast();


        deleteReport(testData.reportCreationData.reportNumber);
    });
});