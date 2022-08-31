import testData from "../../../../fixtures/not_full_reports/income/expense_history/QA-5121.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income, ReviewExport } from "../../../../actions";
import Enums from "../../../../enums/enums";
import { numberWithCommas } from "../../../../../utils/numbers.utils";

describe("Verify that the user can delete expense category on the Expense History page", 
    { tags: [ "@income", "@expense_history", "@check_export" ] }, () => {
    
        it("[QA-5121] Test body", () => {
            createReport(testData.reportCreationData);

            cy.stepInfo("1. Navigate to Expense History page");
            _NavigationSection.navigateToExpenseHistory();

            cy.stepInfo("2. Add custom expense category, delete all deletable expenses");
            Income._ExpenseHistory
                .selectExpensePeriod(testData.expensePeriodType)
                .enterExpenseYear(testData.expenseYear)
                .clickAddExpenseYearButton()
                .enterIssueByColIndex(testData.grossRevenue, Enums.EXPENSE_HISTORY_TABLE_ROWS.grossRevenue)
                .addNewCategoryAndVerify(testData.customCategory)
                .deleteAllDeletableOperatingExpenses()
                .verifyCategoryExists(Enums.EXPENSE_HISTORY_TABLE_ROWS.grossRevenue);

            cy.stepInfo("3. Generate and download report");
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport()
                .waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it("[QA-5121] Check export", () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.stepInfo("4. Check exported document, verify expenses are deleted");
                    cy.visit(<string>file);
                    const tableLocator = "//*[.='Operating Expense Analysis']//following-sibling::table[1]";
                    const grossRevenueCell = tableLocator + "//descendant::p[text()='Effective Gross Revenue']";
                    cy.xpath(grossRevenueCell).parent("td").siblings("td").first()
                        .should("have.text", `$${numberWithCommas(Math.round(testData.grossRevenue))}`);
                    testData.expensesToCheck.forEach(expense => {
                        cy.xpath(tableLocator + `//descendant::p[text()='${expense}']`)
                            .should("not.exist");
                    });
                });
        });
    });