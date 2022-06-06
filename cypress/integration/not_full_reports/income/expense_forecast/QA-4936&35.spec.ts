/// <reference types="cypress-grep" />
import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4936.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Income from "../../../../actions/income/income.manager";

describe("Historical expense Repairs & Maintenance Per SF is correctly calculated and displayed", 
    { tags: [ "@income", "@expense_forecast" ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterGrossBuildingArea(testData.buildingDescription.grossArea)
            .enterNumberOfResUnits(testData.buildingDescription.numberOfUnits);
    });

    it("Test body", () => {
        cy.stepInfo(`QA-4936 => 1. Go to Expense Forecast 
        and make sure that Per Unit radiobutton is selected for Repairs & Maintenance card`);
        NavigationSection.navigateToExpenseForecast();
        Income.ExpenseForecast.Actions
        .chooseForecastItemBasis(testData.forecastItem);

        cy.stepInfo("QA-4936 => 2. Fill in Appraiser's Forecast field for Repairs & Maintenance card");
        Income.ExpenseForecast.Actions.enterForecastItemForecast(testData.forecastItem);


        cy.stepInfo(`
        QA-4936 => 3. Verify that Per SF value below this field is calculated as: 
        Per Unit Appraiser’s Forecast * # of Resi Units / GBA`);
        Income.ExpenseForecast.Actions.verifyForecastItemBasisMoney(
            testData.forecastItem,
            testData.buildingDescription
        );

        cy.stepInfo(`
        QA-4935 => 3. Verify that Per Unit value below this field is calculated as: 
        PSF Appraiser’s Forecast * GBA / # of Resi Units`);
        testData.forecastItem.forecast = 23;
        testData.forecastItem.basis = "sf";
        Income.ExpenseForecast.Actions.enterForecastItemForecast(testData.forecastItem);
        Income.ExpenseForecast.Actions
        .chooseForecastItemBasis(testData.forecastItem);
        Income.ExpenseForecast.Actions.verifyForecastItemBasisMoney(
            testData.forecastItem,
            testData.buildingDescription
        );

        deleteReport(testData.reportCreationData.reportNumber);
    });
});