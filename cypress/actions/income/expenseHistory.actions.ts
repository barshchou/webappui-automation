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
        tableExpenseHistoryCellNames: string, index = 0): ExpenseHistoryActions {
        this.typeToCellByColIndex("something nonsense", tableExpenseHistoryCellNames, index)
            .typeToCellByColIndex(`${issueValue}{enter}`, tableExpenseHistoryCellNames, index, true)
            .verifyIssueTextByColIndex(issueValue, tableExpenseHistoryCellNames, index);
        return this;
    }

    clearCellWithTypeFirst(cellName: string, index = 0): ExpenseHistoryActions {
        this.typeToCellByColIndex("something nonsense", cellName, index)
            .clearCellByColIndex(cellName, index);
        return this;
    }

    clearCellByColIndex(cellName: string, index = 0): ExpenseHistoryActions {
        expenseHistoryPage.getUnifiedEditableAndTotalCells(cellName).eq(index).dblclick().clear();
        return this;
    }
    
    private typeToCellByColIndex(valueToType: string | number, cellName: string, index = 0, isWithClear = false
    ): ExpenseHistoryActions {
        expenseHistoryPage.getUnifiedEditableAndTotalCells(cellName).eq(index)
            .scrollIntoView();
        if (isWithClear) {
            this.clearCellByColIndex(cellName, index);
        }
        expenseHistoryPage.getUnifiedEditableAndTotalCells(cellName).realType(`${valueToType}`);
        return this;
    }

    verifyIssueTextByColIndex(issueValue: number | string, cellName: string, index = 0, notHaveText?: boolean
    ): ExpenseHistoryActions {
        const matcher = notHaveText ? "not.have.text" : "have.text";
        const textToBe = issueValue === 0 ? "" : issueValue === "-" ? issueValue :
            `$${numberWithCommas((<number>issueValue).toFixed(2))}`;
        expenseHistoryPage.getUnifiedEditableAndTotalCells(cellName).eq(index).should(matcher, textToBe);
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
        const expensesInnerArray = Array.isArray(expensesArray) ? expensesArray : [ expensesArray ];
        for (let expense of expensesInnerArray) {
            if (expense === tableExpenseHistoryCellNames.grossRevenue) {
                continue;
            }
            this.setOperatingExpenseValueToMap(expense, index);
        }
        return this;
    }

    private setOperatingExpenseValueToMap(expense: string, index = 0): ExpenseHistoryActions {
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
        expenseHistoryPage.expenseMonthDropdown.type(`${month}{enter}`);
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

    /**
     * @param name
     * @param isFirstEnter If this parameter is passed, it means that we enter this new category for the first time
     * in this report, we create it, in this case the function will check, that suggestion dropdown will contain
     * 'Create' word
     */
    enterNewCategoryName(name: string, isFirstEnter = true): ExpenseHistoryActions {
        expenseHistoryPage.newCategoryNameInput.should("have.attr", "placeholder", "Enter Custom Expense...");
        expenseHistoryPage.newCategoryNameInput.type(`${name}`);
        if (isFirstEnter) {
            cy.contains(`${name} will be created`).should("exist");
        }
        expenseHistoryPage.newCategoryNameInput.type("{downArrow}{enter}");
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

    addNewCategoryAndVerify(categoryName: string, isClickSave = false): ExpenseHistoryActions {
        this.clickAddExpenseCategoryButton()
            .enterNewCategoryName(categoryName)
            .verifyNewCategoryEnteredName(categoryName)
            .Page.formAddButton().should("not.be.disabled").click();
        this.verifyCategoryExists(toCamelCase(categoryName))
            .verifyDeleteButtonExists(toCamelCase(categoryName));
        if (isClickSave) {
            this.clickSaveButton()
                .verifyProgressBarNotExist();
        }
        return this;
    }
    
    deleteAllDeletableOperatingExpenses(): ExpenseHistoryActions {
        expenseHistoryPage.getDeleteExpenseButton().as("deleteButtons");
        cy.get("@deleteButtons").then(deleteButtons => {
            for (let i = 0; i < deleteButtons.length; i++) {
                cy.get("@deleteButtons").eq(0).then(currentButton => {
                    cy.wrap(currentButton).parents("[row-id]").then(el => {
                        const rowId = el.attr("row-id");
                        cy.wrap(currentButton).click();
                        expenseHistoryPage.getExpenseRowByName(rowId).should("not.exist");
                    });
                });
            }
        });
        return this;
    }

    verifyDeleteButtonExists(category: string, isExists = true): ExpenseHistoryActions {
        const matcher = isExists ? "exist" : "not.exist";
        expenseHistoryPage.getDeleteExpenseButton(category).should(matcher);
        return this;
    }

    checkDataProviderOption(option: BoweryReports.ExpenseDataProvider): ExpenseHistoryActions {
        expenseHistoryPage.getDataProviderOption(option).click().parent("[data-qa=checked]").should("exist");
        return this;
    }

    verifyExpenseHistoryDiscussionText(textToBe: string, isTextArea = false): ExpenseHistoryActions {
        expenseHistoryPage.getExpenseHistoryDiscussion(isTextArea).should("have.text", textToBe);
        return this;
    }

    clickTableSettingsButton(): ExpenseHistoryActions {
        expenseHistoryPage.tableSettingsButton.click();
        return this;
    }

    clickExpenseItemBasisOfComparisonDropdown(): ExpenseHistoryActions {
        expenseHistoryPage.expenseItemBasisOfComparisonDropdown.click();
        return this;
    }

    chooseDropdownOption(option: string): ExpenseHistoryActions {
        expenseHistoryPage.getDropdownOption(option).click();
        return this;
    }

    verifyExpenseItemBasisOfComparisonDropdownOption(optionToBe: BoweryReports.ExpenseItemBasisOfComparison
    ): ExpenseHistoryActions {
        expenseHistoryPage.expenseItemBasisOfComparisonDropdown.should("have.text", optionToBe);
        return this;
    }

    clickTableSettingsSaveButton(): ExpenseHistoryActions {
        expenseHistoryPage.tableSettingsSaveButton.click();
        return this;
    }

    changeTableExpenseItemBasisOfComparison(basis: BoweryReports.ExpenseItemBasisOfComparison): ExpenseHistoryActions {
        this.clickTableSettingsButton()
            .clickExpenseItemBasisOfComparisonDropdown()
            .chooseDropdownOption(basis)
            .verifyExpenseItemBasisOfComparisonDropdownOption(basis)
            .clickTableSettingsSaveButton();
        return this;
    }

    setCellValueToMap(cellName: string, index = 0): ExpenseHistoryActions {
        expenseHistoryPage.getUnifiedEditableAndTotalCells(cellName).eq(index).invoke("text").then(cellText => {
            const numberValue = getNumberFromDollarNumberWithCommas(cellText);
            cy._mapSet(cellName, numberValue);
        });
        return this;
    }

    verifyCellIsReadonly(cellName: string, index = 0): ExpenseHistoryActions {
        expenseHistoryPage.getUnifiedEditableAndTotalCells(cellName).eq(index).then(cell => {
            const isIncludeReadOnly = cell.attr("class").includes("readOnlyColumn");
            expect(isIncludeReadOnly).to.be.true;
        });
        return this;
    }
}

export default new ExpenseHistoryActions(expenseHistoryPage);
