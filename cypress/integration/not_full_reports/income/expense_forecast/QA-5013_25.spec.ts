import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5013_25.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income, Property } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import expensesCardsNames from " ../../../cypress/enums/expense/expenseForecast.enum";


describe(`[QA-5013] [QA-5025] [Income>Expense forecast] Selected existing expense card is included in calculation + is displayed in certain places `,
    { tags: ["@income", "@expense_forecast"] }, () => {

        before("Login, create report", () => {
            Cypress.config('numTestsKeptInMemory', 0);
            createReport(testData.reportCreationData);
            cy.saveLocalStorage();
        });

        beforeEach(() => {
            cy.restoreLocalStorage();
        });

        it("[QA-5013]", function () {

            cy.stepInfo(`1. Go to Property > Summary and add residential and commertial units`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits)
                .enterGrossBuildingArea(testData.buildingDescription.grossArea);

            cy.stepInfo(`2. Go to Income > Residential > In-Place Rent Roll and add rooms to residential units`);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.perRoomAnalysis)
                .enterRoomsNumberByRowNumber(testData.rentRollResUnitFixture.rooms, 0);

            cy.stepInfo(`3. Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
                         is displayed in the Pro Forma page > Operating Expenses section and
                         is displayed in the Expense Forecast page > Total operating expenses card and generated comment (PSF measure + Empty Appraiser's forecasts)`);
            _NavigationSection.navigateToExpenseForecast();
            expensesCardsNames.expenseCardsIncludeInProFormaCheckboxArray.forEach(element => {
                Income._ExpenseForecastActions.verifyIncludeInProFormaCheckboxIsChecked(element);
            });
            _NavigationSection.navigateToProForma();
            testData.expensesInProFormaByDefaultArray.forEach(element => {
                Income._ProFormaActions.Page.categoryCellTotal(element).should('exist');
            });
            _NavigationSection.navigateToExpenseForecast();
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms,
            ).
                verifyTOEAppraisersValueLinePSF(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'));
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms).
                verifyTOEAppraisersValueLinePerUnit(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));

            cy.stepInfo(`3. Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
                         is displayed in the Pro Forma page > Operating Expenses section and is displayed 
                         in the Expense Forecast page > Total operating expenses card and generated comment (Per Unit measure + Empty Appraiser's forecasts)`);
            testData.expenseForecastFixtureArray("unit").forEach(element => {
                Income._ExpenseForecastActions.chooseForecastItemBasis(element);
            });
            _NavigationSection.navigateToProForma();
            testData.expensesInProFormaByDefaultArray.forEach(element => {
                Income._ProFormaActions.Page.categoryCellTotal(element).should('exist');
            });
            _NavigationSection.navigateToExpenseForecast();
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms,
            ).
                verifyTOEAppraisersValueLinePSF(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'));
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms).
                verifyTOEAppraisersValueLinePerUnit(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));

            cy.stepInfo(`4. Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
                         is displayed in the Pro Forma page > Operating Expenses section and is displayed 
                         in the Expense Forecast page > Total operating expenses card and generated comment (Per Room measure for Fuel + Empty Appraiser's forecasts)`);
            // Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastFuelFixture('room'));
            // _NavigationSection.navigateToProForma();
            // testData.expensesInProFormaByDefaultArray.forEach(element => {
            //     Income._ProFormaActions.Page.categoryCellTotal(element).should('exist');
            // });
            // _NavigationSection.navigateToExpenseForecast();

            // testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
            //     testData.numberOfResidentialUnits,
            //     testData.rentRollResUnitFixture.rooms,
            //     ).
            //     verifyTOEAppraisersValueLinePSF(testData.buildingDescription.grossArea,
            //         testData.numberOfResidentialUnits,
            //         testData.rentRollResUnitFixture.rooms);
            // Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'));
            // testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
            //     testData.numberOfResidentialUnits,
            //     testData.rentRollResUnitFixture.rooms).
            //     verifyTOEAppraisersValueLinePerUnit(testData.buildingDescription.grossArea,
            //         testData.numberOfResidentialUnits,
            //         testData.rentRollResUnitFixture.rooms);
            // Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));

            cy.stepInfo(`5. Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
                         is displayed in the Pro Forma page > Operating Expenses section and is displayed in the 
                         Expense Forecast page > Total operating expenses card and generated comment (Per Room measure for Fuel + Full Appraiser's forecasts)`);
            testData.expenseForecastFixtureArray().forEach(element => {
                Income._ExpenseForecastActions.enterForecastItemForecast(element);
            });
            _NavigationSection.navigateToProForma();
            testData.expensesInProFormaByDefaultArray.forEach(element => {
                Income._ProFormaActions.Page.categoryCellTotal(element).should('exist');
            });
            _NavigationSection.navigateToExpenseForecast();
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms,
            ).
                verifyTOEAppraisersValueLinePSF(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'))
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms).
                verifyTOEAppraisersValueLinePerUnit(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));

            cy.stepInfo(`6. Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
                         is displayed in the Pro Forma page> Operating Expenses section and is displayed in the 
                         Expense Forecast page>Total operating expenses card and generated comment (PSF measure + Full Appraiser's forecasts)`);
            testData.expenseForecastFixtureArray("sf").forEach(element => {
                Income._ExpenseForecastActions.chooseForecastItemBasis(element);
            });
            _NavigationSection.navigateToProForma();
            testData.expensesInProFormaByDefaultArray.forEach(element => {
                Income._ProFormaActions.Page.categoryCellTotal(element).should('exist');
            });
            _NavigationSection.navigateToExpenseForecast();
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms,
            ).
                verifyTOEAppraisersValueLinePSF(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'));
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms).
                verifyTOEAppraisersValueLinePerUnit(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));

            cy.stepInfo(`7. Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
                         is displayed in the Pro Forma page > Operating Expenses section and is displayed 
                         in the Expense Forecast page > Total operating expenses card and generated comment (Per Unit measure + Full Appraiser's forecasts)`);
            testData.expenseForecastFixtureArray("unit").forEach(element => {
                Income._ExpenseForecastActions.chooseForecastItemBasis(element);
            });
            _NavigationSection.navigateToProForma();
            testData.expensesInProFormaByDefaultArray.forEach(element => {
                Income._ProFormaActions.Page.categoryCellTotal(element).should('exist');
            });
            _NavigationSection.navigateToExpenseForecast();
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms,
            ).
                verifyTOEAppraisersValueLinePSF(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'));
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms).
                verifyTOEAppraisersValueLinePerUnit(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));
        });

        it("[QA-5025]", () => {

            cy.stepInfo(`1. Verify If “Include Expense on Pro Forma”  checkbox is selected but there is 
                         data left in the forecast, this data is included in calculations on Pro forma and Expense forecast page 
                         (Per Unit measure + Full Appraiser's forecasts)`);
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

            cy.stepInfo(`2. Verify If “Include Expense on Pro Forma” checkbox is selected but there is 
                        data left in the forecast, this data is included in calculations on Pro forma and Expense forecast page 
                        (PSF measure + Full Appraiser's forecasts)`);
            testData.expenseForecastFixtureArray("sf").forEach(element => {
                Income._ExpenseForecastActions.chooseForecastItemBasis(element);
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

            cy.stepInfo(`3. Verify If “Include Expense on Pro Forma”  checkbox is selected but there is 
                         data left in the forecast, this data is included in calculations on Pro forma and Expense forecast page 
                         (Per Room measure for Fuel + Full Appraiser's forecasts)`);

            //BECAUSE OF BUG
            // Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastFuelFixture('room'));
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