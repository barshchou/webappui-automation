import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5074.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe(`Generated Commentary can be edited manually for Custom Expense Forecast`,
    { tags:[ "@income", "@expense_forecast" ] }, () => {
        beforeEach("Login, create report, setup building", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.residentialUnits)
                .enterGrossBuildingArea(testData.grossBuildingArea);
        });

        it("[QA-5074]", () => {
            cy.stepInfo(`1. Go to Expense Forecast and add new Expense Forecast with valid name (ex. Heating)`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`2. Add new custom category`);
            Income._ExpenseForecastActions.addCustomExpenseCategory(testData.customCategory.name)
                .chooseForecastItemBasis(testData.customCategory, true);

            cy.stepInfo(`3. Fill expense forecast for custom category`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.customCategory, true);
        
            cy.stepInfo(`4. Verify that generated comment is displayed correctly`);
            Income._ExpenseForecastActions.verifyFormCommentTextBoxText(
                testData.customCategory.name.toUpperCase(),
                testData.customCategoryGeneratedCommentary.commentary);

            cy.stepInfo(`5. Update custom category generated Commentary manually`);
            Income._ExpenseForecastActions.editExpenseForecastCommentary(testData.textUpdate, testData.customCategory, 
                false);

            cy.stepInfo(`6. Verify that updated generated comment is displayed correctly`);
            Income._ExpenseForecastActions.verifyFormCommentTextBoxText(
                testData.customCategory.name.toUpperCase(),
                testData.customCategoryGeneratedCommentaryUpdated.commentaryUpdated);

            cy.stepInfo(`7. Revert changes and verify generated comment is displayed correctly`);
            Income._ExpenseForecastActions.revertToOriginalExpenseForecastCommentary(testData.customCategory)
                .verifyFormCommentTextBoxText(
                    testData.customCategory.name.toUpperCase(),
                    testData.customCategoryGeneratedCommentary.commentary);
        });
    });