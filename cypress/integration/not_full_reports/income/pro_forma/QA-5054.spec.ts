import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-5054.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Income } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import enums from "../../../../enums/enums";
import { Tag } from "../../../../utils/tags.utils";


describe("[QA-5054] Appraiser's Forecast of Custom Expense Forecast is included in calculation", 
{ tags: [ Tag.fix ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {

        cy.stepInfo("1: Prepare report data: Navigate to Expense Forecast and add custom category and expenses forecast to the report");
        _NavigationSection.navigateToExpenseForecast();
        Income._ExpenseForecastActions.addCustomExpenseCategory(testData.customCategory.name);
        testData.expensesItems.forEach(foreCastItem => {
            Income._ExpenseForecastActions.enterForecastItemForecast(foreCastItem);
        });
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.customCategory, true);
        
        cy.stepInfo("2. Navigate to Proform page and validate Custom Expense Forecast is included in calculation");
        _NavigationSection.navigateToProForma();
        Income._ProFormaActions.verifyCategoryTotal(testData.customTotal, testData.customCategory.name)
            .verifyCategoryTotal(testData.reserverstotal, enums.PRO_FORMA_TYPES.replacementsAndReserves)
            .verifyCategoryTotal(testData.waterAndSewerTotal, enums.PRO_FORMA_TYPES.waterAndSewer)
            .verifyCategoryTotal(testData.fuelTotal, enums.PRO_FORMA_TYPES.fuel)
            .verifyCategoryTotal(testData.totalToe, enums.PRO_FORMA_TYPES.totalOperatingExpenses)
            .verifyCategoryTotal(testData.totalToeNetRe, enums.PRO_FORMA_TYPES.totalOperatingExpensesExTaxes)
            .verifyCategoryTotal(testData.netOperationIncome, enums.PRO_FORMA_TYPES.netOperatingIncome);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});