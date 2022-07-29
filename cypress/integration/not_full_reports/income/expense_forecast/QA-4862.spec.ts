import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4862.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Income from "../../../../actions/income/income.manager";

describe("Per Unit Appraiser's Forecast value for Insurance is correctly converted to Per SF value",
    { tags: [ "@income", "@expense_forecast" ] }, () => {
        
        before("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Navigate to Property -> Summary and enter gross building area 
            and number of residential units`);
            NavigationSection.navigateToPropertySummary();
            Property.Summary.enterGrossBuildingArea(testData.buildingDescription.grossArea)
                .enterNumberOfResUnits(testData.buildingDescription.numberOfUnits);

            cy.stepInfo(`2. Go to Expense Forecast and make sure that Per Unit radio button 
            is selected for Insurance card`);
            NavigationSection.navigateToExpenseForecast();
            Income.ExpenseForecast.chooseForecastItemBasis(testData.insuranceItem);

            cy.stepInfo(`3. Fill in Appraiser's Forecast field for Insurance card`);
            Income.ExpenseForecast.enterForecastItemForecast(testData.insuranceItem);

            cy.stepInfo(`4. Verify that Per SF value below this field is calculated as: 
            Per Unit Appraiser’s Forecast * # of Residential Units / GBA`);
            Income.ExpenseForecast.Actions
                .verifyForecastItemBasisMoney(testData.insuranceItem, testData.buildingDescription);
        });
    });