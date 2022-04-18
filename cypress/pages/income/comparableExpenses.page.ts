import BasePage from "../base/base.page";

class ComparableExpensesPage extends BasePage {
    get addBlankColumnButton() {return cy.get("[data-qa=comparable-exp-add-blank-btn]");}

    get compAddressCells() {return cy.get("[name^=comparableExpenses][name$=address]");}

    get compLocationCells() {return cy.get("[name^=comparableExpenses][name$=location]");}

    get expensePeriodDropdowns() {return cy.get("[data-qa$=expensePeriod-form-control] [data-qa=select-value]");}

    getDropdownOptionByValue(value) {return cy.get(`li[data-value='${value}']`);}

    get squareFeetCells() {return cy.get("[name$=squareFeet]");}

    get residentialUnitsCells() {return cy.get("[name$=residentialUnits]");}

    get insuranceCells() {return cy.get("[name$='insurance.total']");}

    get electricityCells() {return cy.get("[name$='electricity.total']");}

    get repairsCells() {return cy.get("[name$='repairsAndMaintenance.total']");}

    get payrollCells() {return cy.get("[name$='payrollAndBenefits.total']");}

    get generalCells() {return cy.get("[name$='generalAndAdministrative.total']");}

    get managementFeesCells() {return cy.get("[name$='management.total']");}

    getUnifiedDollarCells(cellName: string) {return cy.get(`[name$='${cellName}.total']`);}

    get totalOpExpensesCells() {return cy.get("[data-qa^=total-operation-expenses-cell]");}

    get toePerSFCells() {return cy.get("[data-qa^=total-operation-expenses-per-sf-cell]");}

    get toePerUnitCells() {return cy.get("[data-qa^=total-operation-expenses-per-unit-cell]");}

    get squareFeetAverage() {return cy.get("[data-qa=squareFeet-row] > td:last-child");}

    get residentialUnitsAverage() {return cy.get("[data-qa=residentialUnits-row] > td:last-child");}

    get egiCells() {return cy.get("[name$=egi]");}

    get egiAverage() {return cy.get("[data-qa=egi-row] > td:last-child");}

    get insuranceAverage() {return cy.get("[data-qa=insurance-row] > td:last-child");}

    get electricityAverage() {return cy.get("[data-qa=electricity-row] > td:last-child");}

    get fuelCells() {return cy.get("[name$='fuel.total']");}

    get fuelAverage() {return cy.get("[data-qa=fuel-row] > td:last-child");}

    get waterSewerCells() {return cy.get("[name$='waterAndSewer.total']");}

    get waterSewerAverage() {return cy.get("[data-qa=waterAndSewer-row] > td:last-child");}

    get repairsAverage() {return cy.get("[data-qa=repairsAndMaintenance-row] > td:last-child");}

    get repairsAndMaintenanceCells() {return cy.get("[name$='repairsAndMaintenance.total']");}

    get payrollBenefitsAverage() {return cy.get("[data-qa=payrollAndBenefits-row] > td:last-child");}

    get generalAdministrativeAverage() {return cy.get("[data-qa=generalAndAdministrative-row] > td:last-child");}

    get legalProFeesCells() {return cy.get("[name$='legalAndProfessionalFees.total']");}

    get legalProFeesAverage() {return cy.get("[data-qa=legalAndProfessionalFees-row] > td:last-child");}

    get miscellaneousCells() {return cy.get("[name$='miscellaneous.total']");}

    get miscellaneousAverage() {return cy.get("[data-qa=miscellaneous-row] > td:last-child");}

    get managementAverage() {return cy.get("[data-qa=management-row] > td:last-child");}

    get reservesCells() {return cy.get("[name$='reserves.total']");}

    get reservesAverage() {return cy.get("[data-qa=reserves-row] > td:last-child");}

    getUnifiedDollarAverageCell(cellName: string) {return cy.get(`[data-qa=${cellName}-row] > td:last-child`);}
}

export default new ComparableExpensesPage();
