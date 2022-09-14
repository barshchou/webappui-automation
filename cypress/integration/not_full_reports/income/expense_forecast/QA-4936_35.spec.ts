import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4936.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income } from "../../../../actions";

describe("Historical expense Repairs & Maintenance Per SF is correctly calculated and displayed", 
    { tags: [ "@income", "@expense_forecast" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.buildingDescription.grossArea)
                .enterNumberOfResUnits(testData.buildingDescription.numberOfUnits);
        });

        it("Test body", () => {
            cy.stepInfo(`[QA-4936] 1. Go to Expense Forecast 
            and make sure that Per Unit radio button is selected for Repairs & Maintenance card`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions
                .chooseForecastItemBasis(testData.forecastItem);

            cy.stepInfo("[QA-4936] 2. Fill in Appraiser's Forecast field for Repairs & Maintenance card");
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.forecastItem);

            cy.stepInfo(`[QA-4936] 3. Verify that Per SF value below this field is calculated as: 
            Per Unit Appraiser's Forecast * # of Residential Units / GBA`);
            Income._ExpenseForecastActions.verifyForecastItemBasisMoney(
                testData.forecastItem,
                testData.buildingDescription
            );

            cy.stepInfo(`[QA-4935] 3. Verify that Per Unit value below this field is calculated as: 
            PSF Appraiser's Forecast * GBA / # of Residential Units`);
            testData.forecastItem.forecast = 23;
            testData.forecastItem.basis = "sf";
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.forecastItem)
                .chooseForecastItemBasis(testData.forecastItem)
                .verifyForecastItemBasisMoney(testData.forecastItem, testData.buildingDescription);
        });
    });