import BasePage from "../base/base.page";

class UnitInspectionPage extends BasePage {
    get generatedCommentary() {return cy.get("*[data-qa='unitInspectionDiscussion.commentary-generated-text']");}
    get numberCells() {return cy.get("[data-qa=number-cell]");}
    get readyForOccupancyDropdowns() {return cy.get("[data-qa*=readyForOccupancy] [data-qa=select-value]");}
    getDropdownOptionByValue(value) {return cy.get(`li[data-value='${value}']`);}
}

export default new UnitInspectionPage();