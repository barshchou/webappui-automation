import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5060.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe(`Editing Expense Category modal opens on clicking Edit button on Custom Expense Forecast card`,
    { tags:[ "@income", "@expense_forecast" ] }, () => {
        beforeEach("Login, create report, setup building", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.residentialUnits)
                .enterGrossBuildingArea(testData.grossBuildingArea);
        });

        it("[QA-5060]", () => {
            cy.stepInfo(`1. Go to Expense Forecast and add new Expense Forecast with valid name (ex. Heating)`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`2. Add new custom category`);
            Income._ExpenseForecastActions.addCustomExpenseCategory(testData.customCategory.name)
                .chooseForecastItemBasis(testData.customCategory, true);

            cy.stepInfo(`3. Verify Edit button is displayed for Custom Expense Forecast cards.`);
            Income._ExpenseForecastActions.Page
                .editCustomExpenseCategoryButton(testData.customCategory.name, true)
                .should('exist')
                .click();

            cy.stepInfo(`4. Verify Edit modal opens when edit button clicked`);
            Income._ExpenseForecastActions.Page.editCustomCategoryModalHeader.should('exist');
        });
    });