/// <reference types="cypress-grep" />

import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4888.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Property, Income } from "../../../../actions";
import {_NavigationSection} from "../../../../actions/base";


describe("Historical expense Electricity Per Unit is correctly calculated and displayed", () => {


    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });


    it("Test body", { tags: "@snapshot_tests" }, () => {

        cy.stepInfo("1. Pre-condition: Residential Units should be filled in on Property > Summary form");
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits);

        cy.stepInfo("2. Go to Income > Expense History");
        _NavigationSection.Actions.navigateToExpenseHistory();

        cy.stepInfo("3. Add columns for all types of Expense Period: Actual, Actual T12, Annualized Historical and Projection");
        testData.periods.forEach((per, index) => {
            Income._ExpenseHistory.Actions.selectExpensePeriod(per.expensePeriodType)
                .enterExpenseYear(per.year)
                .clickAddExpenseYearButton()
                .enterElectricityByColIndex(per.electricity, 0);
        });
        testData.periodsMonth.forEach((per, index) => {
            Income._ExpenseHistory.Actions.selectExpensePeriod(per.expensePeriodType)
                .enterExpenseMonth(per.month)
                .enterExpenseYear(per.year)
                .clickAddExpenseYearButton()
                .enterElectricityByColIndex(per.electricity, 0);
        });

        cy.stepInfo("4. Fill in Electricity field for all added columns and save changes");
        Income._ExpenseHistory.Actions.verifyAverageTable();

        cy.stepInfo("5. Go to Expense Forecast and make sure that Per Unit radiobutton is selected for Electricity  card");
        _NavigationSection.Actions.navigateToExpenseForecast();
        Income._ExpenseForecastActions.chooseForecastItemBasis(testData.actualElectricityItem);
        Income._ExpenseForecastActions.Actions.verifyForecastItemBasis(testData.actualElectricityItem);

        cy.stepInfo("5.1 Check historical expenses values for Electricity card. They should be calculated for each expense type as: [Expense Period type]Electricity  / # of Residential Units");
        Income._ExpenseForecastActions.Actions.verifyForecastItemByExpensePeriodType(testData.actualElectricityItem, testData.buildingDescription, "Actual")
            .verifyForecastItemByExpensePeriodType(testData.t12ElectricityItem, testData.buildingDescription, "Actual T12")
            .verifyForecastItemByExpensePeriodType(testData.historicalElectricityItem, testData.buildingDescription, "Annualized Historical")
            .verifyForecastItemByExpensePeriodType(testData.ownerProjectionElectricityItem, testData.buildingDescription, "Owner's Projection")
            .hideExpenseForecastHeader();

        cy.stepInfo("5.2 Check historical expenses values for Electricity card. They should be correctly displayed on slidebars");

        Income._ExpenseForecastActions.Actions.matchElementSnapshot(
            Income._ExpenseForecastActions.Page.ElectricityCard, testData.electricityCardSnapshotName, { padding: [10, 100] });


        cy.stepInfo("6. Delete report");
        deleteReport(testData.reportCreationData.reportNumber);

    });
});