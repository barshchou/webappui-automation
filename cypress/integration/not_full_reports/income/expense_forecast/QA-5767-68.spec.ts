import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5767-68.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";
import { Income } from "../../../../actions";

describe("[QA-5767] [QA-5768] Appraiser's Forecast value for Management Fees is correctly converted to Per SF/Unit value",
    { tags: [ "@income", "@expense_forecast" ] }, () => {

        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            cy.saveLocalStorage();
        });

        beforeEach(() => {
            cy.restoreLocalStorage();
        });

        it("[QA-5767] Per Unit Appraiser's Forecast value for Management Fees is correctly converted to Per SF value", () => {

            cy.stepInfo("Precondition: Go to Property > Summary, add residential units and gross building area");
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits)
                .enterGrossBuildingArea(testData.buildingDescription.grossArea);

            cy.stepInfo("1. Go to Expense Forecast and make sure that Per Unit radiobutton is selected for Management Fees card");
            _NavigationSection.Actions.navigateToExpenseForecast();
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastManagementFixture('unit'))
                .verifyForecastItemBasis(testData.expenseForecastManagementFixture('unit'));

            cy.stepInfo("2. Fill in Appraiser's Forecast field for Management Fees card");
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastManagementFixture('unit'));

            cy.stepInfo(`3. Verify that Per SF value below this field is calculated as: 
                         Per Unit Appraiser’s Forecast * # of Resi Units / selected Basis for Square Foot Analysis`);
            Income._ExpenseForecastActions.verifyForecastItemBasisMoney(
                testData.expenseForecastManagementFixture('unit'), testData.buildingDescription);
        });

        it("[QA-5768] Per SF Appraiser's Forecast value for Management Fees is correctly converted to Per Unit value", () => {

            cy.stepInfo("1. Go to Expense Forecast and make sure that Per SF radiobutton is selected for Management Fees card");
            _NavigationSection.Actions.navigateToExpenseForecast();
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastManagementFixture('sf'))
                .verifyForecastItemBasis(testData.expenseForecastManagementFixture('sf'));

            cy.stepInfo("2. Fill in Appraiser's Forecast field for Management Fees card");
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastManagementFixture('sf'));

            cy.stepInfo(`3. Verify that Per Unit value below this field is calculated as: 
                         PSF Appraiser’s Forecast * selected Basis for Square Foot Analysis / # of Resi Units`);
            Income._ExpenseForecastActions.verifyForecastItemBasisMoney(
                testData.expenseForecastManagementFixture('sf'), testData.buildingDescription);

            deleteReport(testData.reportCreationData.reportNumber);
        });
    });