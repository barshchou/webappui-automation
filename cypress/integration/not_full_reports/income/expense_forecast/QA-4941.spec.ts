/// <reference types="cypress-grep" />
import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4941.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Income from "../../../../actions/income/income.manager";
import expenseForecastPage from "../../../../pages/income/expenseForecast.page";

describe("Historical expense Fuel Per SF is correctly calculated and displayed", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", { tags: "@snapshot_tests" }, () => {
        cy.stepInfo("1. Navigate to Property -> Summary and enter gross building area");
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterGrossBuildingArea(testData.buildingDescription.grossArea)
            .enterNumberOfResUnits(testData.buildingDescription.numberOfUnits);

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

        cy.stepInfo("3. Fill in Fuel field for all added columns and save changes");
        Income.ExpenseHistory.enterFuelByColIndex(testData.actual.fuelExpense, 0)
            .enterFuelByColIndex(testData.t12.fuelExpense, 1)
            .enterFuelByColIndex(testData.historical.fuelExpense, 2)
            .enterFuelByColIndex(testData.projection.fuelExpense, 3);
        NavigationSection.navigateToExpenseForecast();

        cy.stepInfo("4. Go to Expense Forecast and make sure that Per SF radiobutton is selected for Fuel card");
        Income.ExpenseForecast.Actions.verifyForecastItemBasis(testData.actualFuelItem);

        cy.stepInfo(`5. Check historical expenses values for Fuel card. They should be calculated 
        for each expense type as: [Expense Period type]Electricity / GBA`);
        Income.ExpenseForecast.Actions.verifyForecastItemByExpensePeriodType(testData.actualFuelItem, testData.buildingDescription, "Actual")
            .verifyForecastItemByExpensePeriodType(testData.t12FuelItem, testData.buildingDescription, "Actual T12")
            .verifyForecastItemByExpensePeriodType(testData.historicalFuelItem, testData.buildingDescription, "Annualized Historical")
            .verifyForecastItemByExpensePeriodType(testData.ownerProjectionFuelItem, testData.buildingDescription, "Owner's Projection")
            .addPaddingStyle(expenseForecastPage.FuelCard);

        Income.ExpenseForecast.Actions.hideExpenseForecastHeader();

        cy.stepInfo("6. Check historical expenses values for Fuel card. They should be correctly displayed on slidebars");
        Income.ExpenseForecast.Actions.matchElementSnapshot(
            expenseForecastPage.FuelCard, testData.fuelCardSnapshotName);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});