import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5013_25.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe(`[QA-5013] [Income>Expense forecast] Selected expense card is displayed in certain places`,
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
            cy.stepInfo(`1. Go to Property > Summary and add residential and commercial units`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits)
                .enterGrossBuildingArea(testData.buildingDescription.grossArea);

            cy.stepInfo(`2. Go to Income > Residential > In-Place Rent Roll and add rooms to residential units`);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.perRoomAnalysis)
                .enterRoomsNumberByRowNumber(testData.rentRollResUnitFixture.rooms, 0);
        });

        it(`Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
            is displayed in the Pro Forma page > Operating Expenses section 
            (PSF measure + Empty Appraiser's forecasts)`, () => {
            _NavigationSection.navigateToExpenseForecast();
            testData.expensesForecastCardNamesArray.forEach(element => {
                Income._ExpenseForecastActions.verifyIncludeInProFormaCheckboxIsChecked(element);
            });
            _NavigationSection.navigateToProForma();
            testData.expensesInProFormaByDefaultArray.forEach(element => {
                Income._ProFormaActions.Page.categoryCellTotal(element).should('exist');
            });
        });

        it(`Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
            is displayed in the Expense Forecast page > Total operating expenses card (TOE card basis = Per SF)
            and generated comment (PSF measure + Empty Appraiser's forecasts)`, () => {

            _NavigationSection.navigateToExpenseForecast();
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms,
            )
                .verifyTOEAppraisersValueLinePSF(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
        });

        it(`Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
            is displayed in the Expense Forecast page > Total operating expenses card (TOE card basis = Per Unit)
            and generated comment (PSF measure + Empty Appraiser's forecasts)`, () => {

            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'));
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms).
                verifyTOEAppraisersValueLinePerUnit(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));
        });

        it(`Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
            is displayed in the Pro Forma page > Operating Expenses section 
            (Per Unit measure + Empty Appraiser's forecasts)`, () => {
            testData.expenseForecastFixtureArray('unit').forEach(element => {
                Income._ExpenseForecastActions.chooseForecastItemBasis(element);
            });
            _NavigationSection.navigateToProForma();
            testData.expensesInProFormaByDefaultArray.forEach(element => {
                Income._ProFormaActions.Page.categoryCellTotal(element).should('exist');
            });
        });

        it(`Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
            is displayed in the Expense Forecast page > Total operating expenses card (TOE card basis = Per SF) 
            and generated comment (Per Unit measure + Empty Appraiser's forecasts)`, () => {
            _NavigationSection.navigateToExpenseForecast();
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms,
            )
                .verifyTOEAppraisersValueLinePSF(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
        });

        it(`Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
            is displayed in the Expense Forecast page > Total operating expenses card (TOE card basis = Per Unit) 
            and generated comment (Per Unit measure + Empty Appraiser's forecasts)`, () => {
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'));
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms)
                .verifyTOEAppraisersValueLinePerUnit(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));
        });

        it(`Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
            is displayed in the Pro Forma page > Operating Expenses section 
            (Per Room measure for Fuel + Empty Appraiser's forecasts)`, () => {
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastFuelFixture('room'));
            _NavigationSection.navigateToProForma();
            testData.expensesInProFormaByDefaultArray.forEach(element => {
                Income._ProFormaActions.Page.categoryCellTotal(element).should('exist');
            });
        });

        it(`Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
            is displayed in the Expense Forecast page > Total operating expenses card (TOE card basis = Per SF) 
            and generated comment (Per Room measure for Fuel + Empty Appraiser's forecasts)`, () => {
            _NavigationSection.navigateToExpenseForecast();
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms,
            )
                .verifyTOEAppraisersValueLinePSF(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
        });

        it(`Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
            is displayed in the Expense Forecast page > Total operating expenses card (TOE card basis = Per Unit) 
            and generated comment (Per Room measure for Fuel + Empty Appraiser's forecasts)`, () => {
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'));
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms)
                .verifyTOEAppraisersValueLinePerUnit(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));
        });

        it(`Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
            is displayed in the Pro Forma page > Operating Expenses section 
            (Per Room measure for Fuel + Full Appraiser's forecasts)`, () => {
            testData.expenseForecastFixtureArray().forEach(element => {
                Income._ExpenseForecastActions.enterForecastItemForecast(element);
            });
            _NavigationSection.navigateToProForma();
            testData.expensesInProFormaByDefaultArray.forEach(element => {
                Income._ProFormaActions.Page.categoryCellTotal(element).should('exist');
            });
        });

        it(`Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
            is displayed in the Expense Forecast page > Total operating expenses card (TOE card basis = Per SF) 
            and generated comment (Per Room measure for Fuel + Full Appraiser's forecasts)`, () => {
            _NavigationSection.navigateToExpenseForecast();
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms,
            )
                .verifyTOEAppraisersValueLinePSF(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
        });

        it(`Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
            is displayed in the Expense Forecast page > Total operating expenses card (TOE card basis = Per Unit) 
            and generated comment (Per Room measure for Fuel + Full Appraiser's forecasts)`, () => {
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'));
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms).
                verifyTOEAppraisersValueLinePerUnit(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));
        });

        it(`Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
            is displayed in the Pro Forma page > Operating Expenses section 
            (PSF measure + Full Appraiser's forecasts)`, () => {
            testData.expenseForecastFixtureArray("sf").forEach(element => {
                Income._ExpenseForecastActions.chooseForecastItemBasis(element);
            });
            _NavigationSection.navigateToProForma();
            testData.expensesInProFormaByDefaultArray.forEach(element => {
                Income._ProFormaActions.Page.categoryCellTotal(element).should('exist');
            });
        });

        it(`Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
            is displayed in the Expense Forecast page > Total operating expenses card (TOE card basis = Per SF) 
            and generated comment (PSF measure + Full Appraiser's forecasts)`, () => {
            _NavigationSection.navigateToExpenseForecast();
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms,
            )
                .verifyTOEAppraisersValueLinePSF(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
        });

        it(`Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
            is displayed in the Expense Forecast page > Total operating expenses card (TOE card basis = Per Unit) 
            and generated comment (PSF measure + Full Appraiser's forecasts)`, () => {
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'));
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms).
                verifyTOEAppraisersValueLinePerUnit(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));
        });

        it(`Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
            is displayed in the Pro Forma page > Operating Expenses section 
            (Per Unit measure + Full Appraiser's forecasts)`, () => {
            testData.expenseForecastFixtureArray("unit").forEach(element => {
                Income._ExpenseForecastActions.chooseForecastItemBasis(element);
            });
            _NavigationSection.navigateToProForma();
            testData.expensesInProFormaByDefaultArray.forEach(element => {
                Income._ProFormaActions.Page.categoryCellTotal(element).should('exist');
            });
        });

        it(`Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
            is displayed in the Expense Forecast page > Total operating expenses card (TOE card basis = Per SF) 
            and generated comment (Per Unit measure + Full Appraiser's forecasts)`, () => {
            _NavigationSection.navigateToExpenseForecast();
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms,
            )
                .verifyTOEAppraisersValueLinePSF(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
        });

        it(`Verify if “Include Expense on Pro Forma” is selected -> this  expense category 
            is displayed in the Expense Forecast page > Total operating expenses card (TOE card basis = Per Unit) 
            and generated comment (Per Unit measure + Full Appraiser's forecasts)`, () => {
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'));
            testData.verifyTOECommentGenerated(testData.buildingDescription.grossArea,
                testData.numberOfResidentialUnits,
                testData.rentRollResUnitFixture.rooms)
                .verifyTOEAppraisersValueLinePerUnit(testData.buildingDescription.grossArea,
                    testData.numberOfResidentialUnits,
                    testData.rentRollResUnitFixture.rooms);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));
        });
    });
