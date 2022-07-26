import BasePage from "../base/base.page";

class ComparableExpensesPage extends BasePage {
    get addBlankColumnButton() { return cy.get("[data-qa=comparable-exp-add-blank-btn]"); }

    getUnifiedEditableAndTotalCells(cellName: string) {
        return cy.get(`[row-id=${cellName}] [role=gridcell]:not([col-id=average]):not([col-id=name])`);
    }

    getUnifiedAverageCell(cellName: string) { return cy.get(`[row-id=${cellName}] [col-id=average]`); }

    get elementToCheckCellTextSelector() { return "[class=ag-react-container]"; }
}

export default new ComparableExpensesPage();
