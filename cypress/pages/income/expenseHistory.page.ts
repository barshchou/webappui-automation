import BasePage from "../base/base.page";

class ExpenseHistoryPage extends BasePage {

    get expensePeriodDropdown() { return cy.get("[data-qa=expensePeriod-select-list] [data-qa=select-value]"); }

    getDropdownOptionByValue(value: string) { return cy.get(`li[data-value='${value}']`); }

    get expenseYearInput() { return cy.get("[name=expenseYear]"); }

    get addExpenseYearButton() { return cy.get("[data-qa=expense-history-new-expense-year-btn]"); }

    get expenseHistoryCommentary() { return cy.get("[data-qa^='expenseHistoryDiscussion.commentary']"); }

    get expenseMonth() { return cy.get("[data-qa=expenseMonth-form-control] input"); }

    get expenseMonthProjection() { return cy.get("[data-qa='autosuggest-text-input-field'] input"); }

    getUnifiedEditableAndTotalCells(cellName: string) {
        return cy.get(`[row-id=${cellName}] [role=gridcell]:not([col-id=average]):not([col-id=name]):not([col-id=row-action])`);
    }

    getUnifiedAverageCell(cellName: string) { return cy.get(`[row-id=${cellName}] [col-id=average]`); }

    getUtilityExpensesOption(optionName: string) { return cy.get(`[name=utilitiesExpensesMode][value=${optionName}]`); }

    expenseModeRadioButton(mode: string) { return cy.get(`[name="utilitiesExpensesMode"][value='${mode}']`);}

}

export default new ExpenseHistoryPage();
