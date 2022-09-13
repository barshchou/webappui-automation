import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4522.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe(`Comparable Min, Max, Avg values for Water & Sewer Per Unit are correctly calculated and displayed`,
    { tags:[ "@income", "@expense_forecast", "@snapshot_tests", "@fix" ] }, () => {

        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("1. Navigate to Find Comps and add few comparables");
            _NavigationSection.navigateToComparableExpenses();
        
            cy.stepInfo(`2. Add several comps (via Search, Filter or Add blank column) and make sure that Insurance  
        and Residential Units fields are filled in for all added columns and save changes`);
            testData.comparables.forEach((comp) => {
                Income._ComparableExpenses
                    .clickAddBlankColumnButton()
                    .enterAddressByColumnIndex(comp.address)
                    .enterCellDollarValueByColumnIndex(Income._ComparableExpenses.Page
                        .getUnifiedEditableAndTotalCells(testData.insuranceItem.name), comp.insurance)
                    .enterResidentialUnitsByColumnIndex(comp.resUnits);
            });

            cy.stepInfo(`3. Go to Expense Forecast and make sure that Per Unit radio button 
            is selected for Insurance card`);
            _NavigationSection.Actions.navigateToExpenseForecast();
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.insuranceItem)
                .verifyForecastItemBasis(testData.insuranceItem);

            cy.stepInfo(`4.1 Check Comp Min, Comp Max and Comp Avg values for Insurance card. 
            They should be calculated as: Min, Max and Avg of range of values [Comp_Insurance / Square Feet]`);
            Income._ExpenseForecastActions.verifyForecastItemCompMin(testData.insuranceItem, testData.comparables)
                .verifyForecastItemCompAverage(testData.insuranceItem, testData.comparables)
                .verifyForecastItemCompMax(testData.insuranceItem, testData.comparables)
                .hideHeader()
                .clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo(`4.2 Check Comp Min, Comp Max and Comp Avg values for Water & Sewer card. 
            They should be correctly displayed on a slide bar`);
            Income._ExpenseForecastActions.matchElementSnapshot(
                Income._ExpenseForecastActions.Page.forecastItemCard(
                    Income._ExpenseForecastActions.getItemNameForAverage(
                        testData.insuranceItem.name)), 
                testData.insuranceCardSnapshotName, { padding: [ 0, 100 ] }
            );
        });
    });
