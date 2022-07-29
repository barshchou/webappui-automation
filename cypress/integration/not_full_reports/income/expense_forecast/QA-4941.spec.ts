import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4941.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Income from "../../../../actions/income/income.manager";
import tableExpenseHistoryCellNames from "../../../../../cypress/enums/expense/expenseHistoryTableRows.enum";

describe("Historical expense Fuel Per SF is correctly calculated and displayed",
    { tags: [ "@snapshot_tests", "@income", "@expense_forecast" ] }, () => {
        
        before("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Navigate to Property -> Summary and enter gross building area`);
            NavigationSection.navigateToPropertySummary();
            Property.Summary.enterGrossBuildingArea(testData.buildingDescription.grossArea)
                .enterNumberOfResUnits(testData.buildingDescription.numberOfUnits);

            cy.stepInfo(`2. Add columns for all types of Expense Period: 
            Actual, Actual T12, Annualized Historical and Projection`);
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

            cy.stepInfo(`3. Fill in Fuel field for all added columns and save changes`);
            Income.ExpenseHistory.enterIssueByColIndex(testData.actual.fuelExpense, 
                tableExpenseHistoryCellNames.fuel, 3)
                .enterIssueByColIndex(testData.t12.fuelExpense, tableExpenseHistoryCellNames.fuel, 2)
                .enterIssueByColIndex(testData.historical.fuelExpense, tableExpenseHistoryCellNames.fuel, 1)
                .enterIssueByColIndex(testData.projection.fuelExpense, tableExpenseHistoryCellNames.fuel, 0);
            NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`4. Go to Expense Forecast and make sure that Per SF radio button is selected for Fuel card`);
            Income.ExpenseForecast.Actions.verifyForecastItemBasis(testData.actualFuelItem);

            cy.stepInfo(`5. Check historical expenses values for Fuel card. They should be calculated 
        for each expense type as: [Expense Period type]Electricity / GBA`);
            Income.ExpenseForecast.Actions
                .verifyForecastItemByExpensePeriodType(testData.actualFuelItem, testData.buildingDescription, "Actual")
                .verifyForecastItemByExpensePeriodType(testData.t12FuelItem, testData.buildingDescription, "Actual T12")
                .verifyForecastItemByExpensePeriodType(testData.historicalFuelItem, 
                    testData.buildingDescription, "Annualized Historical")
                .verifyForecastItemByExpensePeriodType(testData.ownerProjectionFuelItem, 
                    testData.buildingDescription, "Owner's Projection")
                .hideHeader()
                .clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo(`6. Check historical expenses values for Fuel card. 
            They should be correctly displayed on slide bars`);
            Income.ExpenseForecast.Actions.matchElementSnapshot(
                Income.ExpenseForecast.Page.fuelCard, testData.fuelCardSnapshotName, { padding: [ 10, 100 ] });
        });
    });
