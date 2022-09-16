import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5011_12.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe(`[QA-5011] [Income>Expense forecast] Unselected existing expense card is not displayed in certain places `,
    { tags: [ "@income", "@expense_forecast" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", function () {

            cy.stepInfo(`1. Go to Property > Summary and add residential and commercial units`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits)
                .enterGrossBuildingArea(testData.buildingDescription.grossArea);

            cy.stepInfo(`2. Go to Income > Residential > In-Place Rent Roll and add rooms to residential units`);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.perRoomAnalysis)
                .enterRoomsNumberByRowNumber(testData.rentRollResUnitFixture.rooms, 0);

            cy.stepInfo(`3. Verify if “Include Expense on Pro Forma” is unselected -> this  expense category 
            is NOT displayed in the Pro Forma page> Operating Expenses section and is NOT displayed in the 
            Expense Forecast page>Total operating expenses card and generated comment 
            (PSF measure + Empty Appraiser's forecasts)`);
            _NavigationSection.navigateToExpenseForecast();
            testData.expensesForecastCardNamesArray.forEach(element => {
                Income._ExpenseForecastActions.changeStateOfIncludeInProFormaCheckbox(element, false);
            });
            _NavigationSection.navigateToProForma();
            testData.expensesInProFormaByDefaultArray.forEach(element => {
                Income._ProFormaActions.Page.categoryCellTotal(element).should('not.exist');
            });
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.verifyFormCommentTextBoxText(testData.toeSectionName,
                testData.commentaries.generated);
            Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine
                .should('contain', testData.forecastPSFnotIncluded);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'))
                .verifyFormCommentTextBoxText(testData.toeSectionName, testData.commentaries.generated);
            Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine
                .should('contain', testData.forecastPerUnitNotIncluded);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));

            cy.stepInfo(`4. Verify if “Include Expense on Pro Forma” is unselected -> this  expense category 
            is NOT displayed in the Pro Forma page> Operating Expenses section and is NOT displayed 
            in the Expense Forecast page>Total operating expenses card and generated comment 
            (Per Unit measure + Empty Appraiser's forecasts)`);
            testData.expenseForecastFixtureArray("unit").forEach(element => {
                Income._ExpenseForecastActions.chooseForecastItemBasis(element);
            });
            _NavigationSection.navigateToProForma();
            testData.expensesInProFormaByDefaultArray.forEach(element => {
                Income._ProFormaActions.Page.categoryCellTotal(element).should('not.exist');
            });
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.verifyFormCommentTextBoxText(testData.toeSectionName,
                testData.commentaries.generated);
            Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine
                .should('contain', testData.forecastPSFnotIncluded);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'))
                .verifyFormCommentTextBoxText(testData.toeSectionName, testData.commentaries.generated);
            Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine
                .should('contain', testData.forecastPerUnitNotIncluded);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));

            cy.stepInfo(`5. Verify if “Include Expense on Pro Forma” is unselected -> this  expense category 
            is NOT displayed in the Pro Forma page> Operating Expenses section and is NOT displayed 
            in the Expense Forecast page>Total operating expenses card and generated comment 
            (Per Room measure for Fuel + Empty Appraiser's forecasts)`);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastFuelFixture('room'));
            _NavigationSection.navigateToProForma();
            testData.expensesInProFormaByDefaultArray.forEach(element => {
                Income._ProFormaActions.Page.categoryCellTotal(element).should('not.exist');
            });
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.verifyFormCommentTextBoxText(testData.toeSectionName,
                testData.commentaries.generated);
            Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine
                .should('contain', testData.forecastPSFnotIncluded);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'))
                .verifyFormCommentTextBoxText(testData.toeSectionName, testData.commentaries.generated);
            Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine
                .should('contain', testData.forecastPerUnitNotIncluded);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));

            cy.stepInfo(`6. Verify if “Include Expense on Pro Forma” is unselected -> this  expense category 
            is NOT displayed in the Pro Forma page> Operating Expenses section and is NOT displayed in the 
            Expense Forecast page>Total operating expenses card and generated comment 
            (Per Room measure for Fuel + Full Appraiser's forecasts)`);
            testData.expenseForecastFixtureArray().forEach(element => {
                Income._ExpenseForecastActions.enterForecastItemForecast(element);
            });
            _NavigationSection.navigateToProForma();
            testData.expensesInProFormaByDefaultArray.forEach(element => {
                Income._ProFormaActions.Page.categoryCellTotal(element).should('not.exist');
            });
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.verifyFormCommentTextBoxText(testData.toeSectionName,
                testData.commentaries.generated);
            Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine
                .should('contain', testData.forecastPSFnotIncluded);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'))
                .verifyFormCommentTextBoxText(testData.toeSectionName, testData.commentaries.generated);
            Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine
                .should('contain', testData.forecastPerUnitNotIncluded);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));

            cy.stepInfo(`7. Verify if “Include Expense on Pro Forma” is unselected -> this  expense category 
            is NOT displayed in the Pro Forma page> Operating Expenses section and is NOT displayed in the 
            Expense Forecast page>Total operating expenses card and generated comment 
            (PSF measure + Full Appraiser's forecasts)`);
            testData.expenseForecastFixtureArray("sf").forEach(element => {
                Income._ExpenseForecastActions.chooseForecastItemBasis(element);
            });
            _NavigationSection.navigateToProForma();
            testData.expensesInProFormaByDefaultArray.forEach(element => {
                Income._ProFormaActions.Page.categoryCellTotal(element).should('not.exist');
            });
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.verifyFormCommentTextBoxText(testData.toeSectionName,
                testData.commentaries.generated);
            Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine
                .should('contain', testData.forecastPSFnotIncluded);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'))
                .verifyFormCommentTextBoxText(testData.toeSectionName, testData.commentaries.generated);
            Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine
                .should('contain', testData.forecastPerUnitNotIncluded);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));

            cy.stepInfo(`8. Verify if “Include Expense on Pro Forma” is unselected -> this  expense category 
            is NOT displayed in the Pro Forma page> Operating Expenses section and is NOT displayed 
            in the Expense Forecast page>Total operating expenses card and generated comment 
            (Per Unit measure + Full Appraiser's forecasts)`);
            testData.expenseForecastFixtureArray("unit").forEach(element => {
                Income._ExpenseForecastActions.chooseForecastItemBasis(element);
            });
            _NavigationSection.navigateToProForma();
            testData.expensesInProFormaByDefaultArray.forEach(element => {
                Income._ProFormaActions.Page.categoryCellTotal(element).should('not.exist');
            });
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.verifyFormCommentTextBoxText(testData.toeSectionName,
                testData.commentaries.generated);
            Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine
                .should('contain', testData.forecastPSFnotIncluded);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'))
                .verifyFormCommentTextBoxText(testData.toeSectionName,
                    testData.commentaries.generated);
            Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine
                .should('contain', testData.forecastPerUnitNotIncluded);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));
        });
    });