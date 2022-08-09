import BasePage from "../base/base.page";

class ExpenseHistoryPage extends BasePage {

    get expensePeriodDropdown() { return cy.get("#expensePeriod"); }

    getDropdownOptionByValue(value: string) { return cy.get(`li[data-value='${value}']`); }

    get expenseYearInput() { return cy.get("[name=expenseYear]"); }

    get addExpenseYearButton() { return cy.get("[data-qa=expense-history-new-expense-year-btn]"); }

    get expenseHistoryCommentary() { return cy.get("[data-qa^='expenseHistoryDiscussion.commentary']"); }

    get expenseMonthDropdown() { return cy.get("#expenseMonth"); }

    expenseMonthDropdownValue(month: string) { return  cy.xpath(`//li[.='${month}']`); }

    getUnifiedEditableAndTotalCells(cellName: string) {
        return cy.get(`[row-id=${cellName}] [role=gridcell]:not([col-id=average])` + 
        `:not([col-id=name]):not([col-id=row-action])`);
    }

    getUnifiedAverageCell(cellName: string) { return cy.get(`[row-id=${cellName}] [col-id=average]`); }

    getUtilityExpensesOption(optionName: string) { return cy.get(`[name=utilitiesExpensesMode][value=${optionName}]`); }

    get removeExpensePeriodButtons() { return cy.get("button [data-icon=close]"); }

    getExpenseRowByName(cellName: string) { return cy.get(`[row-id='${cellName}'] [col-id=name]`); }

    get addExpenseCategoryButton() { return cy.get("[data-qa=add-category-btn]"); }

    get newCategoryNameInput() { return cy.get("[data-qa=expenseName-form-control] input"); }
}

export default new ExpenseHistoryPage();
