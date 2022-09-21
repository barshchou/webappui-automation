import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5772.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { Income, DataCollections } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import tableExpenseHistoryCellNames from "../../../../enums/expense/expenseHistoryTableRows.enum";

// TODO: Test fails due to https://bowery.atlassian.net/browse/WEB-7012 
describe("[QA-5772] Historical expense General & Administrative Per SF is correctly calculated and displayed",
    { tags: [ "@snapshot_tests", "@income", "@expense_forecast" ] }, () => {

        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {

            cy.stepInfo("1. Pre-condition: Fill in Residential Units and GBA on Property > Summary form");
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits)
                .enterGrossBuildingArea(testData.buildingDescription.grossArea);

            cy.stepInfo("2. Go to Income > Expense History");
            _NavigationSection.navigateToExpenseHistory();

            cy.stepInfo(`3. Add columns for all types of Expense Period: 
            Actual, Actual T12, Annualized Historical and Projection + 
            Fill in General & Administrative field for all added columns and save changes`);
            testData.periods.forEach((period) => {
                Income._ExpenseHistory.selectExpensePeriod(period.expensePeriodType)
                    .enterExpenseYear(period.year)
                    .clickAddExpenseYearButton()
                    .enterIssueByColIndex(period.generalAndAdministrative, 
                        tableExpenseHistoryCellNames.generalAndAdministrative);
            });
            testData.periodsMonth.forEach((period) => {
                Income._ExpenseHistory.selectExpensePeriod(period.expensePeriodType)
                    .enterExpenseMonth(period.month)
                    .enterExpenseYear(period.year)
                    .clickAddExpenseYearButton()
                    .enterIssueByColIndex(period.generalAndAdministrative, 
                        tableExpenseHistoryCellNames.generalAndAdministrative);
            });
            Income._ExpenseHistory.verifyAverageTable();

            cy.stepInfo(`4. Go to Expense Forecast and make sure that Per SF radio button 
            is selected for General & Administrative card`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.actualGeneralAndAdministrativeItem)
                .verifyForecastItemBasis(testData.actualGeneralAndAdministrativeItem);

            cy.stepInfo(`5.1 Check historical expenses values for General & Administrative card. 
            They should be calculated for each expense type as: [Expense Period type]General & Administrative / GBA`);
            Income._ExpenseForecastActions
                .verifyForecastItemByExpensePeriodType(testData.actualGeneralAndAdministrativeItem,
                    testData.buildingDescription, "Actual")
                .verifyForecastItemByExpensePeriodType(testData.t12GeneralAndAdministrativeItem,
                    testData.buildingDescription, "Actual T12")
                .verifyForecastItemByExpensePeriodType(testData.historicalGeneralAndAdministrativeItem,
                    testData.buildingDescription, "Annualized Historical")
                .verifyForecastItemByExpensePeriodType(testData.ownerProjectionGeneralAndAdministrativeItem,
                    testData.buildingDescription, "Owner's Projection")
                .hideHeader()
                .clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo(`5.2 Check historical expenses values for General & Administrative card. 
            They should be correctly displayed on slide bars`);
            Income._ExpenseForecastActions.matchElementSnapshot(
                Income._ExpenseForecastActions.Page.forecastItemCard(
                    Income._ExpenseForecastActions.getItemNameForAverage(
                        testData.actualGeneralAndAdministrativeItem.name)), 
                testData.generalAndAdministrativePerSfCardSnapshotName, 
                { padding: [ 0, 100 ] });
        });
    });
