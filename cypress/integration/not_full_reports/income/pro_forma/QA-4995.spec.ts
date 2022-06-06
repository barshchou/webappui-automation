import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4995.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Property, Income } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import tableExpenseHistoryCellNames from "../../../../enums/expenseHistoryTableRows.enum";

describe("[QA-4995] Verify that combined utilities expenses is enabled on the Pro Forma page",
    { tags:[ "@income", "@pro_forma" ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);

        cy.stepInfo(`1. Pre-condition: Residential Units should be filled in on Property > Summary form`);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits)
            .enterGrossBuildingArea(testData.buildingDescription.grossArea);

        cy.stepInfo(`2. Go to Income > Expense History`);
        _NavigationSection.Actions.navigateToExpenseHistory();

        cy.stepInfo(`3. Add expense years with combined utility expenses.`);
        Income._ExpenseHistory.Actions.selectExpensePeriod(testData.periods.expensePeriodType)
            .enterExpenseYear(testData.periods.year)
            .clickAddExpenseYearButton();

        cy.saveLocalStorage();
        });

    beforeEach("Change Utility Expenses combinations", () => {
        cy.stepInfo("Go to Income > Expense History");
        _NavigationSection.Actions.navigateToExpenseHistory();
        cy.restoreLocalStorage();
    });
    
    it("Broken Out", () => {
        Income._ExpenseHistory.Actions.clickUtilitiesExpensesMode(testData.expenseModeBrokenOut);
        
        _NavigationSection.navigateToProForma();
        Income._ProFormaActions.verifyCombined();
                    
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Broken Out", () => {
        Income._ExpenseHistory.Actions.clickUtilitiesExpensesMode(testData.expenseModeElectricityFuel);

        _NavigationSection.navigateToProForma();
        Income._ProFormaActions.verifyCombined();
                    
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Broken Out", () => {
        Income._ExpenseHistory.Actions.clickUtilitiesExpensesMode(testData.expenseModeElectricityFuelWater);

        _NavigationSection.navigateToProForma();
        Income._ProFormaActions.verifyCombined();
                    
        deleteReport(testData.reportCreationData.reportNumber);
    });
});