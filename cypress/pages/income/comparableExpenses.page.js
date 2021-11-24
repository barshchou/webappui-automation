import BasePage from "../base/base.page";

class ComparableExpensesPage extends BasePage {
    get addBlankColumnButton() {return cy.get("[data-qa=comparable-exp-add-blank-btn]");}
    get compAddressCells() {return cy.get("[name^=comparableExpenses][name$=address]");}
    get compLocationCells() {return cy.get("[name^=comparableExpenses][name$=location]");}
    get expensePeriodDropdowns() {return cy.get("[data-qa$=expensePeriod-form-control] [data-qa=select-value]");}
    getDropdownOptionByValue(value) {return cy.get(`li[data-value='${value}']`);}
    get expenseYearCells() {return cy.get("[name$=expenseYear]");}
    get expenseMonthCells() {return cy.get("[data-qa$=expenseMonth-form-control] input");}
    get squareFeetCells() {return cy.get("[name$=squareFeet]");}
    get residentialUnitsCells() {return cy.get("[name$=residentialUnits]");}
    get insuranceCells() {return cy.get("[name$='insurance.total']");}
    get electricityCells() {return cy.get("[name$='electricity.total']");}
    get repairsCells() {return cy.get("[name$='repairsAndMaintenance.total']");}
    get payrollCells() {return cy.get("[name$='payrollAndBenefits.total']");}
    get generalCells() {return cy.get("[name$='generalAndAdministrative.total']");}
    get managementFeesCells() {return cy.get("[name$='management.total']");}
    get totalOpExpensesCells() {return cy.get("[data-qa^=total-operation-expenses-cell]");}
    get toePerSFCells() {return cy.get("[data-qa^=total-operation-expenses-per-sf-cell]");}
    get toePerUnitCells() {return cy.get("[data-qa^=total-operation-expenses-per-unit-cell]");}
    get squareFeetAverage() {return cy.get("[data-qa=squareFeet-row] > td:last-child");}
    get residentialUnitsAverage() {return cy.get("[data-qa=residentialUnits-row] > td:last-child");}
}

export default new ComparableExpensesPage();
