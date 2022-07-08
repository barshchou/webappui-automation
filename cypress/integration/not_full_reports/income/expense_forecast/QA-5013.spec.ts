import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5013_25.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income, Property } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import expensesCardsNames from " ../../../cypress/enums/expense/expenseForecast.enum";

describe(`[QA-5013] [Income>Expense forecast] Selected expense card is displayed in certain places`,
    { tags: [ "@income", "@expense_forecast" ] }, () => {

        before("Login, create report", () => {
            Cypress.config('numTestsKeptInMemory', 0);
            createReport(testData.reportCreationData);
        });

        it("Test body", function () {

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
            Income._ExpenseForecastActions.verifyTOECommentary(testData.commentaries(testData.forecastPSFTotal('0'), testData.forecastPerUnitTotal('0')).generated);
            Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', testData.forecastPSFTotal('0'));
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'))
                .verifyTOECommentary(testData.commentaries(testData.forecastPSFTotal('0'), testData.forecastPerUnitTotal('0')).generated);
            Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', testData.forecastPerUnitTotal('0'));
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));

            cy.stepInfo(`4. Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
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
            Income._ExpenseForecastActions.verifyTOECommentary(testData.commentaries(testData.forecastPSFTotal('0'), testData.forecastPerUnitTotal('0')).generated);
            Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', testData.forecastPSFTotal('0'));
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'))
                .verifyTOECommentary(testData.commentaries(testData.forecastPSFTotal('0'), testData.forecastPerUnitTotal('0')).generated);
            Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', testData.forecastPerUnitTotal('0'));
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));

            cy.stepInfo(`5. Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
                         is displayed in the Pro Forma page > Operating Expenses section and is displayed 
                         in the Expense Forecast page > Total operating expenses card and generated comment (Per Room measure for Fuel + Empty Appraiser's forecasts)`);
            // Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastFuelFixture('room'));
            // _NavigationSection.navigateToProForma();
            // testData.expensesInProFormaByDefaultArray.forEach(element => {
            //     Income._ProFormaActions.Page.categoryCellTotal(element).should('exist');
            // });
            // _NavigationSection.navigateToExpenseForecast();

            // Income._ExpenseForecastActions.verifyTOECommentary(testData.commentaries(testData.forecastPSFTotal('0'), testData.forecastPerUnitTotal('0')).generated);
            // Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', testData.forecastPSFTotal('0'));
            // Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'))
            //     .verifyTOECommentary(testData.commentaries(testData.forecastPSFTotal('0'), testData.forecastPerUnitTotal('0')).generated);
            // Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', testData.forecastPerUnitTotal('0'));
            // Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));

            cy.stepInfo(`6. Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
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
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'));
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms).
                verifyTOEAppraisersValueLinePerUnit(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));

            cy.stepInfo(`7. Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
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

            cy.stepInfo(`8. Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
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

            deleteReport(testData.reportCreationData.reportNumber);
        }); 
    });