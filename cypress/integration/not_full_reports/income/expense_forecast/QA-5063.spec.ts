import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5063.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe(`Editing Expense Category modal closes on clicking Cancel on Editing Expense Category modal`,
    { tags:[ "@income", "@expense_forecast" ] }, () => {
        beforeEach("Login, create report, setup building", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.residentialUnits)
                .enterGrossBuildingArea(testData.grossBuildingArea);
        });

        it("[QA-5063]", () => {
            cy.stepInfo(`1. Go to Expense Forecast and add new Expense Forecast with valid name (ex. Heating)`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`2. Add new custom category`);
            Income._ExpenseForecastActions.addCustomExpenseCategory(testData.customCategory.name)
                .chooseForecastItemBasis(testData.customCategory, true);

            cy.stepInfo(`3. Update custom category with the new name`);
            Income._ExpenseForecastActions.Page
                .editCustomExpenseCategoryButton(testData.customCategory.name, true).click();
            Income._ExpenseForecastActions.Page.newCategoryExpenseName.clear()
                .type(`${testData.newCategoryName}{downArrow}{enter}`);

            cy.stepInfo(`4. Verify that Expense Category modal closes on clicking Cancel on 
            Editing Expense Category modal`);
            Income._ExpenseForecastActions.Page.formSaveBtn(1).should('be.enabled');
            Income._ExpenseForecastActions.Page.formCancelButton().should('be.enabled').click();

            cy.stepInfo(`5. Verify that no category name changes`);
            Income._ExpenseForecastActions.Page
                .editCustomExpenseCategoryButton(testData.customCategory.name, true).click();
        });
    });