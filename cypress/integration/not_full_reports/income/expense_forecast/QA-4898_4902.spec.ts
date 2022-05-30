import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4898_4902.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Property, Income } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import tableExpenseHistoryCellNames from "../../../../enums/expenseHistoryTableRows.enum";

describe("Historical expense Water & Sewer Per SF/Unit is correctly calculated and displayed",
    { tags:[ "@snapshot_tests", "@income", "@expense_forecast" ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);

        cy.stepInfo("1. Pre-condition: Residential Units should be filled in on Property > Summary form");
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits)
            .enterGrossBuildingArea(testData.buildingDescription.grossArea);

        cy.stepInfo("2. Go to Income > Expense History");
        _NavigationSection.Actions.navigateToExpenseHistory();

        cy.stepInfo(`3. Add columns for all types of Expense Period: Actual, Actual T12, Annualized Historical and Projection + 
                    Fill in Water And Sewer field for all added columns and save changes`);
        testData.periods.forEach((per) => {
            Income._ExpenseHistory.Actions.selectExpensePeriod(per.expensePeriodType)
                .enterExpenseYear(per.year)
                .clickAddExpenseYearButton()
                .enterIssueByColIndex(per.waterAndSewer, tableExpenseHistoryCellNames.waterAndSewer, 0);
        });
        testData.periodsMonth.forEach((per) => {
            Income._ExpenseHistory.Actions.selectExpensePeriod(per.expensePeriodType)
                .enterExpenseMonth(per.month)
                .enterExpenseYear(per.year)
                .clickAddExpenseYearButton()
                .enterIssueByColIndex(per.waterAndSewer, tableExpenseHistoryCellNames.waterAndSewer, 0);
        });
        Income._ExpenseHistory.Actions.verifyAverageTable();

        cy.saveLocalStorage();
    });

    beforeEach("RestoreLocalStorage", () => {
        cy.restoreLocalStorage();
    });

    it("[QA-4898]", () => {

        cy.stepInfo("4. Go to Expense Forecast and make sure that Per SF radiobutton is selected for Water & Sewer  card");
        testData.basis = "sf";
        _NavigationSection.Actions.navigateToExpenseForecast();
        Income._ExpenseForecastActions.chooseForecastItemBasis(testData.actualWaterAndSewerItem)
            .verifyForecastItemBasis(testData.actualWaterAndSewerItem);

        cy.stepInfo(`4.1 Check historical expenses values for Water & Sewer card. They should be calculated 
                    for each expense type as: [Expense Period type]Water & Sewer / GBA`);
        Income._ExpenseForecastActions.Actions.verifyForecastItemByExpensePeriodType(testData.actualWaterAndSewerItem, testData.buildingDescription, "Actual")
            .verifyForecastItemByExpensePeriodType(testData.t12WaterAndSewerItem, testData.buildingDescription, "Actual T12")
            .verifyForecastItemByExpensePeriodType(testData.historicalWaterAndSewerItem, testData.buildingDescription, "Annualized Historical")
            .verifyForecastItemByExpensePeriodType(testData.ownerProjectionWaterAndSewerItem, testData.buildingDescription, "Owner's Projection")
            .hideExpenseForecastHeader()
            .clickSaveButton();

        cy.stepInfo("4.2 Check historical expenses values for Water & Sewer card. They should be correctly displayed on slidebars");

        Income._ExpenseForecastActions.Actions.matchElementSnapshot(
            Income._ExpenseForecastActions.Page.forecastItemCard(
                Income._ExpenseForecastActions.getItemNameForAverage(
                    testData.actualWaterAndSewerItem.name)), testData.waterAndSewerPerSfCardSnapshotName, { padding: [ 10, 100 ] });
        
    });

    it("[QA-4902]", () => {

        cy.stepInfo("4. Go to Expense Forecast and make sure that Per Unit radiobutton is selected for Water & Sewer  card");
        testData.basis = "unit";
        _NavigationSection.Actions.navigateToExpenseForecast();
        Income._ExpenseForecastActions.chooseForecastItemBasis(testData.actualWaterAndSewerItem)
            .verifyForecastItemBasis(testData.actualWaterAndSewerItem);

        cy.stepInfo(`4.1 Check historical expenses values for Water & Sewer card. They should be calculated 
                    for each expense type as: [Expense Period type]Water & Sewer / GBA`);
        Income._ExpenseForecastActions.Actions.verifyForecastItemByExpensePeriodType(testData.actualWaterAndSewerItem, testData.buildingDescription, "Actual")
            .verifyForecastItemByExpensePeriodType(testData.t12WaterAndSewerItem, testData.buildingDescription, "Actual T12")
            .verifyForecastItemByExpensePeriodType(testData.historicalWaterAndSewerItem, testData.buildingDescription, "Annualized Historical")
            .verifyForecastItemByExpensePeriodType(testData.ownerProjectionWaterAndSewerItem, testData.buildingDescription, "Owner's Projection")
            .hideExpenseForecastHeader()
            .clickSaveButton();

        cy.stepInfo("4.2 Check historical expenses values for Water & Sewer card. They should be correctly displayed on slidebars");

        Income._ExpenseForecastActions.Actions.matchElementSnapshot(
            Income._ExpenseForecastActions.Page.forecastItemCard(
                Income._ExpenseForecastActions.getItemNameForAverage(
                    testData.actualWaterAndSewerItem.name)), testData.waterAndSewerPerUnitCardSnapshotName, { padding: [ 10, 100 ] });
        
        deleteReport(testData.reportCreationData.reportNumber);

    });
});