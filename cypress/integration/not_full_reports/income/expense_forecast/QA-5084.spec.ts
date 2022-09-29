import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5084.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe(`Warming Message is displayed if user renames a custom expenses with a name that already used`,
    { tags:[ "@income", "@expense_forecast" ] }, () => {
        beforeEach("Login, create report, setup building", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.residentialUnits)
                .enterGrossBuildingArea(testData.grossBuildingArea);
        });

        it("[QA-5084]", () => {
            cy.stepInfo(`1. Go to Expense Forecast and add new Expense Forecast with valid name (ex. Heating)`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`2. Add new custom category`);
            Income._ExpenseForecastActions.addCustomExpenseCategory(testData.customCategory.name)
                .chooseForecastItemBasis(testData.customCategory, true);

            cy.stepInfo(`3. Update custom category with the name of existing expense and verify 
            Warming Message is displayed`);
            Income._ExpenseForecastActions.Page
                .editCustomExpenseCategoryButton(testData.customCategory.name, true).click();
            Income._ExpenseForecastActions.Page.newCategoryExpenseName.clear()
                .type(`${testData.regularExpense}{downArrow}{enter}`);
            Income._ExpenseForecastActions.verifyCustomCategoryAlreadyExists();
            Income._ExpenseForecastActions.Page.formSaveBtn(1).should('be.disabled');
            Income._ExpenseForecastActions.Page.formCancelButton().click();
        });
    });