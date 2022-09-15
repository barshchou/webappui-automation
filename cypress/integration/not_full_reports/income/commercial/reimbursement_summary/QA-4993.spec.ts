import { createReport } from "../../../../../actions/base/baseTest.actions";
import { Property, Income, DataCollections } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/reimbursement_summary/QA-4993.fixture";

describe(`Verify that the user can reimburse based on a Utilities expense and the reimbursement 
        settings structure mirrors that of existing utilities expenses`,
{ tags: [ "@income", "@expense_forecast", "@reimbursement_summary" ] }, () => {

    beforeEach('Create and setup report', () => {
        cy.stepInfo(`Preconditions: 1. Create a mixed-use report and add commercial units`);
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToSubjectPropertyData();
        DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.grossBuildingArea)
            .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        _NavigationSection.navigateToCommercialUnits();
        Property._CommercialUnits.enterListUnitSF(testData.commercialUnits.unitsSF, 
            testData.commercialUnits.commercialUnitsNumber);
    });
    
    it(`[QA-4993] User changes to Broken Out utilities -> verify expense reimbursements non existence`, () => {
        cy.stepInfo(`Steps: 1. Go to Income > Expense History page and 
        select Combined Electricity, Fuel, Water & Sewer radio button`);
        _NavigationSection.navigateToExpenseHistory();
        Income._ExpenseHistory.checkUtilitiesExpensesOption(testData.utilitiesCombinedExpenseOption);

        cy.stepInfo(`2. Go to Income > Expense Forecast page and check “Include Expense 
                    on Pro Forma” checkbox for all Expense Forecasts.`);
        _NavigationSection.navigateToExpenseForecast();
        Income._ExpenseForecastActions
            .setIncludeInProformaCheckbox(testData.expenseForecastUtilitiesFixture.cardName, true)
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
        
        cy.stepInfo(`5. Go to Income > Expense History page and select 'Broken out' radio button`);
        _NavigationSection.navigateToExpenseHistory();
        Income._ExpenseHistory.checkUtilitiesExpensesOption(testData.utilitiesBrokenOutExpenseOption);

        cy.stepInfo(`6. Go to Income > Commercial > Reimbursement Summary`);
        _NavigationSection.navigateToCommercialReimbursementSummary();
        Income._CommercialManager.ReimbursementSummary
            .verifyReimbursementItemExistence(testData.expenseForecastUtilitiesFixture.expenseUIName, false);

        _NavigationSection.navigateToProForma();
        Income._ProFormaActions.verifyExpensesCombined(testData.utilitiesBrokenOutExpenseOption);
    });

    it(`[QA-4993] User changes to Combined utilities -> verify expense reimbursements non existence`, () => {
        cy.stepInfo(`1. Go to Income > Expense Forecast page and check “Include Expense 
                    on Pro Forma” checkbox for all Expense Forecasts.`);
        _NavigationSection.navigateToExpenseForecast();
        testData.brokenOutExpensesFixture.forEach(expense => {
            Income._ExpenseForecastActions.setIncludeInProformaCheckbox(expense.expenseForecast.cardName, true)
                .enterForecastItemForecast(expense.expenseForecast);
        });

        cy.stepInfo(`2. Go to Income > Commercial > Reimbursement Summary`);
        _NavigationSection.navigateToCommercialReimbursementSummary();

        cy.stepInfo(`3. Add Utilities reimbursement`);
        testData.brokenOutExpensesFixture.forEach((expense, index) => {
            Income._CommercialManager.ReimbursementSummary
                .addNewCommercialReimbursement(
                    expense.expenseForecast.expenseUIName, 
                    expense.expenseForecast.name, 
                    testData.reimbursementType, 
                    testData.knownInformation, 
                    false)
                .fillReimbursements(testData.percentOfTotal, testData.reimbursementColumnId, index)
                .verifyDefaultReimbursementCommentaryByExpenseType(
                    expense.expenseForecast.expenseUIName, index);
        });
        
        cy.stepInfo(`4. Go to Income > Expense History page and select 'Broken out' radio button`);
        _NavigationSection.navigateToExpenseHistory();
        Income._ExpenseHistory.checkUtilitiesExpensesOption(testData.utilitiesCombinedExpenseOption);

        cy.stepInfo(`5. Go to Income > Commercial > Reimbursement Summary`);
        _NavigationSection.navigateToCommercialReimbursementSummary();
        testData.brokenOutExpensesFixture.forEach(expense => {
            Income._CommercialManager.ReimbursementSummary
                .verifyReimbursementItemExistence(expense.expenseForecast.expenseUIName, false);
        });

        _NavigationSection.navigateToProForma();
        Income._ProFormaActions.verifyExpensesCombined(testData.utilitiesCombinedExpenseOption);
    });
});
