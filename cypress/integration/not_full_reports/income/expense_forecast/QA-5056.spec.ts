import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5056.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe(`Trashcan button is displayed only for Custom Expense Forecast`,
    { tags:[ "@income", "@expense_forecast" ] }, () => {
        beforeEach("Login, create report, setup building", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.residentialUnits)
                .enterGrossBuildingArea(testData.grossBuildingArea);
        });

        it("[QA-5056]", () => {
            cy.stepInfo(`1. Go to Expense Forecast and add new Expense Forecast with valid name (ex. Heating)`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`2. Add new custom category`);
            Income._ExpenseForecastActions.addCustomExpenseCategory(testData.customCategory.name)
                .chooseForecastItemBasis(testData.customCategory, true);

            cy.stepInfo(`3. Verify Trashcan button is displayed only for Custom Expense Forecast cards.`);
            Income._ExpenseForecastActions.Page
                .customCategoryDeleteButton(testData.customCategory.name).should('exist');

            cy.stepInfo(`4. Verify Trashcan button is not displayed for existing expenses.`);
            testData.expenses.forEach(expenseName => {
                Income._ExpenseForecastActions.Page.forecastItemCardFull(expenseName, false).within(() => {
                    cy.get(`[data-testid='DeleteIcon']`).should('not.exist');
                });
            });
        });
    });