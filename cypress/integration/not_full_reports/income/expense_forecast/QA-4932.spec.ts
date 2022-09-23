import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4932.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Income from "../../../../actions/income/income.manager";

describe("Comparable Min, Max, Avg values for Repairs & Maintenance Per Unit are correctly calculated and displayed",
    { tags:[ "@expense_forecast", "@income", "@snapshot_tests" ] }, () => {
        beforeEach('Create a report', () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Go to Income > Comparable Expenses`);
            NavigationSection.Actions.navigateToComparableExpenses();

            cy.stepInfo(`2. Add several comps (via Search, Filter or Add blank column)`);
            testData.comparables.forEach((comp) => {
                Income.ComparableExpenses.Actions.clickAddBlankColumnButton()
                    .enterAddressByColumnIndex(comp.address)
                    .enterResidentialUnitsByColumnIndex(comp.resUnits)
                    .enterCellDollarValueByColumnIndex(
                        Income.ComparableExpenses.Page.getUnifiedEditableAndTotalCells("repairsAndMaintenance"),
                        comp.repairsAndMaintenance);
            });

            cy.stepInfo(`3. Make sure that Repairs & Maintenance and Residential Units fields are 
            filled in for all added columns and save changes`);
            NavigationSection.Actions.navigateToExpenseForecast();

            cy.stepInfo(`4. Go to Expense Forecast and make sure that Per Unit radio button 
            is selected for Repairs & Maintenance card`);
            Income.ExpenseForecast.chooseForecastItemBasis(testData.repairsItem);
            Income.ExpenseForecast.Actions.verifyForecastItemBasis(testData.repairsItem);

            cy.stepInfo(`5. Check Comp Min, Comp Max and Comp Avg values for Repairs & Maintenance card. They should be
            5.1 calculated as: Min, Max and Avg of range of values [Comp_Repairs & Maintenance / Residential Units]
            5.2 correctly displayed on slide bar`);
            Income.ExpenseForecast.Actions.verifyForecastItemCompMin(testData.repairsItem, testData.comparables)
                .verifyForecastItemCompAverage(testData.repairsItem, testData.comparables)
                .verifyForecastItemCompMax(testData.repairsItem, testData.comparables)
                .hideHeader()
                .clickSaveButton()
                .verifyProgressBarNotExist();

            Income.ExpenseForecast.Actions.matchElementSnapshot(
                Income.ExpenseForecast.Page.repairsAndMaintenanceCard, testData.repairsCardSnapshotName, 
                { padding: [ 0, 100 ] });
        });
    });
