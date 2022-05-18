import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4903.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Tag } from "../../../../utils/tags.utils";

describe(`Comparable Min, Max, Avg values for Water & Sewer Per Unit are correctly calculated and displayed`,
    { tags:[ Tag.income, Tag.expense_forecast, Tag.snapshot_tests ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Navigate to Find Comps and add few comparables");
        _NavigationSection.navigateToComparableExpenses();
        
        cy.stepInfo(`2. Add several comps (via Search, Filter or Add blank column) and make sure that Water & Sewer  
        and Residential Units fields are filled in for all added columns and save changes`);
        testData.comparables.forEach((comp) => {
            Income._ComparableExpenses.clickAddBlankColumnButton()
                .enterAddressByColumnIndex(comp.address)
                .enterCellDollarValueByColumnIndex(Income._ComparableExpenses.Page.getUnifiedEditableAndTotalCells(testData.waterAndSewerItem.name),
                    comp.waterAndSewer)
                .enterResidentialUnitsByColumnIndex(comp.resUnits);
        });

        cy.stepInfo("3. Go to Expense Forecast and make sure that Per Unit radiobutton is selected for Water & Sewer card");
        _NavigationSection.Actions.navigateToExpenseForecast();
        Income._ExpenseForecastActions.chooseForecastItemBasis(testData.waterAndSewerItem)
            .verifyForecastItemBasis(testData.waterAndSewerItem);

        cy.stepInfo(`4.1 Check Comp Min, Comp Max and Comp Avg values for Water & Sewer card. They should be calculated as: 
        Min, Max and Avg of range of values [Comp_Water & Sewer / Square Feet]`);
        Income._ExpenseForecastActions.verifyForecastItemCompMin(testData.waterAndSewerItem, testData.comparables)
            .verifyForecastItemCompAverage(testData.waterAndSewerItem, testData.comparables)
            .verifyForecastItemCompMax(testData.waterAndSewerItem, testData.comparables)
            .hideExpenseForecastHeader();

        cy.stepInfo("4.2 Check Comp Min, Comp Max and Comp Avg values for Water & Sewer card. They should be correctly displayed on a slidebar");
        Income._ExpenseForecastActions.matchElementSnapshot(
            Income._ExpenseForecastActions.Page.forecastItemCard(
                Income._ExpenseForecastActions.getItemNameForAverage(
                    testData.waterAndSewerItem.name)), 
                    testData.waterAndSewerCardSnapshotName, { padding: [ 10, 100 ] }
        );

        cy.stepInfo("5. Delete report");
        deleteReport(testData.reportCreationData.reportNumber);
    });
});