import BasePage from "../base/base.page";

class ExpenseHistoryPage extends BasePage{

    get expensePeriodDropdown() {return cy.get("[data-qa=expensePeriod-select-list] [data-qa=select-value]");}
    getDropdownOptionByValue(value) {return cy.get(`li[data-value='${value}']`);}
    get expenseYearInput() {return cy.get("[name=expenseYear]");}
    get addExpenseYearButton() {return cy.get("[data-qa=expense-history-new-expense-year-btn]");}
    get grossRevenueCheckboxes() {return cy.get("[data-qa*='grossRevenue.reported'] input");}
    get grossRevenueInputs() {return cy.get("[name$='grossRevenue.total']");}
    get realEstateTaxesInputs() {return cy.get("[name$='expenses.realEstateTaxes.total']");}
    get insuranceInputs() {return cy.get("[name$='expenses.insurance.total']");}
    get electricityInputs() {return cy.get("[name$='expenses.electricity.total']");}
    get fuelInputs() {return cy.get("[name$='expenses.fuel.total']");}
    get fuelCheckboxes() {return cy.get("[data-qa*='expenses.fuel.reported'] input");}
    get waterSewerCheckboxes() {return cy.get("[data-qa*='expenses.waterAndSewer.reported'] input");}
    get payrollBenefitsInputs() {return cy.get("[name$='expenses.payrollAndBenefits.total']");}
    get totalOpExpenseCells() {return cy.get("[data-qa='Total Operating Expenses-undefined']");}
    get toeExclRealEstTaxesCells() {return cy.get("[data-qa$='(Excl. RE Taxes)-undefined']");}
    get netOpIncomeCells() {return cy.get("[data-qa='Net Operating Income-undefined']");}
    get expenseHistoryCommentary() {return cy.get("[data-qa^='expenseHistoryDiscussion.commentary']");}
    get averageGrossRevenueCell() {return cy.get("[data-qa='grossRevenue-row'] > td").last();}
    get averageRealEstateCell() {return cy.get("[data-qa=realEstateTaxes-row] > td").last();}
    get averageInsuranceCell() {return cy.get("[data-qa=insurance-row] > td").last();}
    get averageElectricity() {return cy.get("[data-qa=electricity-row] > td").last();}
    get averageFuelCell() {return cy.get("[data-qa=fuel-row] > td").last();}
    get averageWaterSewerCell() {return cy.get("[data-qa=waterAndSewer-row] > td").last();}
    get waterSewerInputs() {return cy.get("[name$='expenses.waterAndSewer.total']");}
    get averageRepairsCell() {return cy.get("[data-qa=repairsAndMaintenance-row] > td").last();}
    get repairsInputs() {return cy.get("[name$='expenses.repairsAndMaintenance.total']");}
    get averagePayrollCell() {return cy.get("[data-qa=payrollAndBenefits-row] > td").last();}
    get averageAdministrativeCell() {return cy.get("[data-qa=generalAndAdministrative-row] > td").last();}
    get administrativeInputs() {return cy.get("[name$='expenses.generalAndAdministrative.total']");}
    get averageProfessionalCell() {return cy.get("[data-qa=legalAndProfessionalFees-row] > td").last();}
    get professionalInputs() {return cy.get("[name$='expenses.legalAndProfessionalFees.total']");}
    get averageMiscellaneousCell() {return cy.get("[data-qa=miscellaneous-row] > td").last();}
    get miscellaneousInputs() {return cy.get("[name$='expenses.miscellaneous.total']");}
    get averageManagementCell() {return cy.get("[data-qa=management-row] > td").last();}
    get managementInputs() {return cy.get("[name$='expenses.management.total']");}
    get averageReplacementCell() {return cy.get("[data-qa=reserves-row] > td").last();}
    get replacementInputs() {return cy.get("[name$='expenses.reserves.total']");}
    get toeAverageCell() {return cy.get("[data-qa='Total Operating Expenses-average']");}
    get toeExclRETAverageCell() {return cy.get("[data-qa$='(Excl. RE Taxes)-average']");}
    get noeAverageCell() {return cy.get("[data-qa='Net Operating Income-average']");}
}

export default new ExpenseHistoryPage();
