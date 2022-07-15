import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5759-60.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";
import { Income } from "../../../../actions";

describe(" [QA-5759] [QA-5760] Appraiser's Forecast value for Payroll&Benefits  is correctly converted to Per SF/Unit value",
    { tags: [ "@income", "@expense_forecast" ] }, () => {

        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            cy.saveLocalStorage();
        });
        beforeEach(() => {
            cy.restoreLocalStorage();
        });

        it("[QA-5759] Per SF Appraiser's Forecast value for Payroll&Benefits is correctly converted to Per Unit value", () => {

            cy.stepInfo("Precondition: Go to Property > Summary, add residential units and gross building area");
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits)
                .enterGrossBuildingArea(testData.buildingDescription.grossArea);

            cy.stepInfo("1. Go to Expense Forecast and make sure that Per SF radiobutton is selected for Payroll&Benefits card");
            _NavigationSection.Actions.navigateToExpenseForecast();
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastPayrollBenefitsFixture('sf'))
                .verifyForecastItemBasis(testData.expenseForecastPayrollBenefitsFixture('sf'));

            cy.stepInfo("2. Fill in Appraiser's Forecast field for Payroll&Benefits card");
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastPayrollBenefitsFixture('sf'));

            cy.stepInfo(`3. Verify that Per Unit value below this field is calculated as: 
                     PSF Appraiser’s Forecast * selected Basis for Square Foot Analysis/ # of Resi Units`);
            Income._ExpenseForecastActions.verifyForecastItemBasisMoney(testData.expenseForecastPayrollBenefitsFixture('sf'), testData.buildingDescription);
        });

        it("[QA-5760] Per Unit Appraiser's Forecast value for Payroll&Benefits is correctly converted to Per SF value", () => {

            cy.stepInfo("1. Go to Expense Forecast and make sure that Per Unit radiobutton is selected for Payroll&Benefits card");
            _NavigationSection.Actions.navigateToExpenseForecast();
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastPayrollBenefitsFixture('unit'))
                .verifyForecastItemBasis(testData.expenseForecastPayrollBenefitsFixture('unit'));

            cy.stepInfo("2. Fill in Appraiser's Forecast field for Paroll&Benefits card");
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastPayrollBenefitsFixture('unit'));

            cy.stepInfo("3. Verify that Per Unit value below this field is calculated as: PSF Appraiser’s Forecast * GBA / # of Resi Units");
            Income._ExpenseForecastActions.verifyForecastItemBasisMoney(testData.expenseForecastPayrollBenefitsFixture('unit'), testData.buildingDescription);

            deleteReport(testData.reportCreationData.reportNumber);
        });
    });