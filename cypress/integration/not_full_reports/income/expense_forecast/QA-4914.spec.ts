import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4914.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";
import { Income } from "../../../../actions";

describe("Per Unit Appraiser's Forecast value for Water & Sewer is correctly converted to Per SF value", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Navigate to Property -> Summary and enter gross building area and number of residential units");
        _NavigationSection.Actions.navigateToPropertySummary();
        Property._Summary.Actions.enterGrossBuildingArea(testData.buildingDescription.grossArea)
            .enterNumberOfResUnits(testData.buildingDescription.numberOfUnits);

        cy.stepInfo("2. Go to Expense Forecast and make sure that Per Unit radiobutton is selected for Water & Sewer card");
        _NavigationSection.Actions.navigateToExpenseForecast();
        Income._ExpenseForecastActions.Actions.chooseForecastItemBasis(testData.forecastItem);
        Income._ExpenseForecastActions.Actions.verifyForecastItemBasis(testData.forecastItem);

        cy.stepInfo("3. Fill in Appraiser's Forecast field for Water & Sewer card");
        Income._ExpenseForecastActions.Actions.enterForecastItemForecast(testData.forecastItem);

        cy.stepInfo("4. Verify that Per SF value below this field is calculated as: Per Unit Appraiser’s Forecast * # of Resi Units / GBA");
        Income._ExpenseForecastActions.Actions.verifyForecastItemBasisMoney(testData.forecastItem, testData.buildingDescription);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});