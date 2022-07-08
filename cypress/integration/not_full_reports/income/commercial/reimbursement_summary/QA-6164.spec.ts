
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { Property, Income } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/reimbursement_summary/QA-6164.fixture";

describe("",
    { tags: [ "@income", "@expense_forecast", "@reimbursement_summary" ] }, () => {

    before("Login, create report", () => {

        cy.stepInfo(`Preconditions: 1. Create a mixed-use or commercial-only report`);
        createReport(testData.reportCreationData);
       
        cy.stepInfo(`2. Select any option as basis for Square Foot Analysis and fill in Square 
                    Foot field with valid numeric value
                    3. Make sure at least one commercial unit is added on Property > Summary`);
        Property._Summary.enterGrossBuildingArea(testData.grossBuildingArea)
            .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

        cy.stepInfo(`4. Go to Property>Commercial Units page and fill in all Commercial 
                    Unit SF with valid numeric values`);
        Property._CommercialUnits.enterListUnitSF(testData.commercialUnits.unitsSF, testData.commercialUnits.commercialUnitsNumber);

        cy.stepInfo(`Steps: 1. Go to Income > Expense Forecast page and check “Include Expense 
                    on Pro Forma” checkbox for all Expense Forecasts.
                    2. Select Per SF radio button for General & Administrative Expense Forecast 
                    and fill in Appraiser’s Forecast with valid numeric value`);
        _NavigationSection.navigateToExpenseForecast();
        testData.expensesForecast.forEach((expense) => {
            Income._ExpenseForecastActions.setIncludeInProformaCheckbox(expense.expenseForecast.cardName, true)
                .enterForecastItemForecast(expense.expenseForecast);
        });

        cy.stepInfo(`3. Go to Income > Commercial > Reimbursement Summary`);
        _NavigationSection.navigateToCommercialReimbursementSummary();
        
    });
    
    testData.expensesForecast.forEach(expense => {
        it(`[${expense.testCaseId}] Verify ${expense.expenseForecast.expenseUIName} Appraiser's Forecast (GROSS) 
            for each Commercial Unit is calculated as: 
            Expense Forecast Per SF * [Selected Basis for Square Foot Analysis]*`, () => {

            cy.stepInfo(`4. Click on Add Reimbursement and select expense in dropdown`);
            Income._CommercialManager.ReimbursementSummary.addNewCommercialReimbursement(
                expense.expenseForecast.expenseUIName, expense.expenseForecast.name, testData.reimbursementType);
        });
    });
    
    after('Delete report', () => {
        deleteReport(testData.reportCreationData.reportNumber);
    });
});
