import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5797.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { Property, Income } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";

describe(`Per SF Appraiser's Forecast value for Fuel is correctly converted to Per Room value`,
    { tags: [ "@income", "@expense_forecast" ] }, () => {
        beforeEach(`Login, create report`, () => {
            createReport(testData.reportCreationData);
        });

        it(`[QA-5797]`, () => {
            cy.stepInfo(`Pre-condition: Fill in Residential Units and Square Foot Analysis 
            on Property > Summary form`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits)
                .selectBasisSquareFootAnalysis(testData.basisSquareFootAnalysis)
                .fillBasisSquareFootAnalysis(testData.buildingDescription.grossArea);

            cy.stepInfo(`Pre-condition: Fill rooms for residential units`);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.perRoomAnalysis);
            for (let unit = 0; unit < testData.buildingDescription.numberOfUnits; unit++) {
                Income._Residential.InPlaceRentRoll.enterRoomsNumberByRowNumber(testData.rooms, unit);
            }

            cy.stepInfo(`1. Go to Expense Forecast and make sure that Per Room radio button 
            is selected for Fuel card`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.fuelPerRoomItem);

            cy.stepInfo(`2. Fill in Appraiser's Forecast field for Fuel card`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.fuelPerRoomItem);

            cy.stepInfo(`3. Verify that Per Unit and Per SF values below this field are calculated as: 
            PSF Appraiser's Forecast * selected Basis for Square Foot Analysis / # of Residential Units`);
            Income._ExpenseForecastActions.verifyForecastItemBasisMoney(testData.fuelPerRoomItem, 
                testData.buildingDescription, undefined, testData.allRoomsNumber);
        });
    });
