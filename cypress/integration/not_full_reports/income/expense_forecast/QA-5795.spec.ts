import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5795.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { Property, Income } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";

describe(`Per SF Appraiser's Forecast value for Fuel is correctly converted to Per Unit value`,
    { tags: [ "@income", "@expense_forecast" ] }, () => {
        beforeEach(`Login, create report`, () => {
            createReport(testData.reportCreationData);
        });

        it(`[QA-5795]`, () => {
            cy.stepInfo(`Pre-condition: Fill in Residential Units and Square Foot Analysis 
            on Property > Summary form`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits)
                .selectBasisSquareFootAnalysis(testData.basisSquareFootAnalysis)
                .fillBasisSquareFootAnalysis(testData.buildingDescription.grossArea);

            cy.stepInfo(`1. Go to Expense Forecast and make sure that Per SF radio button 
            is selected for Fuel card`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.fuelPerUnitItem);

            cy.stepInfo(`2. Fill in Appraiser's Forecast field for Fuel card`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.fuelPerUnitItem);
            
            cy.stepInfo(`3. Verify that Per Unit value below this field is calculated as: 
            PSF Appraiser's Forecast * selected Basis for Square Foot Analysis / # of Residential Units`);
            Income._ExpenseForecastActions.verifyForecastItemBasisMoney(testData.fuelPerUnitItem, 
                testData.buildingDescription);
        });
    });
