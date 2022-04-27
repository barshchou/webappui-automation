import BasePage from "../base/base.page";

class ComparableExpensesPage extends BasePage {
    get addBlankColumnButton() {return cy.get("[data-qa=comparable-exp-add-blank-btn]");}

    get compAddressCells() {return cy.get("[row-id='address'] .right-aligned-cell");}

    get compLocationCells() {return cy.get("[row-id=location] .right-aligned-cell");}

    get expensePeriodDropdowns() {return cy.get("[row-id=expensePeriod] .right-aligned-cell");}

    getDropdownOptionByValue(value) {return cy.get(`li[data-value='${value}']`);}

    get squareFeetCells() {return cy.get("[row-id=squareFeet] .right-aligned-cell");}

    get residentialUnitsCells() {return cy.get("[row-id=residentialUnits] .right-aligned-cell");}

    get insuranceCells() {return cy.get("[row-id=insurance] .right-aligned-cell");}

    get electricityCells() {return cy.get("[row-id=electricity] .right-aligned-cell");}

    get repairsCells() {return cy.get("[row-id=repairsAndMaintenance] .right-aligned-cell");}

    get payrollCells() {return cy.get("[row-id=payrollAndBenefits] .right-aligned-cell");}

    get generalCells() {return cy.get("[row-id=generalAndAdministrative] .right-aligned-cell");}

    get managementFeesCells() {return cy.get("[row-id=management] .right-aligned-cell");}

    getUnifiedDollarCells(cellName: string) {return cy.get(`[row-id=${cellName}] .right-aligned-cell`);}

    get totalOpExpensesCells() {return cy.get("[row-id=total] .right-aligned-cell");}

    get toePerSFCells() {return cy.get("[row-id=totalPerSF] .right-aligned-cell");}

    get toePerUnitCells() {return cy.get("[row-id=totalPerUnit] .right-aligned-cell");}

    get squareFeetAverage() {return cy.get("[row-id=squareFeet] [col-id=average]");}

    get residentialUnitsAverage() {return cy.get("[row-id=residentialUnits] [col-id=average]");}

    get egiCells() {return cy.get("[row-id=egi] .right-aligned-cell");}

    get egiAverage() {return cy.get("[row-id=egi] [col-id=average]");}

    get fuelCells() {return cy.get("[row-id=fuel] .right-aligned-cell");}

    get waterSewerCells() {return cy.get("[row-id=waterAndSewer] .right-aligned-cell");}

    get repairsAndMaintenanceCells() {return cy.get("[row-id=repairsAndMaintenance] .right-aligned-cell");}

    getUnifiedDollarAverageCell(cellName: string) {return cy.get(`[row-id=${cellName}] [col-id=average]`);}

    get elementToCheckCellTextSelector() {return "[class=ag-react-container]";}
}

export default new ComparableExpensesPage();
