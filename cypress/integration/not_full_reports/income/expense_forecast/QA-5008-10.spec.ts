import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5008-10.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe(`[QA-5008] [QA-5009] [QA-5010] [Income>Expense forecast] “Include Expense on Pro Forma” checkbox and tooltip functionality`,
    { tags: [ "@income", "@expense_forecast" ] }, () => {

        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            cy.saveLocalStorage();
        });

        beforeEach(() => {
            cy.restoreLocalStorage();
        });

        it("[QA-5008]", () => {
            cy.stepInfo(`1. Go to Income > Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`2. Verify  “Include Expense on Pro Forma”  checkbox is displayed under existing expense card`);
            testData.expensesForecastCardNamesArray.forEach(element => {
                Income._ExpenseForecastActions.verifyIncludeInProFormaCheckboxExists(element);
            });

            cy.stepInfo(`3. Verify  “Include Expense on Pro Forma” checkbox is NOT displayed under custom expense card`);
            Income._ExpenseForecastActions.addCustomExpenseCategory(testData.customCategory.name);
            Income._ExpenseForecastActions.Page.forecastItemCardFull(testData.customCategory.name).children()
                .contains("Include Expense on Pro Forma").should('not.exist');
        });

        it("[QA-5009]", () => {
            cy.stepInfo(`1. Verify “Include Expense on Pro Forma” checkbox is selected by default for each existing expense card`);
            testData.expensesForecastCardNamesArray.forEach(element => {
                Income._ExpenseForecastActions.verifyIncludeInProFormaCheckboxIsChecked(element);
            });
        });

        it("[QA-5010]", () => {
            cy.stepInfo(`1. Verify user hover on icon right to the "Include Expense on Pro Forma" checkbox - tooltip
                         with the following text "Unchecking this box will hide the expense from showing up on the Pro Forma." appears `);
            testData.expensesForecastCardNamesArray.forEach(element => {
                Income._ExpenseForecastActions.verifyProFormaTooltip(element);
            });

            deleteReport(testData.reportCreationData.reportNumber);
        });
    });