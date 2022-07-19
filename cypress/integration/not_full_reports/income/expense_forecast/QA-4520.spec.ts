import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4520.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Income from "../../../../actions/income/income.manager";

describe("Comparable Min, Max, Avg values for Insurance Per SF are correctly calculated and displayed",
    { tags: [ "@income", "@expense_forecast", "@snapshot_tests" ] }, () => {

        before("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("1. Go to Income > Comparable Expenses");
            NavigationSection.Actions.navigateToComparableExpenses();

            cy.stepInfo(`2. Add several comps (via Search, Filter or "Add blank column") and make sure that Insurance  
        and Square Feet fields are filled in for all added columns and save changes`);
            testData.comparables.forEach((comp) => {
                Income.ComparableExpenses.Actions.clickAddBlankColumnButton()
                    .enterAddressByColumnIndex(comp.address)
                    .enterCellDollarValueByColumnIndex(Income.ComparableExpenses.Page.getUnifiedEditableAndTotalCells(testData.cellName),
                        comp.insurance)
                    .enterSquareFeetByColumnIndex(comp.squareFeet);
            });

            cy.stepInfo("3. Go to Expense Forecast and make sure that Per SF radiobutton is selected for Insurance card");
            NavigationSection.Actions.navigateToExpenseForecast();
            Income.ExpenseForecast.Actions.verifyForecastItemBasis(testData.insuranceItem);

            cy.stepInfo(`4.1 Check Comp Min, Comp Max and Comp Avg values for Insurance card. They should be calculated as: 
        Min, Max and Avg of range of values [CompInsurance / Square Feet]`);
            Income.ExpenseForecast.Actions.verifyForecastItemCompMin(testData.insuranceItem, testData.comparables)
                .verifyForecastItemCompAverage(testData.insuranceItem, testData.comparables)
                .verifyForecastItemCompMax(testData.insuranceItem, testData.comparables)
                .hideExpenseForecastHeader();

            cy.stepInfo(`4.2 Check Comp Min, Comp Max and Comp Avg values for Insurance card. 
            They should be correctly displayed on a slidebar`);
            Income.ExpenseForecast.Actions.verifyProgressBarNotExist()
                .matchElementSnapshot(
                    Income.ExpenseForecast.Page.insuranceCard, testData.insuranceCardSnapshotName, { padding: [ 10, 100 ] });

            deleteReport(testData.reportCreationData.reportNumber);
        });
    });