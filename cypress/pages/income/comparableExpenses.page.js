import BasePage from "../base/base.page";

class ComparableExpensesPage extends BasePage {
    get addBlankColumnButton() {return cy.get("[data-qa=comparable-exp-add-blank-btn]");}
    get compAddressCells() {return cy.get("[name^=comparableExpenses][name$=address]");}
    get compLocationCells() {return cy.get("[name^=comparableExpenses][name$=location]");}
    get expensePeriodDropdowns() {return cy.get("[data-qa$=expensePeriod-form-control] [data-qa=select-value]");}
    getDropdownOptionByValue(value) {return cy.get(`li[data-value='${value}']`);}
    get expenseYearCells() {return cy.get("[name$=expenseYear]");}

}

export default new ComparableExpensesPage();
