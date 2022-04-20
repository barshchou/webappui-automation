/// <reference types="cypress-grep" />

import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4888.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Income from "../../../../actions/income/income.manager";
import Property from "../../../../actions/property/property.manager";


describe("Historical expense Electricity Per Unit is correctly calculated and displayed", () => {


    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });


    it("Test body", { tags: "@snapshot_tests" }, () => {

        cy.stepInfo("1. Pre-condition: Residential Units should be filled in on Property > Summary form");
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits);

        cy.stepInfo("2. Go to Income > Expense History");
        NavigationSection.Actions.navigateToExpenseHistory();

        cy.stepInfo("3. Add columns for all types of Expense Period: Actual, Actual T12, Annualized Historical and Projection");
        testData.periods.forEach((per, index) => {
            Income.ExpenseHistory.Actions.selectExpensePeriod(per.expensePeriodType)
                .enterExpenseYear(per.year)
                .clickAddExpenseYearButton()
                .enterElectricityByColIndex(per.electricity, index);
        });
        testData.periodsMonth.forEach((per, index) => {
            Income.ExpenseHistory.Actions.selectExpensePeriod(per.expensePeriodType)
                .enterExpenseMonth(per.month)
                .enterExpenseYear(per.year)
                .clickAddExpenseYearButton()
                .enterElectricityByColIndex(per.electricity, index + testData.periods.length);
        });

        cy.stepInfo("4. Fill in Electricity field for all added columns and save changes");
        Income.ExpenseHistory.Actions.verifyAverageTable();

        cy.stepInfo("5. Go to Expense Forecast and make sure that Per Unit radiobutton is selected for Electricity  card");
        NavigationSection.Actions.navigateToExpenseForecast();
        Income.ExpenseForecast.chooseForecastItemBasis(testData.actualElectricityItem);
        Income.ExpenseForecast.Actions.verifyForecastItemBasis(testData.actualElectricityItem);

        cy.stepInfo("5.1 Check historical expenses values for Electricity card. They should be calculated for each expense type as: [Expense Period type]Electricity  / # of Residential Units");
        Income.ExpenseForecast.Actions.verifyForecastItemByExpensePeriodType(testData.actualElectricityItem, testData.buildingDescription, "Actual")
            .verifyForecastItemByExpensePeriodType(testData.t12ElectricityItem, testData.buildingDescription, "Actual T12")
            .verifyForecastItemByExpensePeriodType(testData.historicalElectricityItem, testData.buildingDescription, "Annualized Historical")
            .verifyForecastItemByExpensePeriodType(testData.ownerProjectionElectricityItem, testData.buildingDescription, "Owner's Projection")
            .hideExpenseForecastHeader();

        cy.stepInfo("5.2 Check historical expenses values for Electricity card. They should be correctly displayed on slidebars");

        Income.ExpenseForecast.Actions.matchElementSnapshot(
            Income.ExpenseForecast.Page.ElectricityCard, testData.electricityCardSnapshotName, { padding: [10, 100] });


        cy.stepInfo("6. Delete report");
        deleteReport(testData.reportCreationData.reportNumber);

    });
});