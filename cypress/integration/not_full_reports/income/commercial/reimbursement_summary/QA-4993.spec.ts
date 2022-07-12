
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { Property, Income } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/reimbursement_summary/QA-4993.fixture";

describe("Income > Commercial > Reimbursement Summary - Verify Gross and Annual values for added Utilities reimbursements",
    { tags: [ "@income", "@expense_forecast", "@reimbursement_summary" ] }, () => {

    before("Login, create report", () => {

        cy.stepInfo(`Preconditions: 1. Create a mixed-use or commercial-only report`);
        createReport(testData.reportCreationData);
       
        cy.stepInfo(`2. Select any option as basis for Square Foot Analysis and fill in Square 
                    Foot field with valid numeric value
                    3. Make sure at least one commercial unit is added on Property > Summary`);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterGrossBuildingArea(testData.grossBuildingArea)
            .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

        cy.stepInfo(`4. Go to Property>Commercial Units page and fill in all Commercial 
                    Unit SF with valid numeric values`);
        _NavigationSection.navigateToCommercialUnits();
        Property._CommercialUnits.enterListUnitSF(testData.commercialUnits.unitsSF, testData.commercialUnits.commercialUnitsNumber);

        cy.saveLocalStorage();
    });
    
    it(`[QA-4993] Verifying Combined Utilities expense reimbursements`, () => {

        cy.stepInfo(`Steps: 1. Go to Income > Expense History page and select Combined Electricity, Fuel, Water & Sewer radio button`);
        _NavigationSection.navigateToExpenseHistory();
        Income._ExpenseHistory.checkUtilitiesExpensesOption(testData.utilitiesExpenseOption);

        cy.stepInfo(`2. Go to Income > Expense Forecast page and check “Include Expense 
                    on Pro Forma” checkbox for all Expense Forecasts.`);
        _NavigationSection.navigateToExpenseForecast();
        Income._ExpenseForecastActions.setIncludeInProformaCheckbox(testData.expenseForecastUtilitiesFixture.cardName, true)
                .enterForecastItemForecast(testData.expenseForecastUtilitiesFixture);

        cy.stepInfo(`3. Go to Income > Commercial > Reimbursement Summary`);
        _NavigationSection.navigateToCommercialReimbursementSummary();

        cy.stepInfo(`4. Add Utilities reimbursement`);
        Income._CommercialManager.ReimbursementSummary
            .addNewCommercialReimbursement(
                testData.expenseForecastUtilitiesFixture.expenseUIName, 
                testData.expenseForecastUtilitiesFixture.name, 
                testData.reimbursementType, 
                testData.knownInformation, 
                false)
            .fillReimbursements(testData.percentOfTotal, testData.reimbursementColumnId, 0)
            .verifyDefaultReimbursementCommentaryByExpenseType(
                testData.expenseForecastUtilitiesFixture.expenseUIName, 0);
        

        // cy.stepInfo(`6. Verify that a generated commentary appears in the same fashion as existing utilities reimbursements`);
        // Income._CommercialManager.ReimbursementSummary
        //     .verifyAppraiserForecastGrossByExpenseType(
        //         expense.expenseForecast.expenseUIName, 
        //         testData.grossBuildingArea * expense.expenseForecast.forecast, 
        //         testData.commercialUnits.commercialUnitsNumber);

        // cy.stepInfo(`7. Verify for ${expense.expenseForecast.expenseUIName} Annual Reimbursement is 
        //             calculated as  *Appraiser's Forecast (Gross) * % of Total*`);
        // Income._CommercialManager.ReimbursementSummary
        //     .verifyAnnualReimbursementByExpenseType(
        //         expense.expenseForecast.expenseUIName, 
        //         testData.reimbursementType,
        //         testData.knownInformation,
        //         testData.reimbursementColumnId,
        //         testData.commercialUnits.commercialUnitsNumber,
        //         index);
    });
    
    // after('Delete report', () => {
    //     cy.restoreLocalStorage();
    //     deleteReport(testData.reportCreationData.reportNumber);
    // });
});
