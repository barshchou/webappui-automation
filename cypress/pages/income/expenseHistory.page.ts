import BasePage from "../base/base.page";

class ExpenseHistoryPage extends BasePage{

    get expensePeriodDropdown() {return cy.get("[data-qa=expensePeriod-select-list] [data-qa=select-value]");}

    getDropdownOptionByValue(value) {return cy.get(`li[data-value='${value}']`);}

    get expenseYearInput() {return cy.get("[name=expenseYear]");}

    get addExpenseYearButton() {return cy.get("[data-qa=expense-history-new-expense-year-btn]");}

    get grossRevenueCheckboxes() {return cy.get("[data-qa*='grossRevenue.reported'] input");}

    get grossRevenueInputs() {return cy.get("[row-id='grossRevenue'] div.right-aligned-cell:not([col-id=average])");}
    
    get realEstateTaxesInputs() {return cy.get("[row-id='realEstateTaxes'] div.right-aligned-cell:not([col-id=average])");}

    get insuranceInputs() {return cy.get("[row-id='insurance'] div.right-aligned-cell:not([col-id=average])");}

    get electricityInputs() {return cy.get("[row-id='electricity'] div.right-aligned-cell:not([col-id=average])");}

    get fuelInputs() {return cy.get("[row-id='fuel'] div.right-aligned-cell:not([col-id=average])");}

    get repairsAndMaintenanceInputs() {return cy.get("[row-id='repairsAndMaintenance'] div.right-aligned-cell");}           //!!!!!

    get fuelCheckboxes() {return cy.get("[data-qa*='expenses.fuel.reported'] input");}

    get waterSewerCheckboxes() {return cy.get("[data-qa*='expenses.waterAndSewer.reported'] input");}

    get payrollBenefitsInputs() {return cy.get("[row-id='payrollAndBenefits'] div.right-aligned-cell:not([col-id=average])");}

    get totalOpExpenseCells() {return cy.get("[row-id=total] div.right-aligned-cell:not([col-id=average])");}

    get toeExclRealEstTaxesCells() {return cy.get("[row-id=totalExcludingTaxes] div.right-aligned-cell:not([col-id=average])");}

    get netOpIncomeCells() {return cy.get("[row-id=noi] div.right-aligned-cell:not([col-id=average])");}

    get expenseHistoryCommentary() {return cy.get("[data-qa^='expenseHistoryDiscussion.commentary']");}

    // TODO: see QA-5202 for more details
    get averageGrossRevenueCell() {return cy.get("[row-id=grossRevenue] [col-id=average]");}

    get averageRealEstateCell() {return cy.get("[row-id='realEstateTaxes'] [col-id=average]");}

    get averageInsuranceCell() {return cy.get("[row-id='insurance'] [col-id=average]");}

    get averageElectricity() {return cy.get("[row-id='electricity'] [col-id=average]");}

    get averageFuelCell() {return cy.get("[row-id='fuel'] [col-id=average]");}

    get averageWaterSewerCell() {return cy.get("[row-id='waterAndSewer'] [col-id=average]");}

    get waterSewerInputs() {return cy.get("[row-id='waterAndSewer'] div.right-aligned-cell:not([col-id=average])");}

    get averageRepairsCell() {return cy.get("[row-id='repairsAndMaintenance'] [col-id=average]");}

    get repairsInputs() {return cy.get("[row-id='repairsAndMaintenance'] div.right-aligned-cell:not([col-id=average])");}

    get averagePayrollCell() {return cy.get("[row-id='payrollAndBenefits'] [col-id=average]");}

    get averageAdministrativeCell() {return cy.get("[row-id='generalAndAdministrative'] [col-id=average]");}

    get administrativeInputs() {return cy.get("[row-id='generalAndAdministrative'] div.right-aligned-cell:not([col-id=average])");}

    get averageProfessionalCell() {return cy.get("[row-id='legalAndProfessionalFees'] [col-id=average]");}

    get professionalInputs() {return cy.get("[row-id='legalAndProfessionalFees'] div.right-aligned-cell:not([col-id=average])");}

    get averageMiscellaneousCell() {return cy.get("[row-id='miscellaneous'] [col-id=average]");}

    get miscellaneousInputs() {return cy.get("[row-id='miscellaneous'] div.right-aligned-cell:not([col-id=average])");}

    get averageManagementCell() {return cy.get("[row-id='management'] [col-id=average]");}

    get managementInputs() {return cy.get("[row-id='management'] div.right-aligned-cell:not([col-id=average])");}

    get averageReplacementCell() {return cy.get("[row-id='reserves'] [col-id=average]");}

    get replacementInputs() {return cy.get("[row-id='reserves'] div.right-aligned-cell:not([col-id=average])");}

    get toeAverageCell() {return cy.get("[row-id='total'] [col-id=average]");}

    get toeExclRETAverageCell() {return cy.get("[row-id='totalExcludingTaxes'] [col-id=average]");}

    get noeAverageCell() {return cy.get("[row-id='noi'] [col-id=average]");}

    get expenseMonth() {return cy.get("[data-qa=expenseMonth-form-control] input");}

    get expenseMonthProjection() {return cy.get("[data-qa='autosuggest-text-input-field'] input");}
}

export default new ExpenseHistoryPage();
