import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4521.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { Income, DataCollections } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import tableExpenseHistoryCellNames from "../../../../../cypress/enums/expense/expenseHistoryTableRows.enum";

describe("Historical expense Insurance Per Unit is correctly calculated and displayed",
    { tags: [ "@snapshot_tests", "@income", "@expense_forecast" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`Pre-condition: Residential Units should be filled in on Property > Summary form`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits);

            cy.stepInfo(`1. Go to Income > Expense History`);
            _NavigationSection.Actions.navigateToExpenseHistory();

            cy.stepInfo(`2. Add columns for all types of Expense Period: 
            Actual, Actual T12, Annualized Historical and Projection + 
            Fill in Insurance field for all added columns and save changes`);
            testData.periods.forEach((per) => {
                Income._ExpenseHistory.Actions.selectExpensePeriod(per.expensePeriodType)
                    .enterExpenseYear(per.year)
                    .clickAddExpenseYearButton()
                    .enterIssueByColIndex(per.insurance, tableExpenseHistoryCellNames.insurance, 0);
            });
            testData.periodsMonth.forEach((per) => {
                Income._ExpenseHistory.Actions.selectExpensePeriod(per.expensePeriodType)
                    .enterExpenseMonth(per.month)
                    .enterExpenseYear(per.year)
                    .clickAddExpenseYearButton()
                    .enterIssueByColIndex(per.insurance, tableExpenseHistoryCellNames.insurance, 0);
            });
            Income._ExpenseHistory.Actions.verifyAverageTable();

            cy.stepInfo(`3. Go to Expense Forecast and make sure that Per Unit radio button 
            is selected for Insurance card`);
            _NavigationSection.Actions.navigateToExpenseForecast();
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.actualInsuranceItem);
            Income._ExpenseForecastActions.Actions.verifyForecastItemBasis(testData.actualInsuranceItem);

            cy.stepInfo(`4.1 Check historical expenses values for Insurance card. 
            They should be calculated for each expense type as: 
            [Expense Period type]Insurance / # of Residential Units`);
            Income._ExpenseForecastActions.Actions
                .verifyForecastItemByExpensePeriodType(testData.actualInsuranceItem, 
                    testData.buildingDescription, "Actual")
                .verifyForecastItemByExpensePeriodType(testData.t12InsuranceIItem, 
                    testData.buildingDescription, "Actual T12")
                .verifyForecastItemByExpensePeriodType(testData.historicalInsuranceIItem, 
                    testData.buildingDescription, "Annualized Historical")
                .verifyForecastItemByExpensePeriodType(testData.ownerProjectionInsuranceIItem, 
                    testData.buildingDescription, "Owner's Projection")
                .hideHeader()
                .clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo(`4.2 Check historical expenses values for Insurance card. 
            They should be correctly displayed on slide bars`);
            Income._ExpenseForecastActions.Actions.matchElementSnapshot(
                Income._ExpenseForecastActions.Page.insuranceCard, testData.insuranceICardSnapshotName, 
                { padding: [ 10, 100 ] });
        });
    });
