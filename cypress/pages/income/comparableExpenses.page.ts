import BasePage from "../base/base.page";

class ComparableExpensesPage extends BasePage {
    get addBlankColumnButton() {return cy.get("[data-qa=comparable-exp-add-blank-btn]");}

    get compAddressCells() {return cy.get("[name^=comparableExpenses][name$=address]");}

    get compLocationCells() {return cy.get("[row-id=location] [aria-colindex='3']");}

    get expensePeriodDropdowns() {return cy.get("[row-id=expensePeriod] [aria-colindex='3']");}

    getDropdownOptionByValue(value) {return cy.get(`li[data-value='${value}']`);}

    get squareFeetCells() {return cy.get("[row-id=squareFeet] [aria-colindex='3']");}

    get residentialUnitsCells() {return cy.get("[row-id=residentialUnits] [aria-colindex='3']");}

    get insuranceCells() {return cy.get("[row-id=insurance] [aria-colindex='3']");}

    get electricityCells() {return cy.get("[row-id=electricity] [aria-colindex='3']");}

    get repairsCells() {return cy.get("[row-id=repairsAndMaintenance] [aria-colindex='3']");}

    get payrollCells() {return cy.get("[row-id=payrollAndBenefits] [aria-colindex='3']");}

    get generalCells() {return cy.get("[row-id=generalAndAdministrative] [aria-colindex='3']");}

    get managementFeesCells() {return cy.get("[row-id=management] [aria-colindex='3']");}

    getUnifiedDollarCells(cellName: string) {return cy.get(`[row-id=${cellName}] [aria-colindex='3']`);}

    get totalOpExpensesCells() {return cy.get("[row-id=total] [aria-colindex='3']");}

    get toePerSFCells() {return cy.get("[row-id=totalPerSF] [aria-colindex='3']");}

    get toePerUnitCells() {return cy.get("[row-id=totalPerUnit] [aria-colindex='3']");}

    get squareFeetAverage() {return cy.get("[row-id=squareFeet] [col-id=average]");}

    get residentialUnitsAverage() {return cy.get("[row-id=residentialUnits] [col-id=average]");}

    get egiCells() {return cy.get("[row-id=egi] [aria-colindex='3']");}

    get egiAverage() {return cy.get("[row-id=egi] [col-id=average]");}

    get fuelCells() {return cy.get("[row-id=fuel] [aria-colindex='3']");}

    get waterSewerCells() {return cy.get("[row-id=waterAndSewer] [aria-colindex='3']");}

    get repairsAndMaintenanceCells() {return cy.get("[row-id=repairsAndMaintenance] [aria-colindex='3']");}

    getUnifiedDollarAverageCell(cellName: string) {return cy.get(`[row-id=${cellName}] [col-id=average]`);}

    get elementToCheckCellTextSelector() {return "[class=ag-react-container]";}
}

export default new ComparableExpensesPage();
