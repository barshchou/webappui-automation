import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5761-62.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income, DataCollections } from "../../../../actions";

describe(`[QA-5761] [QA-5762] Appraiser's Forecast value for General & Administrative 
is correctly converted to Per SF/Unit value`,
{ tags: [ "@income", "@expense_forecast" ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        cy.saveLocalStorage();
    });
        
    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it(`[QA-5761] Per Unit Appraiser's Forecast value for General & Administrative 
    is correctly converted to Per SF value`, () => {
        cy.stepInfo(`Precondition: Go to Property > Summary, add residential units and gross building area`);
        _NavigationSection.navigateToSubjectPropertyData();
        DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits)
            .enterGrossBuildingArea(testData.buildingDescription.grossArea);

        cy.stepInfo(`1. Go to Expense Forecast and make sure that Per Unit radio button 
        is selected for General & Administrative card`);
        _NavigationSection.navigateToExpenseForecast();
        Income._ExpenseForecastActions
            .chooseForecastItemBasis(testData.expenseForecastGeneralAdministrativeFixture('unit'))
            .verifyForecastItemBasis(testData.expenseForecastGeneralAdministrativeFixture('unit'));

        cy.stepInfo(`2. Fill in Appraiser's Forecast field for  General & Administrative card`);
        Income._ExpenseForecastActions
            .enterForecastItemForecast(testData.expenseForecastGeneralAdministrativeFixture('unit'));

        cy.stepInfo(`3. Verify that Per SF value below this field is calculated as: 
        Per Unit Appraiser's Forecast * # of Residential Units / selected Basis for Square Foot Analysis`);
        Income._ExpenseForecastActions.verifyForecastItemBasisMoney(
            testData.expenseForecastGeneralAdministrativeFixture('unit'), testData.buildingDescription);
    });

    it(`[QA-5762] Per SF Appraiser's Forecast value for General & Administrative 
    is correctly converted to Per Unit value`, () => {
        cy.stepInfo(`1. Go to Expense Forecast and make sure that Per SF radio button 
        is selected for General & Administrative card`);
        _NavigationSection.navigateToExpenseForecast();
        Income._ExpenseForecastActions
            .chooseForecastItemBasis(testData.expenseForecastGeneralAdministrativeFixture('sf'))
            .verifyForecastItemBasis(testData.expenseForecastGeneralAdministrativeFixture('sf'));

        cy.stepInfo(`2. Fill in Appraiser's Forecast field for General & Administrative card`);
        Income._ExpenseForecastActions
            .enterForecastItemForecast(testData.expenseForecastGeneralAdministrativeFixture('sf'));

        cy.stepInfo(`3. Verify that Per Unit value below this field is calculated as: 
                        PSF Appraiser's Forecast * selected Basis for Square Foot Analysis / # of Residential Units`);
        Income._ExpenseForecastActions.verifyForecastItemBasisMoney(
            testData.expenseForecastGeneralAdministrativeFixture('sf'), testData.buildingDescription);
    });
});