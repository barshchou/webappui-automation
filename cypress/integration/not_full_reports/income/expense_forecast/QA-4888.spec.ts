import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4888.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { Income, DataCollections } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import tableExpenseHistoryCellNames from "../../../../../cypress/enums/expense/expenseHistoryTableRows.enum";

describe("Historical expense Electricity Per Unit is correctly calculated and displayed",
    { tags:[ "@snapshot_tests", "@income", "@expense_forecast" ] }, () => {

        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Pre-condition: Residential Units should be filled in on Property > Summary form`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits);

            cy.stepInfo(`2. Go to Income > Expense History`);
            _NavigationSection.navigateToExpenseHistory();

            cy.stepInfo(`3. Add columns for all types of Expense Period: 
            Actual, Actual T12, Annualized Historical and Projection + 
            Fill in Electricity field for all added columns and save changes`);
            testData.periods.forEach((per) => {
                Income._ExpenseHistory.selectExpensePeriod(per.expensePeriodType)
                    .enterExpenseYear(per.year)
                    .clickAddExpenseYearButton()
                    .enterIssueByColIndex(per.electricity, tableExpenseHistoryCellNames.electricity, 0);
            });
            testData.periodsMonth.forEach((per) => {
                Income._ExpenseHistory.selectExpensePeriod(per.expensePeriodType)
                    .enterExpenseMonth(per.month)
                    .enterExpenseYear(per.year)
                    .clickAddExpenseYearButton()
                    .enterIssueByColIndex(per.electricity, tableExpenseHistoryCellNames.electricity, 0);
            });
            Income._ExpenseHistory.verifyAverageTable();

            cy.stepInfo(`4. Go to Expense Forecast and make sure that Per Unit radio button 
            is selected for Electricity  card`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.actualElectricityItem)
                .verifyForecastItemBasis(testData.actualElectricityItem);

            cy.stepInfo(`4.1 Check historical expenses values for Electricity card. 
            They should be calculated for each expense type as: 
            [Expense Period type]Electricity  / # of Residential Units`);
            Income._ExpenseForecastActions.Actions
                .verifyForecastItemByExpensePeriodType(testData.actualElectricityItem, 
                    testData.buildingDescription, "Actual")
                .verifyForecastItemByExpensePeriodType(testData.t12ElectricityItem, 
                    testData.buildingDescription, "Actual T12")
                .verifyForecastItemByExpensePeriodType(testData.historicalElectricityItem, 
                    testData.buildingDescription, "Annualized Historical")
                .verifyForecastItemByExpensePeriodType(testData.ownerProjectionElectricityItem, 
                    testData.buildingDescription, "Owner's Projection")
                .hideHeader()
                .clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo(`4.2 Check historical expenses values for Electricity card. 
            They should be correctly displayed on slide bars`);
            Income._ExpenseForecastActions.Actions.matchElementSnapshot(
                Income._ExpenseForecastActions.Page.electricityCard, testData.electricityCardSnapshotName, 
                { padding: [ 10, 100 ] });
        });
    });
