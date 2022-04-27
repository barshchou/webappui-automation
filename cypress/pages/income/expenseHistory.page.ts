import BasePage from "../base/base.page";

class ExpenseHistoryPage extends BasePage{

    get expensePeriodDropdown() {return cy.get("[data-qa=expensePeriod-select-list] [data-qa=select-value]");}

    getDropdownOptionByValue(value) {return cy.get(`li[data-value='${value}']`);}

    get expenseYearInput() {return cy.get("[name=expenseYear]");}

    get addExpenseYearButton() {return cy.get("[data-qa=expense-history-new-expense-year-btn]");}

    get grossRevenueCheckboxes() {return cy.get("[data-qa*='grossRevenue.reported'] input");}

    get grossRevenueInputs() {return cy.get("[row-id='grossRevenue'] div.right-aligned-cell");}
    
    get realEstateTaxesInputs() {return cy.get("[row-id='realEstateTaxes'] div.right-aligned-cell");}

    get insuranceInputs() {return cy.get("[row-id='insurance'] div.right-aligned-cell");}

    get electricityInputs() {return cy.get("[row-id='electricity'] div.right-aligned-cell");}

    get fuelInputs() {return cy.get("[row-id='fuel'] div.right-aligned-cell");}

    get repairsAndMaintenanceInputs() {return cy.get("[name$='expenses.repairsAndMaintenance.total']");}           //!!!!!

    get fuelCheckboxes() {return cy.get("[data-qa*='expenses.fuel.reported'] input");}

    get waterSewerCheckboxes() {return cy.get("[data-qa*='expenses.waterAndSewer.reported'] input");}

    get payrollBenefitsInputs() {return cy.get("[row-id='payrollAndBenefits'] div.right-aligned-cell");}

    get totalOpExpenseCells() {return cy.get("[data-qa='Total Operating Expenses-undefined']");}

    get toeExclRealEstTaxesCells() {return cy.get("[data-qa$='(Excl. RE Taxes)-undefined']");}

    get netOpIncomeCells() {return cy.get("[data-qa='Net Operating Income-undefined']");}

    get expenseHistoryCommentary() {return cy.get("[data-qa^='expenseHistoryDiscussion.commentary']");}

    get averageGrossRevenueCell() {return cy.get("[row-id='grossRevenue'] div.right-aligned-cell").last();}

    get averageRealEstateCell() {return cy.get("[row-id='realEstateTaxes'] div.right-aligned-cell").last();}

    get averageInsuranceCell() {return cy.get("[row-id='insurance'] div.right-aligned-cell").last();}

    get averageElectricity() {return cy.get("[row-id='electricity'] div.right-aligned-cell").last();}

    get averageFuelCell() {return cy.get("[row-id='fuel'] div.right-aligned-cell").last();}

    get averageWaterSewerCell() {return cy.get("[data-qa=waterAndSewer-row] > td").last();}

    get waterSewerInputs() {return cy.get("[row-id='waterAndSewer'] div.right-aligned-cell");}

    get averageRepairsCell() {return cy.get("[row-id='repairsAndMaintenance'] div.right-aligned-cell").last();}

    get repairsInputs() {return cy.get("[row-id='repairsAndMaintenance'] div.right-aligned-cell");}

    get averagePayrollCell() {return cy.get("[row-id='payrollAndBenefits'] div.right-aligned-cell").last();}

    get averageAdministrativeCell() {return cy.get("[row-id='generalAndAdministrative'] div.right-aligned-cell").last();}

    get administrativeInputs() {return cy.get("[row-id='generalAndAdministrative'] div.right-aligned-cell");}

    get averageProfessionalCell() {return cy.get("[row-id='legalAndProfessionalFees'] div.right-aligned-cell").last();}

    get professionalInputs() {return cy.get("[row-id='legalAndProfessionalFees'] div.right-aligned-cell");}

    get averageMiscellaneousCell() {return cy.get("[row-id='miscellaneous'] div.right-aligned-cell").last();}

    get miscellaneousInputs() {return cy.get("[row-id='miscellaneous'] div.right-aligned-cell");}

    get averageManagementCell() {return cy.get("[row-id='management'] div.right-aligned-cell").last();}

    get managementInputs() {return cy.get("[row-id='management'] div.right-aligned-cell");}

    get averageReplacementCell() {return cy.get("[row-id='reserves'] div.right-aligned-cell").last();}

    get replacementInputs() {return cy.get("[row-id='reserves'] div.right-aligned-cell");}

    get toeAverageCell() {return cy.get("[data-qa='Total Operating Expenses-average']");}

    get toeExclRETAverageCell() {return cy.get("[data-qa$='(Excl. RE Taxes)-average']");}

    get noeAverageCell() {return cy.get("[data-qa='Net Operating Income-average']");}

    get expenseMonth() {return cy.get("[data-qa=expenseMonth-form-control] input");}

    get expenseMonthProjection() {return cy.get("[data-qa='autosuggest-text-input-field'] input");}
}

export default new ExpenseHistoryPage();
