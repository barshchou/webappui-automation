import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4898_4902.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { Income, DataCollections } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import tableExpenseHistoryCellNames from "../../../../enums/expense/expenseHistoryTableRows.enum";

// TODO: Test fails due to https://bowery.atlassian.net/browse/WEB-7012 and WEB-7110
describe("Historical expense Water & Sewer Per SF/Unit is correctly calculated and displayed",
    { tags:[ "@snapshot_tests", "@income", "@expense_forecast", "@bug", "@WEB-7012", "@WEB-7110" ] }, () => {

        before("Login, create report", () => {
            createReport(testData.reportCreationData);

            cy.stepInfo("1. Pre-condition: Residential Units should be filled in on Property > Summary form");
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits)
                .enterGrossBuildingArea(testData.buildingDescription.grossArea);

            cy.stepInfo("2. Go to Income > Expense History");
            _NavigationSection.navigateToExpenseHistory();

            cy.stepInfo(`3. Add columns for all types of Expense Period: 
            Actual, Actual T12, Annualized Historical and Projection + 
            Fill in Water And Sewer field for all added columns and save changes`);
            testData.periods.forEach((per) => {
                Income._ExpenseHistory.selectExpensePeriod(per.expensePeriodType)
                    .enterExpenseYear(per.year)
                    .clickAddExpenseYearButton()
                    .enterIssueByColIndex(per.waterAndSewer, tableExpenseHistoryCellNames.waterAndSewer, 0);
            });
            testData.periodsMonth.forEach((per) => {
                Income._ExpenseHistory.selectExpensePeriod(per.expensePeriodType)
                    .enterExpenseMonth(per.month)
                    .enterExpenseYear(per.year)
                    .clickAddExpenseYearButton()
                    .enterIssueByColIndex(per.waterAndSewer, tableExpenseHistoryCellNames.waterAndSewer, 0);
            });
            Income._ExpenseHistory.verifyAverageTable();

            cy.saveLocalStorage();
        });

        beforeEach("RestoreLocalStorage", () => {
            cy.restoreLocalStorage();
        });

        it("[QA-4898]", () => {
            cy.stepInfo(`4. Go to Expense Forecast and make sure that Per SF radio button 
            is selected for Water & Sewer  card`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.actualWaterAndSewerItem(testData.basisSF))
                .verifyForecastItemBasis(testData.actualWaterAndSewerItem(testData.basisSF));

            cy.stepInfo(`4.1 Check historical expenses values for Water & Sewer card. They should be calculated 
                    for each expense type as: [Expense Period type]Water & Sewer / GBA`);
            Income._ExpenseForecastActions
                .verifyForecastItemByExpensePeriodType(testData.actualWaterAndSewerItem(testData.basisSF), 
                    testData.buildingDescription, "Actual")
                .verifyForecastItemByExpensePeriodType(testData.t12WaterAndSewerItem(testData.basisSF), 
                    testData.buildingDescription, "Actual T12")
                .verifyForecastItemByExpensePeriodType(testData.historicalWaterAndSewerItem(testData.basisSF), 
                    testData.buildingDescription, "Annualized Historical")
                .verifyForecastItemByExpensePeriodType(testData.ownerProjectionWaterAndSewerItem(testData.basisSF), 
                    testData.buildingDescription, "Owner's Projection")
                .hideHeader()
                .clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo(`4.2 Check historical expenses values for Water & Sewer card. 
            They should be correctly displayed on slide bars`);
            Income._ExpenseForecastActions.matchElementSnapshot(
                Income._ExpenseForecastActions.Page.forecastItemCard(
                    Income._ExpenseForecastActions.getItemNameForAverage(
                        testData.actualWaterAndSewerItem(testData.basisSF).name)), 
                testData.waterAndSewerPerSfCardSnapshotName, 
                { padding: [ 10, 100 ] });
        });

        it("[QA-4902]", () => {
            cy.stepInfo(`4. Go to Expense Forecast and make sure that Per Unit radio button 
            is selected for Water & Sewer  card`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.actualWaterAndSewerItem(testData.basisUnit))
                .verifyForecastItemBasis(testData.actualWaterAndSewerItem(testData.basisUnit));

            cy.stepInfo(`4.1 Check historical expenses values for Water & Sewer card. They should be calculated 
                    for each expense type as: [Expense Period type]Water & Sewer / GBA`);
            Income._ExpenseForecastActions
                .verifyForecastItemByExpensePeriodType(testData.actualWaterAndSewerItem(testData.basisUnit), 
                    testData.buildingDescription, "Actual")
                .verifyForecastItemByExpensePeriodType(testData.t12WaterAndSewerItem(testData.basisUnit), 
                    testData.buildingDescription, "Actual T12")
                .verifyForecastItemByExpensePeriodType(testData.historicalWaterAndSewerItem(testData.basisUnit), 
                    testData.buildingDescription, "Annualized Historical")
                .verifyForecastItemByExpensePeriodType(testData.ownerProjectionWaterAndSewerItem(testData.basisUnit), 
                    testData.buildingDescription, "Owner's Projection")
                .hideHeader()
                .clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo(`4.2 Check historical expenses values for Water & Sewer card. 
            They should be correctly displayed on slide bars`);
            Income._ExpenseForecastActions.matchElementSnapshot(
                Income._ExpenseForecastActions.Page.forecastItemCard(
                    Income._ExpenseForecastActions.getItemNameForAverage(
                        testData.actualWaterAndSewerItem(testData.basisUnit).name)), 
                testData.waterAndSewerPerUnitCardSnapshotName, 
                { padding: [ 10, 100 ] });
        });
    });
