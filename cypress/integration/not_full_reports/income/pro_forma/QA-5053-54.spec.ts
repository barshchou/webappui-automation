import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-5053-54.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Income } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import enums from "../../../../enums/enums";

describe("Pro Forma -> Expenses", 
    { tags:[ "@income", "@pro_forma" ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);

        cy.stepInfo("1: Prepare report data: Navigate to Expense Forecast and add custom category and expenses forecast to the report");
        _NavigationSection.navigateToExpenseForecast();
        Income._ExpenseForecastActions.addCustomExpenseCategory(testData.customCategoryFirstCapital.name);
        Income._ExpenseForecastActions.addCustomExpenseCategory(testData.customCategoryAllCapitals.name);
        Income._ExpenseForecastActions.addCustomExpenseCategory(testData.customCategoryMix.name);
        testData.expensesItems.forEach(foreCastItem => {
            Income._ExpenseForecastActions.enterForecastItemForecast(foreCastItem);
        });
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.customCategoryFirstCapital, true);

        cy.saveLocalStorage();
    });

    beforeEach("Save local storage", () => {
        cy.restoreLocalStorage();
        _NavigationSection.navigateToProForma();
    });

    it("[QA-5054] Appraiser's Forecast of Custom Expense Forecast is included in calculation", () => {
        cy.stepInfo("2. On Pro Forma page validate Custom Expense Forecast is included in calculation");
        Income._ProFormaActions.verifyCategoryTotal(testData.customTotal, testData.customCategoryFirstCapital.name)
            .verifyCategoryTotal(testData.reserverstotal, enums.PRO_FORMA_TYPES.replacementsAndReserves)
            .verifyCategoryTotal(testData.waterAndSewerTotal, enums.PRO_FORMA_TYPES.waterAndSewer)
            .verifyCategoryTotal(testData.fuelTotal, enums.PRO_FORMA_TYPES.fuel)
            .verifyCategoryTotal(testData.totalToe, enums.PRO_FORMA_TYPES.totalOperatingExpenses)
            .verifyCategoryTotal(testData.totalToeNetRe, enums.PRO_FORMA_TYPES.totalOperatingExpensesExTaxes)
            .verifyCategoryTotal(testData.netOperationIncome, enums.PRO_FORMA_TYPES.netOperatingIncome);
    });

    it("[QA-5053] Custom Expense Forecast is displayed in Operating Expenses grid on Pro Forma", () => {
        cy.stepInfo(`2. On Pro Forma page verify  there is validation for each custom expense 
                    forecast to capitalize the first letter of each word`);
        Income._ProFormaActions.verifyCustomCategoryName(testData.customCategoryFirstCapital.name);
        Income._ProFormaActions.verifyCustomCategoryName(testData.customCategoryAllCapitals.name);
        Income._ProFormaActions.verifyCustomCategoryName(testData.customCategoryMix.name);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});