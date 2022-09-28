import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5057.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe(`Custom Expense Forecast is deleted on clicking "Confirm" button on "Delete Expense Category" modal`,
    { tags:[ "@income", "@expense_forecast" ] }, () => {
        beforeEach("Login, create report, setup building", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.residentialUnits)
                .enterGrossBuildingArea(testData.grossBuildingArea);
        });

        it("[QA-5057]", () => {
            cy.stepInfo(`1. Go to Expense Forecast and add new Expense Forecast with valid name (ex. Heating)`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`2. Add new custom category`);
            Income._ExpenseForecastActions.addCustomExpenseCategory(testData.customCategory.name)
                .chooseForecastItemBasis(testData.customCategory, true);

            cy.stepInfo(`3. Delete custom expense category`);
            Income._ExpenseForecastActions.deleteCustomExpenseCategory(testData.customCategory.name);
            Income._ExpenseForecastActions.Page.forecastItemCardFull(testData.customCategory.name, true)
                .should('not.exist');

            cy.stepInfo(`4. Navigate to Pro Forma page and verify there is no custom category`);
            _NavigationSection.navigateToProForma();
            Income._ProFormaActions.Page.getCategoryElementByType(testData.customCategory.name, "label")
                .should('not.exist');
        });
    });