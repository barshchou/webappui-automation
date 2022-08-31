import testData from "../../../../fixtures/not_full_reports/income/expense_history/QA-5014.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income, ReviewExport } from "../../../../actions";
import { toCamelCase } from "../../../../../utils/string.utils";
import Enums from "../../../../enums/enums";
import { numberWithCommas } from "../../../../../utils/numbers.utils";

describe("Verify the 'Add expense category' button is displayed on the Expense History page",
    { tags: [ "@income", "@expense_history", "@check_export" ] }, () => {

        it("[QA-5014] Test body", () => {
            const newCategoryLocator = toCamelCase(testData.expenseCategory);
            createReport(testData.reportCreationData);
            cy.stepInfo("1. Navigate to expense history page");
            _NavigationSection.navigateToExpenseHistory();

            cy.stepInfo(`2. Click to the “Add custom expense category” button, verify modal displayed, 
            'Cancel' and 'Add' buttons are displayed`);
            Income._ExpenseHistory.clickAddExpenseCategoryButton()
                .Page.formCancelButton().should("exist");
            Income._ExpenseHistory.Page.formAddButton().should("exist")
                .should("be.disabled");

            cy.stepInfo("3. Verify user can add new category, 'X' button erases entered value");
            Income._ExpenseHistory.enterNewCategoryName(testData.expenseCategory)
                .verifyNewCategoryEnteredName(testData.expenseCategory);
            cy.get("[data-icon=times]").click();
            Income._ExpenseHistory.verifyNewCategoryEnteredName("")
                .Page.formCancelButton().click();

            cy.stepInfo("4. Check custom-created expense categories should behave the same as default");
            Income._ExpenseHistory.addNewCategoryAndVerify(testData.expenseCategory)
                .selectExpensePeriod(testData.expensePeriodType)
                .enterExpenseYear(testData.expenseYear)
                .clickAddExpenseYearButton()
                .enterIssueByColIndex(testData.grossRevenue, Enums.EXPENSE_HISTORY_TABLE_ROWS.grossRevenue)
                .enterIssueByColIndex(testData.taxes, Enums.EXPENSE_HISTORY_TABLE_ROWS.realEstateTaxes)
                .enterIssueByColIndex(testData.electricity, Enums.EXPENSE_HISTORY_TABLE_ROWS.electricity)
                .enterIssueByColIndex(testData.replacementReserves, Enums.EXPENSE_HISTORY_TABLE_ROWS.reserves)
                .enterIssueByColIndex(testData.categoryValue, newCategoryLocator)
                .verifyTotalOpExpensesByColIndex(0, newCategoryLocator)
                .verifyTOEExcludingRETByIndex(testData.taxes)
                .verifyNetOpIncomeByIndex(testData.grossRevenue);

            cy.stepInfo("5. Check that user can add the same category to the comparable expenses page upon page page");
            _NavigationSection.navigateToComparableExpenses();
            Income._ComparableExpenses.addNewCategoryAndVerify(testData.expenseCategory, false);

            cy.stepInfo("6. Generate and download report");
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport()
                .waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it("[QA-5014] Check export", () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.stepInfo("7. Verify custom expense is exported");
                    cy.visit(<string>file);
                    const tableLocator = "//*[.='Operating Expense Analysis']//following-sibling::table[1]";
                    const customExpenseCell = tableLocator + `//descendant::p[text()='${testData.expenseCategory}']`;
                    const toeCell = tableLocator + "//descendant::strong[text()='Total Operating Expenses']";
                    cy.xpath(customExpenseCell).parent("td").siblings("td").first()
                        .should("have.text", `$${numberWithCommas(Math.round(testData.categoryValue))}`);
                    cy.xpath(toeCell).parents("td").siblings("td").first()
                        .should("have.text", testData.toeExportValue);
                });
        });
    });