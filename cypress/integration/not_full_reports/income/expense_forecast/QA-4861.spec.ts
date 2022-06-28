import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4861.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Income from "../../../../actions/income/income.manager";

describe("Per SF Appraiser's Forecast value for Insurance is correctly converted to Per Unit value", 
    { tags: [ "@income", "@expense_forecast" ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Navigate to Property -> Summary and enter gross building area and number of residential units");
        NavigationSection.Actions.navigateToPropertySummary();
        Property.Summary.Actions.enterGrossBuildingArea(testData.buildingDescription.grossArea)
            .enterNumberOfResUnits(testData.buildingDescription.numberOfUnits);

        cy.stepInfo("2. Go to Expense Forecast and make sure that Per SF radiobutton is selected for Insurance card");
        NavigationSection.Actions.navigateToExpenseForecast();
        Income.ExpenseForecast.Actions.verifyForecastItemBasis(testData.insuranceItem);

        cy.stepInfo("3. Fill in Appraiser's Forecast field for Insurance card");
        Income.ExpenseForecast.Actions.enterForecastItemForecast(testData.insuranceItem);

        cy.stepInfo("4. Verify that Per Unit value below this field is calculated as: PSF Appraiser’s Forecast * GBA / # of Resi Units");
        Income.ExpenseForecast.Actions.verifyForecastItemBasisMoney(testData.insuranceItem, testData.buildingDescription);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});