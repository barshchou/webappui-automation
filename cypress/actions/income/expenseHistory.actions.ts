import expenseHistoryPage from "../../pages/income/expenseHistory.page";
import { getNumberFromDollarNumberWithCommas, numberWithCommas } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";
import tableExpenseHistoryCellNames from "../../../cypress/enums/expense/expenseHistoryTableRows.enum";
import { _mutateArrayInMap } from "../../support/commands";
import mapKeysUtils from "../../utils/mapKeys.utils";
import { BoweryReports } from "../../types/boweryReports.type";
import Enums from "../../enums/enums";
import { toCamelCase } from "../../../utils/string.utils";

class ExpenseHistoryActions extends BaseActionsExt<typeof expenseHistoryPage> {

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

    enterIssueByColIndex(issueValue: number | string, 
        tableExpenseHistoryCellNames: string, index = 0,): ExpenseHistoryActions {
        if (issueValue === "clear" || issueValue === 0) {
            expenseHistoryPage.getUnifiedEditableAndTotalCells(tableExpenseHistoryCellNames).eq(index)
                .scrollIntoView()
                .realType("something nonsense");
            expenseHistoryPage.getUnifiedEditableAndTotalCells(tableExpenseHistoryCellNames).eq(index)
                .dblclick().clear();
            this.verifyIssueTextByColIndex(issueValue, tableExpenseHistoryCellNames, index);
        } else {
            expenseHistoryPage.getUnifiedEditableAndTotalCells(tableExpenseHistoryCellNames).eq(index)
                .scrollIntoView()
                .realType("something nonsense");
            expenseHistoryPage.getUnifiedEditableAndTotalCells(tableExpenseHistoryCellNames).eq(index)
                .dblclick().clear()
                .realType(`${issueValue}{enter}`);
            this.verifyIssueTextByColIndex(issueValue, tableExpenseHistoryCellNames, index);
        }
        return this;
    }

    verifyIssueTextByColIndex(issueValue: number | string, cellName: string, index = 0): ExpenseHistoryActions {
        const textToBe = issueValue === "clear" || issueValue === 0 ? "" :
            `$${numberWithCommas((<number>issueValue).toFixed(2))}`;
        expenseHistoryPage.getUnifiedEditableAndTotalCells(cellName).eq(index).should("have.text", textToBe);
        return this;
    }

    verifyTotalOpExpensesTextByColIndex(textToBe: string, index = 0): ExpenseHistoryActions {
        expenseHistoryPage.getUnifiedEditableAndTotalCells(tableExpenseHistoryCellNames.total).eq(index)
            .should("have.text", textToBe);
        return this;
    }

    verifyTotalOpExpensesByColIndex(index = 0, customExpenses?: string[] | string): ExpenseHistoryActions {
        this.setOperatingExpensesExceptGrossValuesToMap(index);
        if (customExpenses) {
            this.setOperatingExpensesExceptGrossValuesToMap(index, customExpenses);
        }
        cy._mapGet(mapKeysUtils.allOperatingExpensesValues).then(valuesArray => {
            const valuesSum = (<number[]>valuesArray).reduce((sum, current) => sum + current, 0);
            const textToBe = `$${numberWithCommas(valuesSum.toFixed(2))}`;
            cy._mapSet(mapKeysUtils.allOperatingExpensesValues, undefined);
            this.verifyTotalOpExpensesTextByColIndex(textToBe, index);
        });
        return this;
    }

    private setOperatingExpensesExceptGrossValuesToMap(index = 0,
        expensesArray: string[] | string = tableExpenseHistoryCellNames.operatingExpensesCellsNamesArray
    ): ExpenseHistoryActions {
        if (Array.isArray(expensesArray)) {
            for (let expense of expensesArray) {
                if (expense === tableExpenseHistoryCellNames.grossRevenue) {
                    continue;
                }
                this.setOperatingExpenseValueToMap(expense, index);
            }
        } else {
            this.setOperatingExpenseValueToMap(expensesArray, index);
        }
        return this;
    }

    private setOperatingExpenseValueToMap(expense, index = 0): ExpenseHistoryActions {
        expenseHistoryPage.getUnifiedEditableAndTotalCells(expense).eq(index).invoke("text").then(expenseText => {
            if (expenseText === "") {
                return;
            }
            const expenseValue = getNumberFromDollarNumberWithCommas(expenseText);
            _mutateArrayInMap(mapKeysUtils.allOperatingExpensesValues, expenseValue, "Operating expenses");
        });
        return this;
    }

    verifyTOEExcludingRETByIndex(retValue: number, index = 0): ExpenseHistoryActions {
        expenseHistoryPage.getUnifiedEditableAndTotalCells(tableExpenseHistoryCellNames.total).eq(index)
            .invoke("text").then(toeTotalText => {
                const toeTotalNumber = getNumberFromDollarNumberWithCommas(toeTotalText);
                const excludingTextToBe = `$${numberWithCommas((toeTotalNumber - retValue).toFixed(2))}`;
                expenseHistoryPage.getUnifiedEditableAndTotalCells(tableExpenseHistoryCellNames.totalExcludingTaxes)
                    .eq(index).should("have.text", excludingTextToBe);
            });
        return this;
    }

    verifyNetOpIncomeByIndex(grossRevenue: number, index = 0): ExpenseHistoryActions {
        expenseHistoryPage.getUnifiedEditableAndTotalCells(tableExpenseHistoryCellNames.total).eq(index)
            .invoke("text").then(toeTotalText => {
                const toeTotalNumber = getNumberFromDollarNumberWithCommas(toeTotalText);
                const noeNumberToBe = grossRevenue - toeTotalNumber;
                const noeTextToBe = noeNumberToBe < 0 ?
                    `-$${numberWithCommas(noeNumberToBe.toFixed(2)).replace("-", "")}` :
                    `$${numberWithCommas(noeNumberToBe.toFixed(2))}`;
                expenseHistoryPage.getUnifiedEditableAndTotalCells(tableExpenseHistoryCellNames.noi)
                    .eq(index).should("have.text", noeTextToBe);
            });
        return this;
    }

    verifyAverageByCell(cellsName: string): ExpenseHistoryActions {
        expenseHistoryPage.getUnifiedEditableAndTotalCells(cellsName).then(elements => {
            const averageNumber = ExpenseHistoryActions.getAverageValueFromInputs(elements);
            expenseHistoryPage.getUnifiedAverageCell(cellsName).should("have.text", averageNumber);
        });
        return this;
    }

    verifyAverageByCellTotal(cellsName: string): ExpenseHistoryActions {
        
        for (let i = 0; i < Cypress.$(expenseHistoryPage.getUnifiedEditableAndTotalCells(cellsName)).length; i++) {
            expenseHistoryPage.getUnifiedEditableAndTotalCells(cellsName)
                .eq(i).should("not.have.text", "");
        }
        expenseHistoryPage.getUnifiedEditableAndTotalCells(cellsName).then(elements => {
            const toeAverageToBe = ExpenseHistoryActions.getAverageTextFromCells(elements);
            expenseHistoryPage.getUnifiedAverageCell(cellsName).should("have.text", toeAverageToBe);
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

    private static getAverageTextFromCells(jQueryEls: JQuery<HTMLElement>): string {
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

    private static getAverageValueFromInputs(jQueryElements: JQuery<HTMLElement>): string {
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

    verifyExpenseHistoryCommentary(commToBe: string): ExpenseHistoryActions {
        expenseHistoryPage.expenseHistoryCommentary.should("have.text", commToBe);
        return this;
    }

    enterExpenseMonth(month: string): ExpenseHistoryActions {
        expenseHistoryPage.expenseMonthDropdown.click();
        expenseHistoryPage.expenseMonthDropdownValue(month).click();
        this.verifyExpenseMonth(month);
        return this;
    }

    verifyExpenseMonth(monthToBe: string, expensePeriodValue?: string): ExpenseHistoryActions {
        if (expensePeriodValue === "Projection" || expensePeriodValue === "Actual") {
            expenseHistoryPage.expenseMonthDropdown.should("be.disabled").and("have.value", monthToBe);
        } else {
            expenseHistoryPage.expenseMonthDropdown.should("have.value", monthToBe);
        }
        return this;
    }

    checkUtilitiesExpensesOption(optionName: string): ExpenseHistoryActions {
        expenseHistoryPage.getUtilityExpensesOption(optionName).click().parent("[data-qa=checked]").should("exist");
        return this;
    }

    verifyTableStateByUtilityExpensesRadio(checkedOption: BoweryReports.UtilityExpenses): ExpenseHistoryActions {
        switch (checkedOption) {
            case Enums.UTILITY_EXPENSES.combinedElectricityAndFuel:
                expenseHistoryPage.getExpenseRowByName(tableExpenseHistoryCellNames.utilities).should("exist");
                expenseHistoryPage.getExpenseRowByName(tableExpenseHistoryCellNames.electricity).should("not.exist");
                expenseHistoryPage.getExpenseRowByName(tableExpenseHistoryCellNames.fuel).should("not.exist");
                expenseHistoryPage.getExpenseRowByName(tableExpenseHistoryCellNames.waterAndSewer).should("exist");
                break;
            case Enums.UTILITY_EXPENSES.combinedAll:
                expenseHistoryPage.getExpenseRowByName(tableExpenseHistoryCellNames.utilities).should("exist");
                expenseHistoryPage.getExpenseRowByName(tableExpenseHistoryCellNames.electricity).should("not.exist");
                expenseHistoryPage.getExpenseRowByName(tableExpenseHistoryCellNames.fuel).should("not.exist");
                expenseHistoryPage.getExpenseRowByName(tableExpenseHistoryCellNames.waterAndSewer).should("not.exist");
                break;
            default:
                expenseHistoryPage.getExpenseRowByName(tableExpenseHistoryCellNames.utilities).should("not.exist");
                expenseHistoryPage.getExpenseRowByName(tableExpenseHistoryCellNames.electricity).should("exist");
                expenseHistoryPage.getExpenseRowByName(tableExpenseHistoryCellNames.fuel).should("exist");
                expenseHistoryPage.getExpenseRowByName(tableExpenseHistoryCellNames.waterAndSewer).should("exist");
        }
        return this;
    }

    clickRemoveExpensePeriodButtonBuColIndex(index = 0): ExpenseHistoryActions {
        expenseHistoryPage.removeExpensePeriodButtons.eq(index).click();
        return this;
    }

    clickAddExpenseCategoryButton(): ExpenseHistoryActions {
        expenseHistoryPage.addExpenseCategoryButton.click();
        return this;
    }

    enterNewCategoryName(name: string, isFirstEnter = true): ExpenseHistoryActions {
        expenseHistoryPage.newCategoryNameInput.should("have.attr", "placeholder", "Enter Custom Expense...")
            .and("have.attr", "required");
        expenseHistoryPage.newCategoryNameInput.type(`${name}`);
        if (isFirstEnter) {
            cy.get("[role=menuitem]").should("contain.text", `Create "${name}"`);
        }
        expenseHistoryPage.newCategoryNameInput.type("{enter}");
        return this;
    }

    verifyNewCategoryEnteredName(nameToBe: string): ExpenseHistoryActions {
        expenseHistoryPage.newCategoryNameInput.should("have.value", nameToBe);
        return this;
    }

    verifyCategoryExists(name: string): ExpenseHistoryActions {
        expenseHistoryPage.getExpenseRowByName(name).should("exist");
        return this;
    }

    addNewCategoryAndVerify(categoryName: string): ExpenseHistoryActions {
        this.clickAddExpenseCategoryButton()
            .enterNewCategoryName(categoryName)
            .verifyNewCategoryEnteredName(categoryName)
            .Page.formAddButton().click();
        this.verifyCategoryExists(toCamelCase(categoryName));
        return this;
    }
}

export default new ExpenseHistoryActions(expenseHistoryPage);
