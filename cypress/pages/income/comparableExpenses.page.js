import BasePage from "../base/base.page";

class ComparableExpensesPage extends BasePage {
    get addBlankColumnButton() {return cy.get("[data-qa=comparable-exp-add-blank-btn]");}
    get compAddressCells() {return cy.get("[name^=comparableExpenses][name$=address]");}

}

export default new ComparableExpensesPage();
