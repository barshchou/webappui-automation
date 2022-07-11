import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5049.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income, Property } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import expensesCardsNames from " ../../../cypress/enums/expense/expenseForecast.enum";

describe(`[QA-5012] [Income>Expense forecast] Unselected existing expense card is not included in calculation`,
    { tags: [ "@income", "@expense_forecast" ] }, () => {

        before("Login, create report", () => {
          //  Cypress.config('numTestsKeptInMemory', 0);
            createReport(testData.reportCreationData);
            cy.saveLocalStorage();
        });

        beforeEach(() => {
            cy.restoreLocalStorage();
        });

        it("Preconditions", () => {

            cy.stepInfo(`1. Go to Property > Summary and add residential units`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterGrossBuildingArea(testData.buildingDescription.grossArea);
        });

        it(`[QA-5049] "Per Unit" value is calculated correct if "Per SF" radiobutton is selected`, () => {
            cy.stepInfo(`2. Go to Expense Forecast and add new Expense Forecast with valid name`);
                _NavigationSection.navigateToExpenseForecast();
                Income._ExpenseForecastActions.addCustomExpenseCategory(testData.expenseForecastCustomFixture("unit").name);

                cy.stepInfo(`3. Make sure that Per SF radiobutton is selected for Custom Expense card`);
                Income._ExpenseForecastActions.Page.getForecastItemCheckedBasisRadio(true, 0).invoke("attr", "value").then(value => {
                    expect(value).to.be.equal('sf');
                 });

                 cy.stepInfo(`4. Fill in Appraiser's Forecast field for Custom Expense card`);
                Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastCustomFixture, true)
                
     //               Income._ExpenseForecastActions.chooseForecastItemBasis(element);
                
        
        });

        it(`Verify If “Include Expense on Pro Forma” checkbox is unselected but there is 
                data left in the forecast, this data is not included in calculations on Pro forma and Expense forecast page 
                (Per Unit measure + Full Appraiser's forecasts)`, () => {

            //               Income._ExpenseForecastActions.chooseForecastItemBasis(element);
           
        });

        it(`Verify If “Include Expense on Pro Forma”  checkbox is unselected but there is 
                data left in the forecast, this data is not included in calculations on Pro forma and Expense forecast page 
                (Per Room measure for Fuel + Full Appraiser's forecasts)`, () => {

         //               Income._ExpenseForecastActions.chooseForecastItemBasis(element);

           // deleteReport(testData.reportCreationData.reportNumber);
        });
    });