import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4995.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Property, Income } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";

describe("[QA-4995] Verify that combined utilities expenses is enabled on the Pro Forma page",
    { tags:[ "@income", "@pro_forma" ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);

        cy.stepInfo(`1. Pre-condition: Residential Units should be filled in on Property > Summary form`);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits)
            .enterGrossBuildingArea(testData.buildingDescription.grossArea);

        cy.stepInfo(`2. Expenses for Fuel, Electricity and Water&Sewer are added`);
        _NavigationSection.navigateToExpenseForecast();
        testData.forecastItems.forEach(expense => {
            Income._ExpenseForecastActions.enterForecastItemForecast(expense);    
        });

        cy.stepInfo(`2. Go to Income > Expense History`);
        _NavigationSection.Actions.navigateToExpenseHistory();

        cy.stepInfo(`3. Add expense years with combined utility expenses.`);
        Income._ExpenseHistory.Actions.selectExpensePeriod(testData.periods.expensePeriodType)
            .enterExpenseYear(testData.periods.year)
            .clickAddExpenseYearButton();

        cy.saveLocalStorage();
    });

    beforeEach("Change Utility Expenses combinations", () => {
        cy.restoreLocalStorage();

        cy.stepInfo("Go to Income > Expense History");
        _NavigationSection.Actions.navigateToExpenseHistory();
    });
    
    it("Broken Out", () => {
        Income._ExpenseHistory.checkUtilitiesExpensesOption(testData.expenseModeBrokenOut);
        
        _NavigationSection.navigateToProForma();
        Income._ProFormaActions.verifyExpensesCombined(testData.expenseModeBrokenOut);
                    
    });

    it("Combined Electricity and Fuel", () => {
        Income._ExpenseHistory.checkUtilitiesExpensesOption(testData.expenseModeElectricityFuel);

        _NavigationSection.navigateToProForma();
        Income._ProFormaActions.verifyExpensesCombined(testData.expenseModeElectricityFuel);
    });

    it("Combined Electricity, Fuel and Water&Sewer", () => {
        Income._ExpenseHistory.checkUtilitiesExpensesOption(testData.expenseModeElectricityFuelWater);

        _NavigationSection.navigateToProForma();
        Income._ProFormaActions.verifyExpensesCombined(testData.expenseModeElectricityFuelWater);
                    
        deleteReport(testData.reportCreationData.reportNumber);
    });
});