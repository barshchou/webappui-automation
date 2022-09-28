import testData from "../../../../fixtures/not_full_reports/income/expense_history/QA-6239_6388.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income, DataCollections } from "../../../../actions";
import Enums from "../../../../enums/enums";
import { toCamelCase, toLowerCaseFirstLetterInString } from "../../../../../utils/string.utils";

describe("Verify that the user can display historical expense values on a PSF basis on the Expense History page",
    { tags: [ "@income", "@expense_history", "@require_investigation" ] }, () => {
    
        beforeEach("Create report, enter gba value", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.gba);
        });

        it("[QA-6239_6388] Test body", () => {
            const perSFBasisText = toLowerCaseFirstLetterInString(Enums.EXPENSE_ITEM_BASIS_OF_COMPARISON.perSF);
            const customExpenseLocator = toCamelCase(testData.customCategory);
            const grossRevenuePSFValue = testData.grossRevenue / testData.gba;
            const electricityPSFValue = testData.electricityValue / testData.gba;
            const customExpensePSFValue = testData.customCategoryValue / testData.gba;

            cy.stepInfo("1. Navigate to expense history page");
            _NavigationSection.navigateToExpenseHistory();

            cy.stepInfo("2. Add expense year");
            Income._ExpenseHistory.selectExpensePeriod(testData.expensePeriodType)
                .enterExpenseYear(testData.expenseYear)
                .clickAddExpenseYearButton();

            cy.stepInfo("3. Prepare data, enter expenses and it's values, verify total values");
            Income._ExpenseHistory.addNewCategoryAndVerify(testData.customCategory, true)
                .enterIssueByColIndex(testData.electricityValue, Enums.EXPENSE_HISTORY_TABLE_ROWS.electricity)
                .enterIssueByColIndex(testData.grossRevenue, Enums.EXPENSE_HISTORY_TABLE_ROWS.grossRevenue)
                .enterIssueByColIndex(testData.customCategoryValue, customExpenseLocator)
                .verifyTotalOpExpensesByColIndex(0, customExpenseLocator)
                .verifyTOEExcludingRETByIndex(0)
                .verifyNetOpIncomeByIndex(testData.grossRevenue)
                .setCellValueToMap(Enums.EXPENSE_HISTORY_TABLE_ROWS.total)
                .setCellValueToMap(Enums.EXPENSE_HISTORY_TABLE_ROWS.totalExcludingTaxes)
                .setCellValueToMap(Enums.EXPENSE_HISTORY_TABLE_ROWS.noi);

            cy.stepInfo("3. Change basis of comparison to PSF, verify row names should include PSF");
            Income._ExpenseHistory.changeTableExpenseItemBasisOfComparison(Enums.EXPENSE_ITEM_BASIS_OF_COMPARISON.perSF)
                .Page.getExpenseRowByName(Enums.EXPENSE_HISTORY_TABLE_ROWS.grossRevenue)
                .should("contain.text", perSFBasisText);
            Income._ExpenseHistory.Page.getExpenseRowByName(Enums.EXPENSE_HISTORY_TABLE_ROWS.electricity)
                .should("contain.text", perSFBasisText);
            Income._ExpenseHistory.Page.getExpenseRowByName(customExpenseLocator)
                .should("contain.text", perSFBasisText);

            cy.stepInfo("4. Verify cells are readonly");
            Income._ExpenseHistory.verifyCellIsReadonly(Enums.EXPENSE_HISTORY_TABLE_ROWS.grossRevenue)
                .verifyCellIsReadonly(Enums.EXPENSE_HISTORY_TABLE_ROWS.electricity)
                .verifyCellIsReadonly(customExpenseLocator);

            cy.stepInfo("5. Verify expenses and total values are calculated correctly according to PSF basis");
            Income._ExpenseHistory
                .verifyIssueTextByColIndex(grossRevenuePSFValue, Enums.EXPENSE_HISTORY_TABLE_ROWS.grossRevenue)
                .verifyIssueTextByColIndex(electricityPSFValue, Enums.EXPENSE_HISTORY_TABLE_ROWS.electricity)
                .verifyIssueTextByColIndex(customExpensePSFValue, customExpenseLocator)
                .verifyTotalOpExpensesByColIndex(0, customExpenseLocator)
                .verifyTOEExcludingRETByIndex(0)
                .verifyNetOpIncomeByIndex(grossRevenuePSFValue);
            cy._mapGet(Enums.EXPENSE_HISTORY_TABLE_ROWS.total).then(total => {
                Income._ExpenseHistory.verifyIssueTextByColIndex(total, Enums.EXPENSE_HISTORY_TABLE_ROWS.total,
                    0, true);
            });
            cy._mapGet(Enums.EXPENSE_HISTORY_TABLE_ROWS.totalExcludingTaxes).then(totalExclTaxes => {
                Income._ExpenseHistory.verifyIssueTextByColIndex(totalExclTaxes,
                    Enums.EXPENSE_HISTORY_TABLE_ROWS.totalExcludingTaxes, 0, true);
            });
            cy._mapGet(Enums.EXPENSE_HISTORY_TABLE_ROWS.noi).then(noi => {
                Income._ExpenseHistory.verifyIssueTextByColIndex(noi, Enums.EXPENSE_HISTORY_TABLE_ROWS.noi, 0, true);
            });

            cy.stepInfo("6. Verify cells with empty GBA");
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterGrossBuildingArea(0);
            _NavigationSection.navigateToExpenseHistory();
            Income._ExpenseHistory
                .verifyIssueTextByColIndex("-", Enums.EXPENSE_HISTORY_TABLE_ROWS.grossRevenue)
                .verifyIssueTextByColIndex("-", customExpenseLocator)
                .verifyIssueTextByColIndex("-", Enums.EXPENSE_HISTORY_TABLE_ROWS.electricity);
        });
    
    });