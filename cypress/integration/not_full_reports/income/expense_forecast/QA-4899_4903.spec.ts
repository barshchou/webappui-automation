import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4899_4903.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe(`Comparable Min, Max, Avg values for Water & Sewer Per Unit are correctly calculated and displayed`,
    { tags:[ "@income", "@expense_forecast", "@snapshot_tests" ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo(`1. Navigate to Find Comps and add few comparables`);
        _NavigationSection.navigateToComparableExpenses();
        
        cy.stepInfo(`2. [QA-4899] [QA-4903] Add several comps (via Search, Filter or Add blank column) and make sure that Water & Sewer  
                    and Residential Units fields are filled in for all added columns and save changes`);
        testData.comparables.forEach((comp) => {
            Income._ComparableExpenses.clickAddBlankColumnButton()
                .enterAddressByColumnIndex(comp.address)
                .enterCellDollarValueByColumnIndex(Income._ComparableExpenses.Page.getUnifiedEditableAndTotalCells(testData.waterAndSewerPerUnitItem.name),
                    comp.waterAndSewer)
                .enterResidentialUnitsByColumnIndex(comp.resUnits)
                .enterSquareFeetByColumnIndex(comp.squareFeet);
        });

        cy.stepInfo("3. [QA-4903] Go to Expense Forecast and make sure that Per Unit radiobutton is selected for Water & Sewer card");
        _NavigationSection.Actions.navigateToExpenseForecast();
        Income._ExpenseForecastActions.chooseForecastItemBasis(testData.waterAndSewerPerUnitItem)
            .verifyForecastItemBasis(testData.waterAndSewerPerUnitItem);

        cy.stepInfo(`5. [QA-4903] Check Comp Min, Comp Max and Comp Avg values for Water & Sewer card. They should be calculated as: 
                    Min, Max and Avg of range of values [Comp_Water & Sewer / Square Feet]`);
        Income._ExpenseForecastActions.verifyForecastItemCompMin(testData.waterAndSewerPerUnitItem, testData.comparables)
            .verifyForecastItemCompAverage(testData.waterAndSewerPerUnitItem, testData.comparables)
            .verifyForecastItemCompMax(testData.waterAndSewerPerUnitItem, testData.comparables)
            .hideExpenseForecastHeader();

        cy.stepInfo("6. [QA-4903] Check Comp Min, Comp Max and Comp Avg values for Water & Sewer card. They should be correctly displayed on a slidebar");
        Income._ExpenseForecastActions.verifyProgressBarNotExist()
            .matchElementSnapshot(
                Income._ExpenseForecastActions.Page.forecastItemCard(
                    Income._ExpenseForecastActions.getItemNameForAverage(
                        testData.waterAndSewerPerUnitItem.name)), 
                        testData.waterAndSewerPerUnitCardSnapshotName, { padding: [ 10, 100 ] }
                );

        cy.stepInfo("7. [QA-4899] Go to Expense Forecast and make sure that Per Unit radiobutton is selected for Water & Sewer card");
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.waterAndSewerPerSfItem)
                .verifyForecastItemBasis(testData.waterAndSewerPerSfItem);
    
        cy.stepInfo(`8. [QA-4899] Check Comp Min, Comp Max and Comp Avg values for Water & Sewer card. They should be calculated as: 
                    Min, Max and Avg of range of values [Comp_Water & Sewer / Square Feet]`);
        Income._ExpenseForecastActions.verifyForecastItemCompMin(testData.waterAndSewerPerSfItem, testData.comparables)
            .verifyForecastItemCompAverage(testData.waterAndSewerPerSfItem, testData.comparables)
            .verifyForecastItemCompMax(testData.waterAndSewerPerSfItem, testData.comparables)
            .hideExpenseForecastHeader();

        cy.stepInfo("9. [QA-4899] Check Comp Min, Comp Max and Comp Avg values for Water & Sewer card. They should be correctly displayed on a slidebar");
        Income._ExpenseForecastActions.matchElementSnapshot(
            Income._ExpenseForecastActions.Page.forecastItemCard(
                Income._ExpenseForecastActions.getItemNameForAverage(
                    testData.waterAndSewerPerSfItem.name)), 
                    testData.waterAndSewerPerSfCardSnapshotName, { padding: [ 10, 100 ] }
        );

        deleteReport(testData.reportCreationData.reportNumber);
    });
});