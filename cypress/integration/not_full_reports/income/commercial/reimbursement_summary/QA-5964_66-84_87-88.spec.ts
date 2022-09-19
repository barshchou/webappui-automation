import { createReport } from "../../../../../actions/base/baseTest.actions";
import { Property, Income, DataCollections } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import testData from 
    "../../../../../fixtures/not_full_reports/income/commercial/reimbursement_summary/QA-5964_66-84_87-88.fixture";

describe("Income > Commercial > Reimbursement Summary - Verify Gross and Annual values for added reimbursements",
    { tags: [ "@income", "@commercial", "@reimbursement_summary" ] }, () => {
        
        before("Login, create report", () => {

            cy.stepInfo(`Preconditions: 1. Create a mixed-use or commercial-only report`);
            createReport(testData.reportCreationData);
       
            cy.stepInfo(`2. Select any option as basis for Square Foot Analysis and fill in Square 
                    Foot field with valid numeric value
                    3. Make sure at least one commercial unit is added on Property > Summary`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.grossBuildingArea)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

            cy.stepInfo(`4. Go to Property>Commercial Units page and fill in all Commercial 
                    Unit SF with valid numeric values`);
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits
                .enterListUnitSF(testData.commercialUnits.unitsSF, testData.commercialUnits.commercialUnitsNumber);

            cy.stepInfo(`Steps: 1. Go to Income > Expense Forecast page and check “Include Expense 
                    on Pro Forma” checkbox for all Expense Forecasts.
                    2. Select Per SF radio button for General & Administrative Expense Forecast 
                    and fill in Appraiser's Forecast with valid numeric value`);
            _NavigationSection.navigateToExpenseForecast();
            testData.expensesForecast.forEach((expense) => {
                Income._ExpenseForecastActions.setIncludeInProformaCheckbox(expense.expenseForecast.cardName, true)
                    .enterForecastItemForecast(expense.expenseForecast);
            });

            cy.stepInfo(`3. Go to Income > Commercial > Reimbursement Summary`);
            _NavigationSection.navigateToCommercialReimbursementSummary();

            cy.saveLocalStorage();
        });

        beforeEach('Restore local storage', () => {
            cy.restoreLocalStorage();
        });
    
        testData.expensesForecast.forEach((expense, index) => {
            it(`[${expense.testCaseIds}] Verifying 
            ${expense.expenseForecast.expenseUIName} Appraiser's Forecast (GROSS) and Annual Reimbursement`, () => {
                cy.stepInfo(`4. Click on Add Reimbursement and select expense in dropdown
                            5. Select  % of Appraiser Forecast radio button for Reimbursement Type 
                            (it doesn't matter if Admin Fee is selected or not) and click on Add button`);
                Income._CommercialManager.ReimbursementSummary
                    .addNewCommercialReimbursement(
                        expense.expenseForecast.expenseUIName, 
                        expense.expenseForecast.name, 
                        testData.reimbursementType, 
                        testData.knownInformation, 
                        false)
                    .fillReimbursements(testData.percentOfTotal, testData.reimbursementColumnId, index);

                cy.stepInfo(`6. Verify ${expense.expenseForecast.expenseUIName} Appraiser's Forecast (GROSS) 
                        for each Commercial Unit is calculated as: 
                        Expense Forecast Per SF * [Selected Basis for Square Foot Analysis]*`);
                Income._CommercialManager.ReimbursementSummary
                    .verifyAppraiserForecastGrossByExpenseType(
                        expense.expenseForecast.expenseUIName, 
                        testData.grossBuildingArea * expense.expenseForecast.forecast, 
                        testData.commercialUnits.commercialUnitsNumber);

                cy.stepInfo(`7. Verify for ${expense.expenseForecast.expenseUIName} Annual Reimbursement is 
                        calculated as  *Appraiser's Forecast (Gross) * % of Total*`);
                Income._CommercialManager.ReimbursementSummary
                    .verifyAnnualReimbursementByExpenseType(
                        expense.expenseForecast.expenseUIName, 
                        testData.reimbursementType,
                        testData.knownInformation,
                        testData.reimbursementColumnId,
                        testData.commercialUnits.commercialUnitsNumber,
                        index);
            });
        });
    });
