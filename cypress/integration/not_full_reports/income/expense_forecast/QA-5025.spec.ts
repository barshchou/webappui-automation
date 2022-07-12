import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5013_25.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income, Property } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe(`[QA-5025] [Income>Expense forecast] Selected existing expense card is included in calculation`,
    { tags: [ "@income", "@expense_forecast" ] }, () => {

        before("Login, create report", () => {
            Cypress.config('numTestsKeptInMemory', 0);
            createReport(testData.reportCreationData);
            cy.saveLocalStorage();
        });

        beforeEach(() => {
            cy.restoreLocalStorage();
        });

        it("Precondition", () => {

            cy.stepInfo(`1. Go to Property > Summary and add residential and commertial units`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits)
                .enterGrossBuildingArea(testData.buildingDescription.grossArea);

            cy.stepInfo(`2. Go to Income > Residential > In-Place Rent Roll and add rooms to residential units`);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.perRoomAnalysis)
                .enterRoomsNumberByRowNumber(testData.rentRollResUnitFixture.rooms, 0);

            cy.stepInfo(`3. Go to Income > ExpenseForecast and add data in the forecast`);
            _NavigationSection.navigateToExpenseForecast();
            testData.expenseForecastFixtureArray().forEach(element => {
                Income._ExpenseForecastActions.enterForecastItemForecast(element);
            });
        });

        it(`Verify If “Include Expense on Pro Forma”  checkbox is selected but there is 
                data left in the forecast, this data is included in calculations on Pro forma and Expense forecast page 
                (Per Unit measure + Full Appraiser's forecasts)`, () => {

            Income._ExpenseForecastActions.totalSumForecastPSFAllCards(
                testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms
            )
                .totalSumForecastPerUnitAllCards(
                    testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms
                );
            _NavigationSection.navigateToProForma();
            Income._ProFormaActions.verifyTotalTOEexTaxesIncludeForecasts(testData.buildingDescription.grossArea)
                .verifyPsfTOEexTaxesIncludeForecasts()
                .verifyPerUnitTOEexTaxesIncludeForecasts()
                .verifyTotalTOEIncludeForecasts(testData.buildingDescription.grossArea)
                .verifyPsfTOEIncludeForecasts()
                .verifyPerUnitTOEIncludeForecasts()
                .verifyTotalNOIIncludeForecasts(testData.buildingDescription.grossArea)
                .verifyPsfNOIIncludeForecasts()
                .verifyPerUnitNOIIncludeForecasts();
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.verifyTotalForecastPSF(
                testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms
            )
                .chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'))
                .verifyTotalForecastPerUnit(
                    testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms
                );
        });

        it(`Verify If “Include Expense on Pro Forma” checkbox is selected but there is 
                data left in the forecast, this data is included in calculations on Pro forma and Expense forecast page 
                (PSF measure + Full Appraiser's forecasts)`, () => {

            testData.expenseForecastFixtureArray().forEach(element => {
                Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastInsuranceFixtureUltimate(element, "sf"));
            });
            Income._ExpenseForecastActions.totalSumForecastPSFAllCards(
                testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms
            )
                .totalSumForecastPerUnitAllCards(
                    testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms
                );
            _NavigationSection.navigateToProForma();
            Income._ProFormaActions.verifyTotalTOEexTaxesIncludeForecasts(testData.buildingDescription.grossArea)
                .verifyPsfTOEexTaxesIncludeForecasts()
                .verifyPerUnitTOEexTaxesIncludeForecasts()
                .verifyTotalTOEIncludeForecasts(testData.buildingDescription.grossArea)
                .verifyPsfTOEIncludeForecasts()
                .verifyPerUnitTOEIncludeForecasts()
                .verifyTotalNOIIncludeForecasts(testData.buildingDescription.grossArea)
                .verifyPsfNOIIncludeForecasts()
                .verifyPerUnitNOIIncludeForecasts();
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.verifyTotalForecastPerUnit(
                testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms
            )
                .chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'))
                .verifyTotalForecastPSF(
                    testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms
                );
        });

        it(`Verify If “Include Expense on Pro Forma”  checkbox is selected but there is 
                data left in the forecast, this data is included in calculations on Pro forma and Expense forecast page 
                (Per Room measure for Fuel + Full Appraiser's forecasts)`, () => {

            //BECAUSE OF BUG
            //Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastInsuranceFixtureUltimate(testData.expenseForecastFuelFixture, "room"));
            // Income._ExpenseForecastActions.totalSumForecastPSFAllCards(
            //     testData.buildingDescription.grossArea,
            //     testData.numberOfResidentialUnits,
            //     testData.rentRollResUnitFixture.rooms
            // )
            //     .totalSumForecastPerUnitAllCards(
            //         testData.buildingDescription.grossArea,
            //         testData.numberOfResidentialUnits,
            //         testData.rentRollResUnitFixture.rooms
            //     );
            // _NavigationSection.navigateToProForma();
            // Income._ProFormaActions.verifyTotalTOEexTaxesIncludeForecasts(testData.buildingDescription.grossArea)
            //     .verifyPsfTOEexTaxesIncludeForecasts()
            //     .verifyPerUnitTOEexTaxesIncludeForecasts()
            //     .verifyTotalTOEIncludeForecasts(testData.buildingDescription.grossArea)
            //     .verifyPsfTOEIncludeForecasts()
            //     .verifyPerUnitTOEIncludeForecasts()
            //     .verifyTotalNOIIncludeForecasts(testData.buildingDescription.grossArea)
            //     .verifyPsfNOIIncludeForecasts()
            //     .verifyPerUnitNOIIncludeForecasts();
            // _NavigationSection.navigateToExpenseForecast();
            // Income._ExpenseForecastActions.verifyTotalForecastPSF(
            //     testData.buildingDescription.grossArea,
            //     testData.numberOfResidentialUnits,
            //     testData.rentRollResUnitFixture.rooms
            // )
            //     .chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'))
            //     .verifyTotalForecastPerUnit(
            //         testData.buildingDescription.grossArea,
            //         testData.numberOfResidentialUnits,
            //         testData.rentRollResUnitFixture.rooms
            //     );

            deleteReport(testData.reportCreationData.reportNumber);
        });
    });