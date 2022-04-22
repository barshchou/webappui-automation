import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4914.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Income from "../../../../actions/income/income.manager";

describe("Per Unit Appraiser's Forecast value for Water & Sewer is correctly converted to Per SF value", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Navigate to Property -> Summary and enter gross building area and number of residential units");
        NavigationSection.Actions.navigateToPropertySummary();
        Property.Summary.Actions.enterGrossBuildingArea(testData.buildingDescription.grossArea)
            .enterNumberOfResUnits(testData.buildingDescription.numberOfUnits);

        cy.stepInfo("2. Go to Expense Forecast and make sure that Per Unit radiobutton is selected for Water & Sewer card");
        NavigationSection.Actions.navigateToExpenseForecast();
        Income.ExpenseForecast.Actions.chooseForecastItemBasis(testData.forecastItem);
        Income.ExpenseForecast.Actions.verifyForecastItemBasis(testData.forecastItem);

        cy.stepInfo("3. Fill in Appraiser's Forecast field for Water & Sewer card");
        Income.ExpenseForecast.Actions.enterForecastItemForecast(testData.forecastItem);

        cy.stepInfo("4. Verify that Per SF value below this field is calculated as: Per Unit Appraiser’s Forecast * # of Resi Units / GBA");
        Income.ExpenseForecast.Actions.verifyForecastItemBasisMoney(testData.forecastItem, testData.buildingDescription);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});