import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4861.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income } from "../../../../actions";

describe("Per SF Appraiser's Forecast value for Insurance is correctly converted to Per Unit value", 
    { tags: [ "@income", "@expense_forecast" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Navigate to Property -> Summary and enter gross building area 
            and number of residential units`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.buildingDescription.grossArea)
                .enterNumberOfResUnits(testData.buildingDescription.numberOfUnits);

            cy.stepInfo(`2. Go to Expense Forecast and make sure that Per SF radio button 
            is selected for Insurance card`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.verifyForecastItemBasis(testData.insuranceItem);

            cy.stepInfo(`3. Fill in Appraiser's Forecast field for Insurance card`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.insuranceItem);

            cy.stepInfo(`4. Verify that Per Unit value below this field is calculated as: 
            PSF Appraiser’s Forecast * GBA / # of Residential Units`);
            Income._ExpenseForecastActions
                .verifyForecastItemBasisMoney(testData.insuranceItem, testData.buildingDescription);
        });
    });