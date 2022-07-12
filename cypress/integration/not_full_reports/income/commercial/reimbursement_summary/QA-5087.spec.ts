import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { Property, Income, ReviewExport } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/reimbursement_summary/QA-5087.fixture";

describe(`Verify exported report: Change export schemas and templates to enable combined utilities expenses`,
    { tags: [ "@income", "@expense_forecast", "@reimbursement_summary" ] }, () => {

    it(`[QA-4993] User changes to Broken Out utilities -> verify expense reimbursements non existence`, () => {
        cy.stepInfo(`Preconditions: 1. Create a mixed-use report and add commercial units`);
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterGrossBuildingArea(testData.grossBuildingArea)
            .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        _NavigationSection.navigateToCommercialUnits();
        Property._CommercialUnits.enterListUnitSF(testData.commercialUnits.unitsSF, testData.commercialUnits.commercialUnitsNumber);

        cy.stepInfo(`Steps: 1. Go to Income > Expense History page and select Combined Electricity, Fuel, Water & Sewer radio button`);
        _NavigationSection.navigateToExpenseHistory();
        Income._ExpenseHistory.checkUtilitiesExpensesOption(testData.utilitiesCombinedExpenseOption);

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
            .fillVCLossByRow(testData.vcLossPercent);

        cy.stepInfo('5. Add Vacancy Collection Loss percent');
        _NavigationSection.navigateToPotentialGrossIncome();
        Income._PotentialGrossIncome.enterCommercialVCLossPercentage(testData.vcLossPercent, testData.useValue);

        cy.stepInfo('5. Export the report');
        _NavigationSection.Actions.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);

        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Check export", () => {
        Cypress.config().baseUrl = null;
        cy.task("getFilePath",
        { _reportName: testData.reportCreationData.reportNumber, _docx_html: "html" }
        ).then(file => {
            cy.log(<string>file);
            cy.visit(<string>file);

            cy.stepInfo('Verify combined Utilities expense is mentioned in exported report');
            cy.contains('Commercial Expense Reimbursement').next().should('have.text', testData.expenseForecastUtilitiesFixture.expenseUIName + " (% of Appraiser Forecast)");
            cy.xpath("//h4[.='Potential Gross Commercial Rent']//following-sibling::table[1]//p[.='Commercial Expense Reimbursement']").should('exist');
            cy.xpath("//h3[.='Commercial Vacancy & Collection Loss']//following-sibling::table[1]//p[.='Potential Utilities Reimbursement']").should('exist');
            cy.xpath("//h3[.='Commercial Vacancy & Collection Loss']//following-sibling::p[3]").should('contain.text', 'utilities');
            cy.xpath("//h2[.='Stabilized Income & Expenses ']//following-sibling::table[1]//p[.='Potential Utilities Reimbursement']").should('exist');
        });
    });
});
