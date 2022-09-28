import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5058.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe(`Delete Expense Category modal closes on clicking Cancel or X button`,
    { tags:[ "@income", "@expense_forecast" ] }, () => {
        beforeEach("Login, create report, setup building", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.residentialUnits)
                .enterGrossBuildingArea(testData.grossBuildingArea);
        });

        it("[QA-5058]", () => {
            cy.stepInfo(`1. Go to Expense Forecast and add new Expense Forecast with valid name (ex. Heating)`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`2. Add new custom category`);
            Income._ExpenseForecastActions.addCustomExpenseCategory(testData.customCategory.name)
                .chooseForecastItemBasis(testData.customCategory, true);

            cy.stepInfo(`3. Open custom expense category and close with 'X' icon`);
            Income._ExpenseForecastActions.Page
                .customCategoryDeleteButton(testData.customCategory.name).click();
            Income._ExpenseForecastActions.Page.formConfirmCloseButton.click();
            Income._ExpenseForecastActions.Page.forecastItemCardFull(testData.customCategory.name, true)
                .should('exist');

            cy.stepInfo(`4. Open custom expense category and close with cancel button`);
            Income._ExpenseForecastActions.Page
                .customCategoryDeleteButton(testData.customCategory.name).click();
            Income._ExpenseForecastActions.Page.formCancelButton().click();
            Income._ExpenseForecastActions.Page.forecastItemCardFull(testData.customCategory.name, true)
                .should('exist');

            cy.stepInfo(`5. Navigate to Pro Forma page and verify custom category exists`);
            _NavigationSection.navigateToProForma();
            Income._ProFormaActions.Page.getCategoryElementByType(testData.customCategory.name, "label")
                .should('exist');
        });
    });