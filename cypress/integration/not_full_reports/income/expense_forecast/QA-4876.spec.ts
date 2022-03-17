import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4876.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Income from "../../../../actions/income/income.manager";

describe("Historical expense Electricity Per SF is correctly calculated and displayed", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Navigate to Property -> Summary and enter gross building area");
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterGrossBuildingArea(testData.grossBuildingArea);

        cy.stepInfo(
            "2. Add columns for all types of Expense Period: Actual, Actual T12, Annualized Historical and Projection");
        NavigationSection.navigateToExpenseHistory();
        Income.ExpenseHistory.selectExpensePeriod(testData.actual.periodValue)
            .verifyExpenseMonth(testData.actual.month, testData.actual.periodValue)
            .enterExpenseYear(testData.actual.expenseYear)
            .clickAddExpenseYearButton()
            .selectExpensePeriod(testData.t12.periodValue)
            .enterExpenseMonth(testData.t12.month)
            .enterExpenseYear(testData.t12.expenseYear)
            .clickAddExpenseYearButton()
            .selectExpensePeriod(testData.historical.periodValue)
            .enterExpenseMonth(testData.historical.month)
            .enterExpenseYear(testData.historical.expenseYear)
            .clickAddExpenseYearButton()
            .selectExpensePeriod(testData.projection.periodValue)
            .verifyExpenseMonth(testData.projection.month, testData.projection.periodValue)
            .verifyExpenseYear(testData.projection.expenseYear)
            .clickAddExpenseYearButton();

        cy.stepInfo("3. Fill in Electricity field for all added columns and save changes");
        Income.ExpenseHistory.enterElectricityByColIndex(testData.actual.electricityExpense, 0)
            .enterElectricityByColIndex(testData.t12.electricityExpense, 1)
            .enterElectricityByColIndex(testData.historical.electricityExpense, 2)
            .enterElectricityByColIndex(testData.projection.electricityExpense, 3);
        NavigationSection.navigateToExpenseForecast();

        cy.stepInfo("4. Go to Expense Forecast and make sure that Per SF radiobutton is selected for Insurance card");
        Income.ExpenseForecast.verifyForecastItemBasis(testData.electricityItem);
        deleteReport(testData.reportCreationData.reportNumber);
    })
})