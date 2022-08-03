import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4925.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Income from "../../../../actions/income/income.manager";

describe("Comparable Min, Max, Avg values for Repairs & Maintenance Per SF are correctly calculated and displayed", 
    { tags:[ "@income", "@snapshot_tests", "@expense_forecast" ] }, () => {

        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("1. Go to Income > Comparable Expenses");
            NavigationSection.Actions.navigateToComparableExpenses();

            cy.stepInfo(`2. Add several comps (via Search, Filter or Add blank column) 
            and make sure that Repairs & Maintenance and Square Feet fields are filled in 
            for all added columns and save changes`);
            testData.comparables.forEach((comp) => {
                Income.ComparableExpenses.Actions.clickAddBlankColumnButton()
                    .enterAddressByColumnIndex(comp.address)
                    .enterCellDollarValueByColumnIndex(
                        Income.ComparableExpenses.Page.getUnifiedEditableAndTotalCells("repairsAndMaintenance"),
                        comp.repairsAndMaintenance)
                    .enterSquareFeetByColumnIndex(comp.squareFeet);
            });

            cy.stepInfo(`3. Go to Expense Forecast and make sure that Per SF radio button 
            is selected for Repairs & Maintenance card`);
            NavigationSection.Actions.navigateToExpenseForecast();
            Income.ExpenseForecast.Actions.verifyForecastItemBasis(testData.repairsAndMaintenanceItem);

            cy.stepInfo(`4.1 Check Comp Min, Comp Max and Comp Avg values for Repairs & Maintenance card. 
            They should be calculated as: 
            Min, Max and Avg of range of values [Comp_Repairs & Maintenance / Square Feet]`);
            Income.ExpenseForecast.Actions
                .verifyForecastItemCompMin(testData.repairsAndMaintenanceItem, testData.comparables)
                .verifyForecastItemCompAverage(testData.repairsAndMaintenanceItem, testData.comparables)
                .verifyForecastItemCompMax(testData.repairsAndMaintenanceItem, testData.comparables)
                .hideHeader()
                .clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo(`4.2 Check Comp Min, Comp Max and Comp Avg values for Repairs & Maintenance card. 
            They should be correctly displayed on a slide bar`);
            Income.ExpenseForecast.Actions.matchElementSnapshot(
                Income.ExpenseForecast.Page.repairsAndMaintenanceCard, testData.repairsAndMaintenanceCardSnapshotName, 
                { padding: [ 0, 100 ] });
        });
    });
