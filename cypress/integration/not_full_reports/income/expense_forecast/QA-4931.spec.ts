import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4931.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import tableExpenseHistoryCellNames from "../../../../../cypress/enums/expense/expenseHistoryTableRows.enum";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income } from "../../../../actions";

// TODO: Test fails due to https://bowery.atlassian.net/browse/WEB-7012 
describe("Historical expense Repairs & Maintenance Per Unit is correctly calculated and displayed", 
    { tags:[ "@expense_forecast", "@income", "@snapshot_tests" ] }, () => {
    
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`Pre-condition: Residential Units should be filled in on Property > Summary form`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(Object.values(testData.buildingDescription)[1]);

            cy.stepInfo(`1. Go to Income > Expense History`);
            _NavigationSection.navigateToExpenseHistory();

            cy.stepInfo(`2. Add columns for all types of Expense Period: 
            Actual, Actual T12, Annualized Historical and Projection`);
            testData.periods.forEach((per) => {
                Income._ExpenseHistory.selectExpensePeriod(per.expensePeriodType)
                    .enterExpenseYear(per.year)
                    .clickAddExpenseYearButton()
                    .enterIssueByColIndex(per.repairsAndMaintenance, 
                        tableExpenseHistoryCellNames.repairsAndMaintenance);
            });

            testData.periodsMonth.forEach((per) => {
                Income._ExpenseHistory.selectExpensePeriod(per.expensePeriodType)
                    .enterExpenseMonth(per.month)
                    .enterExpenseYear(per.year)
                    .clickAddExpenseYearButton()
                    .enterIssueByColIndex(per.repairsAndMaintenance, 
                        tableExpenseHistoryCellNames.repairsAndMaintenance);
            });

            cy.stepInfo(`3. Fill in Repairs & Maintenance field for all added columns and save changes`);
            Income._ExpenseHistory.verifyAverageTable();

            cy.stepInfo(`4. Go to Expense Forecast and make sure that Per Unit radio button 
            is selected for Repairs & Maintenance card`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.actualRepairsItem)
                .verifyForecastItemBasis(testData.actualRepairsItem);

            cy.stepInfo(`5. Check historical expenses values for Repairs & Maintenance card. They should be
            5.1 calculated for each expense type as: [Expense Period type]Repairs & Maintenance / # of Residential Units
            5.2 correctly displayed on slide bars`);
            Income._ExpenseForecastActions
                .verifyForecastItemByExpensePeriodType(testData.actualRepairsItem, 
                    testData.buildingDescription, "Actual")
                .verifyForecastItemByExpensePeriodType(testData.t12RepairsItem, 
                    testData.buildingDescription, "Actual T12")
                .verifyForecastItemByExpensePeriodType(testData.historicalRepairsItem, 
                    testData.buildingDescription, "Annualized Historical")
                .verifyForecastItemByExpensePeriodType(testData.ownerProjectionRepairsItem, 
                    testData.buildingDescription, "Owner's Projection")
                .hideHeader()
                .clickSaveButton()
                .verifyProgressBarNotExist();

            Income._ExpenseForecastActions.matchElementSnapshot(
                Income._ExpenseForecastActions.Page.repairsAndMaintenanceCard, testData.repairsCardSnapshotName,
                { padding: [ 10, 100 ] });
        });
    });
