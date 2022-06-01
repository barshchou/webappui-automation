import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5011.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import expensesCardsNames from "../../../../../cypress/enums/expenseForecast.enum";


describe(`[QA-5011] [Income>Expense forecast] “Include Expense on Pro Forma” checkbox and tooltip functionality`,
    { tags: [ "@income", "@expense_forecast" ] }, () => {

        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            cy.saveLocalStorage();
        });

        beforeEach(() => {
            cy.restoreLocalStorage();
        });

        it("[QA-5011]", () => {
            cy.stepInfo(`1. Go to Income > Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`2. Verify if “Include Expense on Pro Forma” is unselected -> this  expense category 
            is NOT displayed in the Pro Forma page> Operating Expenses section`);
            Income._ExpenseForecastActions
            expensesCardsNames.expenseCardsIDArray.forEach(element => {
                Income._ExpenseForecastActions.uncheckIncludeInProFormaCheckbox(element);
            });
            _NavigationSection.navigateToProForma();
            testData.expensesByDefaultArray.forEach(element => {
                Income._ProFormaActions.Page.categoryCellTotal(element).should('not.exist');
            });

            cy.stepInfo(`3. Verify if “Include Expense on Pro Forma” is unselected -> this  expense category 
            is NOT displayed in the Expense Forecast page>Total operating expenses  card and generated comment`);
            _NavigationSection.navigateToExpenseForecast();

            
            testData.array1.forEach(element => {
                Income._ExpenseForecastActions.enterForecastItemForecast(element);
            });

            // cy.stepInfo(`3. Verify  “Include Expense on Pro Forma” checkbox is NOT displayed under custom expense card`);
            // Income._ExpenseForecastActions.addCustomExpenseCategory(testData.customCategory.name);
            
        });

      

        // it("[QA-5010]", () => {
        //     cy.stepInfo(``);
        //     deleteReport(testData.reportCreationData.reportNumber);
        // });
    });