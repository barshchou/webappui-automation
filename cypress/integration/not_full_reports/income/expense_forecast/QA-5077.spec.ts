import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5077.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe(`"Modified" label is displayed next to "{Category Name } Forecast Discussion" if 
Generated Commentary is edited manually`,
{ tags:[ "@income", "@expense_forecast" ] }, () => {
    beforeEach("Login, create report, setup building", () => {
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToSubjectPropertyData();
        DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.residentialUnits)
            .enterGrossBuildingArea(testData.grossBuildingArea);
    });

    it("[QA-5077]", () => {
        cy.stepInfo(`1. Go to Expense Forecast and add new Expense Forecast with valid name (ex. Heating)`);
        _NavigationSection.navigateToExpenseForecast();

        cy.stepInfo(`2. Add new custom category`);
        Income._ExpenseForecastActions.addCustomExpenseCategory(testData.customCategory.name)
            .chooseForecastItemBasis(testData.customCategory, true);

        cy.stepInfo(`3. Fill expense forecast for custom category`);
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.customCategory, true);

        cy.stepInfo(`4. Update custom category generated Commentary manually`);
        Income._ExpenseForecastActions.editExpenseForecastCommentary(testData.textUpdate, testData.customCategory, 
            false);
        
        cy.stepInfo(`5. Verify if user made any changes in Generated Commentary field on Custom Expense Forecast 
        card and save it - "Modified" label is displayed next to {Category Name} Forecast Discussion title`);
        Income._ExpenseForecastActions.Page.modifiedLabel().should("exist");

        cy.stepInfo(`6. Revert changes and verify there is no label displayed next to {Category Name} 
        Forecast Discussion title`);
        Income._ExpenseForecastActions.revertToOriginalExpenseForecastCommentary(testData.customCategory);
        Income._ExpenseForecastActions.Page.modifiedLabel(false).should("not.exist");
    });
});