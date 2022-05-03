import BasePage from "../base/base.page";

class ExpenseHistoryPage extends BasePage {

    get expensePeriodDropdown() { return cy.get("[data-qa=expensePeriod-select-list] [data-qa=select-value]"); }

    getDropdownOptionByValue(value) { return cy.get(`li[data-value='${value}']`); }

    get expenseYearInput() { return cy.get("[name=expenseYear]"); }

    get addExpenseYearButton() { return cy.get("[data-qa=expense-history-new-expense-year-btn]"); }

    get grossRevenueCheckboxes() { return cy.get("[data-qa*='grossRevenue.reported'] input"); }

    get grossRevenueInputs() { return cy.get("[row-id='grossRevenue'] div.right-aligned-cell:not([col-id=average])"); }

    get realEstateTaxesInputs() { return cy.get("[row-id='realEstateTaxes'] div.right-aligned-cell:not([col-id=average])"); }

    get insuranceInputs() { return cy.get("[row-id='insurance'] div.right-aligned-cell:not([col-id=average])"); }

    get electricityInputs() { return cy.get("[row-id='electricity'] div.right-aligned-cell:not([col-id=average])"); }

    get fuelInputs() { return cy.get("[row-id='fuel'] div.right-aligned-cell:not([col-id=average])"); }

    get repairsAndMaintenanceInputs() { return cy.get("[row-id='repairsAndMaintenance'] div.right-aligned-cell"); }           //!!!!!

    get fuelCheckboxes() { return cy.get("[data-qa*='expenses.fuel.reported'] input"); }

    get waterSewerCheckboxes() { return cy.get("[data-qa*='expenses.waterAndSewer.reported'] input"); }

    get payrollBenefitsInputs() { return cy.get("[row-id='payrollAndBenefits'] div.right-aligned-cell:not([col-id=average])"); }

    get totalOpExpenseCells() { return cy.get("[row-id=total] div.right-aligned-cell:not([col-id=average])"); }

    get toeExclRealEstTaxesCells() { return cy.get("[row-id=totalExcludingTaxes] div.right-aligned-cell:not([col-id=average])"); }

    get netOpIncomeCells() { return cy.get("[row-id=noi] div.right-aligned-cell:not([col-id=average])"); }

    get expenseHistoryCommentary() { return cy.get("[data-qa^='expenseHistoryDiscussion.commentary']"); }

    get expenseMonth() { return cy.get("[data-qa=expenseMonth-form-control] input"); }

    get expenseMonthProjection() { return cy.get("[data-qa='autosuggest-text-input-field'] input"); }

    getUnifiedEditableAndTotalCells(cellName: string) {
        return cy.get(`[row-id=${cellName}] [role=gridcell]:not([col-id=average]):not([col-id=name]):not([col-id=row-action])`);
    }

    getUnifiedAverageCell(cellName: string) { return cy.get(`[row-id=${cellName}] [col-id=average]`); }

}

export default new ExpenseHistoryPage();
