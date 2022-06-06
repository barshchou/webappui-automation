import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4995.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Property, Income } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import tableExpenseHistoryCellNames from "../../../../enums/expenseHistoryTableRows.enum";

describe("[QA-4995] Verify that combined utilities expenses is enabled on the Pro Forma page",
    { tags:[ "@income", "@pro_forma" ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        });

        
    });

    it("Test body", () => {

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

        cy.stepInfo("4. Proceed to the Income > Pro Forma page.");
        _NavigationSection.navigateToProForma();

        cy.stepInfo(`4.1 Check historical expenses values for Insurance card. They should be calculated 
                    for each expense type as: [Expense Period type]Insurance / GBA`);
        Income._ExpenseForecastActions.Actions.verifyForecastItemByExpensePeriodType(testData.actualInsuranceItem, testData.buildingDescription, "Actual")
            .verifyForecastItemByExpensePeriodType(testData.t12InsuranceItem, testData.buildingDescription, "Actual T12")
            .verifyForecastItemByExpensePeriodType(testData.historicalInsuranceItem, testData.buildingDescription, "Annualized Historical")
            .verifyForecastItemByExpensePeriodType(testData.ownerProjectionInsuranceItem, testData.buildingDescription, "Owner's Projection")
            .hideExpenseForecastHeader()
            .clickSaveButton();

        cy.stepInfo("4.2 Check historical expenses values for Insurance card. They should be correctly displayed on slidebars");

        Income._ExpenseForecastActions.Actions.matchElementSnapshot(
            Income._ExpenseForecastActions.Page.forecastItemCard(
                Income._ExpenseForecastActions.getItemNameForAverage(
                    testData.actualInsuranceItem.name)), testData.insurancePerSfCardSnapshotName, { padding: [ 10, 100 ] });
                    
        deleteReport(testData.reportCreationData.reportNumber);
    });
});