import BasePage from "../base/base.page";

class ComparableExpensesPage extends BasePage {
    get addBlankColumnButton() {return cy.get("[data-qa=comparable-exp-add-blank-btn]");}

    get compAddressCells() {return cy.get("[row-id='address'] [role=gridcell]:not([col-id=average])");}

    get compLocationCells() {return cy.get("[row-id=location] [role=gridcell]:not([col-id=average])");}

    get expensePeriodDropdowns() {return cy.get("[row-id=expensePeriod] [role=gridcell]:not([col-id=average])");}

    getDropdownOptionByValue(value) {return cy.get(`li[data-value='${value}']`);}

    get squareFeetCells() {return cy.get("[row-id=squareFeet] [role=gridcell]:not([col-id=average])");}

    get residentialUnitsCells() {return cy.get("[row-id=residentialUnits] [role=gridcell]:not([col-id=average])");}

    get insuranceCells() {return cy.get("[row-id=insurance] [role=gridcell]:not([col-id=average])");}

    get electricityCells() {return cy.get("[row-id=electricity] [role=gridcell]:not([col-id=average])");}

    get repairsCells() {return cy.get("[row-id=repairsAndMaintenance] [role=gridcell]:not([col-id=average])");}

    get payrollCells() {return cy.get("[row-id=payrollAndBenefits] [role=gridcell]:not([col-id=average])");}

    get generalCells() {return cy.get("[row-id=generalAndAdministrative] [role=gridcell]:not([col-id=average])");}

    get managementFeesCells() {return cy.get("[row-id=management] [role=gridcell]:not([col-id=average])");}

    getUnifiedDollarCells(cellName: string) {return cy.get(`[row-id=${cellName}] [role=gridcell]:not([col-id=average])`);}

    get totalOpExpensesCells() {return cy.get("[row-id=total] [role=gridcell]:not([col-id=average])");}

    get toePerSFCells() {return cy.get("[row-id=totalPerSF] [role=gridcell]:not([col-id=average])");}

    get toePerUnitCells() {return cy.get("[row-id=totalPerUnit] [role=gridcell]:not([col-id=average])");}

    get squareFeetAverage() {return cy.get("[row-id=squareFeet] [col-id=average]");}

    get residentialUnitsAverage() {return cy.get("[row-id=residentialUnits] [col-id=average]");}

    get egiCells() {return cy.get("[row-id=egi] [role=gridcell]:not([col-id=average])");}

    get egiAverage() {return cy.get("[row-id=egi] [col-id=average]");}

    get fuelCells() {return cy.get("[row-id=fuel] [role=gridcell]:not([col-id=average])");}

    get waterSewerCells() {return cy.get("[row-id=waterAndSewer] [role=gridcell]:not([col-id=average])");}

    get repairsAndMaintenanceCells() {return cy.get("[row-id=repairsAndMaintenance] [role=gridcell]:not([col-id=average])");}

    getUnifiedDollarAverageCell(cellName: string) {return cy.get(`[row-id=${cellName}] [col-id=average]`);}

    get elementToCheckCellTextSelector() {return "[class=ag-react-container]";}
}

export default new ComparableExpensesPage();
