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

    it("[QA-5759]", () => {

        cy.stepInfo("1. Go to Property > Summary, add residential units and gross building area");
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits)
        .enterGrossBuildingArea(testData.buildingDescription.grossArea);

        cy.stepInfo("1. Go to Expense Forecast and make sure that Per SF radiobutton is selected for Payroll&Benefits card");
        _NavigationSection.Actions.navigateToExpenseForecast();
        testData.basis = "sf";
        Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastPayrollBenefitsFixture)
            .verifyForecastItemBasis(testData.expenseForecastPayrollBenefitsFixture);
    
        cy.stepInfo("2. Fill in Appraiser's Forecast field for Payroll&Benefits card");
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastPayrollBenefitsFixture);

        cy.stepInfo("3. Verify that Per Unit value below this field is calculated as: PSF Appraiser’s Forecast * selected Basis for Square Foot Analysis/ # of Resi Units");
        Income._ExpenseForecastActions.verifyForecastItemBasisMoney(testData.expenseForecastPayrollBenefitsFixture, testData.buildingDescription);
    });

    it("[QA-4813]", () => {
        
        cy.stepInfo("1. Go to Expense Forecast and make sure that Per Unit radiobutton is selected for Water & Sewer card");
        _NavigationSection.Actions.navigateToExpenseForecast();
        testData.basis = "unit";
        Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastPayrollBenefitsFixture)
            .verifyForecastItemBasis(testData.expenseForecastPayrollBenefitsFixture);
    
        cy.stepInfo("2. Fill in Appraiser's Forecast field for Water & Sewer card");
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastPayrollBenefitsFixture);

        cy.stepInfo("3. Verify that Per Unit value below this field is calculated as: PSF Appraiser’s Forecast * GBA / # of Resi Units");
        Income._ExpenseForecastActions.verifyForecastItemBasisMoney(testData.expenseForecastPayrollBenefitsFixture, testData.buildingDescription);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});