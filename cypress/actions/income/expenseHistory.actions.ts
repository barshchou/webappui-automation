import expenseHistoryPage from "../../pages/income/expenseHistory.page";
import { getNumberFromDollarNumberWithCommas, numberWithCommas } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";
import tableExpenseHistoryCellNames from "../../../cypress/enums/expenseHistoryTableRows.enum";

class ExpenseHistoryActions extends BaseActionsExt<typeof expenseHistoryPage>{

    selectExpensePeriod(value: string): ExpenseHistoryActions {
        expenseHistoryPage.expensePeriodDropdown.click();
        expenseHistoryPage.getDropdownOptionByValue(value).click();
        return this;
    }

    verifyExpenseYear(yearToBe: number | string): ExpenseHistoryActions {
        expenseHistoryPage.expenseYearInput.should("have.value", yearToBe);
        return this;
    }

    enterExpenseYear(year: number | string): ExpenseHistoryActions {
        expenseHistoryPage.expenseYearInput.clear().type(`${year}`);
        this.verifyExpenseYear(year);
        return this;
    }

    clickAddExpenseYearButton(): ExpenseHistoryActions {
        expenseHistoryPage.addExpenseYearButton.click();
        return this;
    }

    enterIssueByColIndex(issueValue: number | string, tableExpenseHistoryCellNames: string, index = 0,): ExpenseHistoryActions {  
        if (issueValue === "clear") {
            expenseHistoryPage.getUnifiedEditableAndTotalCells(tableExpenseHistoryCellNames).eq(index).scrollIntoView({ duration: 500 }).click().dblclick({ force: true }).clear();
        } else {
            expenseHistoryPage.getUnifiedEditableAndTotalCells(tableExpenseHistoryCellNames).eq(index).scrollIntoView({ duration: 500 }).dblclick({ force: true }).clear().realType(`${issueValue}{enter}`);
            expenseHistoryPage.getUnifiedEditableAndTotalCells(tableExpenseHistoryCellNames).eq(index).should("have.text", `$${numberWithCommas(issueValue)}.00`);
        }
        return this;
    }

    /**
     *
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    checkGrossRevenueCheckboxByColumnIndex(index = 0): ExpenseHistoryActions {
        expenseHistoryPage.grossRevenueCheckboxes.eq(index).check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    uncheckFuelCheckboxByColIndex(index = 0): ExpenseHistoryActions {
        expenseHistoryPage.fuelCheckboxes.eq(index).uncheck().should("have.value", "false");
        return this;
    }

    /**
     *
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    uncheckWaterSewerCheckboxByColIndex(index = 0): ExpenseHistoryActions {
        expenseHistoryPage.waterSewerCheckboxes.eq(index).uncheck().should("have.value", "false");
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    verifyTotalOpExpensesByColIndex(textToBe: string, index = 0): ExpenseHistoryActions {
        expenseHistoryPage.getUnifiedEditableAndTotalCells(tableExpenseHistoryCellNames.total).eq(index).should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {number} retValue
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    verifyTOEExcludingRETByIndex(retValue: number, index = 0): ExpenseHistoryActions {
        expenseHistoryPage.getUnifiedEditableAndTotalCells(tableExpenseHistoryCellNames.total).eq(index).invoke("text").then(toeTotalText => {
            const toeTotalNumber = getNumberFromDollarNumberWithCommas(toeTotalText);
            const excludingTextToBe = `$${numberWithCommas((toeTotalNumber - retValue).toFixed(2))}`;
            expenseHistoryPage.getUnifiedEditableAndTotalCells(tableExpenseHistoryCellNames.totalExcludingTaxes).eq(index).should("have.text", excludingTextToBe);
        });
        return this;
    }

    /**
     *
     * @param {number} grossRevenue
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    verifyNetOpIncomeByIndex(grossRevenue: number, index = 0): ExpenseHistoryActions {
        expenseHistoryPage.getUnifiedEditableAndTotalCells(tableExpenseHistoryCellNames.total).eq(index).invoke("text").then(toeTotalText => {
            const toeTotalNumber = getNumberFromDollarNumberWithCommas(toeTotalText);
            const noeTextToBe = `$${numberWithCommas((grossRevenue - toeTotalNumber).toFixed(2))}`;
            expenseHistoryPage.getUnifiedEditableAndTotalCells(tableExpenseHistoryCellNames.noi).eq(index).should("have.text", noeTextToBe);
        });
        return this;
    }

    verifyAverageByCell(cellsName: string): ExpenseHistoryActions {
        expenseHistoryPage.getUnifiedEditableAndTotalCells(cellsName).then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            expenseHistoryPage.getUnifiedAverageCell(cellsName).should("have.text", averageNumber);
        });
        return this;
    }

    verifyAverageByCellTotal(cellsName: string): ExpenseHistoryActions {
        expenseHistoryPage.getUnifiedEditableAndTotalCells(cellsName).then(elements => {
            const toeAvrgToBe = this.getAverageTextFromCells(elements);
            expenseHistoryPage.getUnifiedAverageCell(cellsName).should("have.text", toeAvrgToBe);
        });
        return this;
    }

    verifyAverageTable(): ExpenseHistoryActions {
        tableExpenseHistoryCellNames.operatingExpensesCellsNamesArray.forEach(cellsName => {
            this.verifyAverageByCell(cellsName);
        });
        tableExpenseHistoryCellNames.totalOperatingExpensesCellsNamesArray.forEach(cellsName => {
            this.verifyAverageByCellTotal(cellsName);
        });
        return this;
    }

    /**
     * @private
     * @param {JQuery<HTMLElement>} jQueryEls
     * @returns {string}
     */
    getAverageTextFromCells(jQueryEls: JQuery<HTMLElement>): string {
        let sum = 0;
        for (let i = 0; i < jQueryEls.length; i++) {
            let elNumber = getNumberFromDollarNumberWithCommas(jQueryEls[i].textContent);
            sum += elNumber;
        }
        const firstChar = numberWithCommas((sum / jQueryEls.length).toFixed(2)).charAt(0);
        if (firstChar === "-") {
            return `-$${numberWithCommas((sum / jQueryEls.length).toFixed(2)).substring(1)}`;
        }
        return `$${numberWithCommas((sum / jQueryEls.length).toFixed(2))}`;
    }


    /**
     * @private
     * @param {JQuery<HTMLElement>} jQueryElements
     * @returns {string}
     */
    getAverageValueFromInputs(jQueryElements: JQuery<HTMLElement>): string {
        let cellsCounter = 0;
        let sum = 0;
        for (let i = 0; i < jQueryElements.length; i++) {
            let elValue = jQueryElements[i].textContent;
            cy.log(`Element value ${i} = ${elValue}`);
            if (elValue === null || elValue === "") {
                continue;
            }
            let elNumber = getNumberFromDollarNumberWithCommas(elValue);
            sum += elNumber;
            cellsCounter++;
        }
        cy.log(`Cells counter = ${cellsCounter}`);
        if (cellsCounter === 0) {
            return "";
        } else {
            return `$${numberWithCommas((sum / cellsCounter).toFixed(2))}`;
        }
    }

    /**
     *
     * @param {string} commToBe
     * @returns {ExpenseHistoryActions}
     */
    verifyExpenseHistoryCommentary(commToBe: string): ExpenseHistoryActions {
        expenseHistoryPage.expenseHistoryCommentary.should("have.text", commToBe);
        return this;
    }

    enterExpenseMonth(month: string): ExpenseHistoryActions {
        expenseHistoryPage.expenseMonth.clear().type(month);
        this.verifyExpenseMonth(month);
        return this;
    }

    verifyExpenseMonth(monthToBe: string, expensePeriodValue?: string): ExpenseHistoryActions {
        if (expensePeriodValue === "Projection" || expensePeriodValue === "Actual") {
            expenseHistoryPage.expenseMonthProjection.should("be.disabled").and("have.value", monthToBe);
        } else {
            expenseHistoryPage.expenseMonth.should("have.value", monthToBe);
        }
        return this;
    }
}

export default new ExpenseHistoryActions(expenseHistoryPage);
