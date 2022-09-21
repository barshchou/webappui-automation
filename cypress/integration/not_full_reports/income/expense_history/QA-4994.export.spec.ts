import testData from "../../../../fixtures/not_full_reports/income/expense_history/QA-4994.fixture";
import Enums from "../../../../enums/enums";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income, ReviewExport } from "../../../../actions";
import { numberWithCommas } from "../../../../../utils/numbers.utils";

describe(`Verify that exported schemas and templates to enable combined utility expenses changed and display 
the same info as on the WebApp`, { tags: [ "@income", "@expense_history", "@check_export" ] }, () => {

    Object.values(Enums.UTILITY_EXPENSES).forEach(expense => {

        const reportCreationData = testData.getReportCreationData(expense);
        const combinedElectricityFuel = testData.electricity + testData.fuel;
        const combinedAll = testData.electricity + testData.fuel + testData.waterAndSewer;

        it(`[QA-4994] Download report with ${expense} utility expense`, () => {
            createReport(reportCreationData);
            cy.stepInfo("1. Navigate to expense history, add expense period and utility expenses");
            _NavigationSection.navigateToExpenseHistory();
            Income._ExpenseHistory.selectExpensePeriod(testData.expensePeriodType)
                .enterExpenseYear(testData.expenseYear)
                .clickAddExpenseYearButton()
                .checkUtilitiesExpensesOption(expense);

            cy.stepInfo("2. Enter issues values, depending on expense value");
            if (expense === Enums.UTILITY_EXPENSES.brokenOut) {
                Income._ExpenseHistory.enterIssueByColIndex(testData.electricity,
                    Enums.EXPENSE_HISTORY_TABLE_ROWS.electricity)
                    .enterIssueByColIndex(testData.fuel, Enums.EXPENSE_HISTORY_TABLE_ROWS.fuel)
                    .enterIssueByColIndex(testData.waterAndSewer, Enums.EXPENSE_HISTORY_TABLE_ROWS.waterAndSewer);
            } else if (expense === Enums.UTILITY_EXPENSES.combinedElectricityAndFuel) {
                Income._ExpenseHistory.enterIssueByColIndex(combinedElectricityFuel,
                    Enums.EXPENSE_HISTORY_TABLE_ROWS.utilities)
                    .enterIssueByColIndex(testData.waterAndSewer, Enums.EXPENSE_HISTORY_TABLE_ROWS.waterAndSewer);
            } else {
                Income._ExpenseHistory.enterIssueByColIndex(combinedAll, Enums.EXPENSE_HISTORY_TABLE_ROWS.utilities);
            }

            cy.stepInfo("3. Generate and download report");
            _NavigationSection.openReviewAndExport();
            ReviewExport.selectSectionsToIncludeInExport(testData.sectionToExport)
                .generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(reportCreationData.reportNumber);
        });

        it(`[QA-4994] Check export with ${expense} utility expense`, () => {
            cy.task("getFilePath", { _reportName: reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    const electricityCell = getCellLocator(Enums.PRO_FORMA_TYPES.electricity);
                    const fuelCell = getCellLocator(Enums.PRO_FORMA_TYPES.fuel);
                    const waterSewerCell = getCellLocator(Enums.PRO_FORMA_TYPES.waterAndSewer);
                    const utilitiesCell = getCellLocator("Utilities");

                    cy.stepInfo("4. Verify exported document");
                    cy.visit(<string>file);
                    if (expense === Enums.UTILITY_EXPENSES.brokenOut) {
                        cy.xpath(electricityCell).parent("td").siblings("td").first()
                            .should("have.text", `$${numberWithCommas(Math.round(testData.electricity))}`);
                        cy.xpath(fuelCell).parent("td").siblings("td").first()
                            .should("have.text", `$${numberWithCommas(Math.round(testData.fuel))}`);
                        cy.xpath(waterSewerCell).parent("td").siblings("td").first()
                            .should("have.text", `$${numberWithCommas(Math.round(testData.waterAndSewer))}`);
                        cy.xpath(utilitiesCell).should("not.exist");
                    } else if (expense === Enums.UTILITY_EXPENSES.combinedElectricityAndFuel) {
                        cy.xpath(utilitiesCell).parent("td").siblings("td").first()
                            .should("have.text", `$${numberWithCommas(Math.round(combinedElectricityFuel))}`);
                        cy.xpath(waterSewerCell).parent("td").siblings("td").first()
                            .should("have.text", `$${numberWithCommas(Math.round(testData.waterAndSewer))}`);
                        cy.xpath(electricityCell).should("not.exist");
                        cy.xpath(fuelCell).should("not.exist");
                    } else {
                        cy.xpath(utilitiesCell).parent("td").siblings("td").first()
                            .should("have.text", `$${numberWithCommas(Math.round(combinedAll))}`);
                        cy.xpath(electricityCell).should("not.exist");
                        cy.xpath(fuelCell).should("not.exist");
                        cy.xpath(waterSewerCell).should("not.exist");
                    }
                });
        });
    });
});

const getCellLocator = cellName => {
    return `//*[.='Operating Expense Analysis']//following-sibling::table[1]//descendant::p[text()='${cellName}']`;
};