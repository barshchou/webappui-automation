/// <reference types="cypress-grep" />
import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4941.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Income from "../../../../actions/income/income.manager";

describe("Historical expense Fuel Per SF is correctly calculated and displayed", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterGrossBuildingArea(testData.buildingDescription.grossArea)
            .enterNumberOfResUnits(testData.buildingDescription.numberOfUnits);
    });

    it("Test body", { tags: "@snapshot_tests" }, () => {
        cy.stepInfo(`1. Go to Expense Forecast 
        and make sure that Per Unit radiobutton is selected for Repairs & Maintenance card`);
        NavigationSection.navigateToExpenseForecast();
        Income.ExpenseForecast.Actions
        .chooseForecastItemBasis(testData.forecastItem);

        cy.stepInfo("2.  Fill in Appraiser's Forecast field for Repairs & Maintenance card");
        Income.ExpenseForecast.Actions.enterForecastItemForecast(testData.forecastItem);


        cy.stepInfo(`3. Verify that Per SF value below this field is calculated as: 
        Per Unit Appraiser’s Forecast * # of Resi Units / GBA`);
        Income.ExpenseForecast.Actions.verifyForecastItemBasisMoney(
            testData.forecastItem,
            testData.buildingDescription
        );

        deleteReport(testData.reportCreationData.reportNumber);
    })
})