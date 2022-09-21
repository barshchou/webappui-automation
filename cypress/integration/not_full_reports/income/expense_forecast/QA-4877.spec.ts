import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4877.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Income from "../../../../actions/income/income.manager";

// TODO: Test fails due to https://bowery.atlassian.net/browse/WEB-7020
describe("Comparable Min, Max, Avg values for Electricity Per SF are correctly calculated and displayed",
    { tags:[ "@snapshot_tests", "@income", "@expense_forecast" ] }, () => {

        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("1. Go to Income > Comparable Expenses");
            NavigationSection.Actions.navigateToComparableExpenses();

            cy.stepInfo(`2. Add several comps (via Search, Filter or Add blank column) and make sure that Electricity 
            and Square Feet fields are filled in for all added columns and save changes`);
            testData.comparables.forEach((comp) => {
                Income.ComparableExpenses.Actions.clickAddBlankColumnButton()
                    .enterAddressByColumnIndex(comp.address)
                    .enterCellDollarValueByColumnIndex(Income.ComparableExpenses.Page
                        .getUnifiedEditableAndTotalCells("electricity"),
                    comp.electricity)
                    .enterSquareFeetByColumnIndex(comp.squareFeet);
            });
            NavigationSection.Actions.navigateToExpenseForecast();

            cy.stepInfo(`3. Go to Expense Forecast and make sure that Per SF radio button 
            is selected for Electricity card`);
            Income.ExpenseForecast.Actions.verifyForecastItemBasis(testData.electricityItem);

            cy.stepInfo(`4. Check Comp Min, Comp Max and Comp Avg values for Electricity card. They should be 
                        4.1 calculated as: Min, Max and Avg of range of values [CompElectricity / Square Feet]
                        4.2 correctly displayed on a slide bar`);
            Income.ExpenseForecast.Actions.verifyForecastItemCompMin(testData.electricityItem, testData.comparables)
                .verifyForecastItemCompAverage(testData.electricityItem, testData.comparables)
                .verifyForecastItemCompMax(testData.electricityItem, testData.comparables)
                .hideHeader()
                .clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo(`5. Check Comp Min, Comp Max and Comp Avg values for Electricity card. They should be
                        5.1 calculated as: Min, Max and Avg of range of values [CompElectricity / Square Feet]
                        5.2 correctly displayed on a slide bar`);
            Income.ExpenseForecast.Actions.matchElementSnapshot(
                Income.ExpenseForecast.Page.electricityCard, testData.electricityCardSnapshotName, 
                { padding: [ 0, 100 ] }
            );
        });
    });
