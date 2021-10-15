import BasePage from "../../base/base.page";

class CommercialRentRollPage extends BasePage{
    get basisOfRentField() {return cy.contains("Basis of Rent");}
    get basisOfRentTooltip() {return cy.get("*[title='Select the unit of the provided rent roll.']");}
    get perSquareBasisButton() {return cy.get("button[value='per square foot']");}
    get monthlyBasisButton() {return cy.get("button[value='monthly']");}
    get annuallyBasisButton() {return cy.get("button[value='annually']");}
    get leaseStatusCells() {return cy.get("*[data-qa*='leaseStatus']:not([class*='readOnly'])");}
    get isInspectedCheckboxes() {return cy.get("*[data-qa*='isInspected']:not([class*='readOnly'])");}
    get elementToVerifyIsInspected() {return cy.get("*[data-qa*='isInspected']:not([class*='readOnly']) span");}
    get unitNumberCells() {return cy.get("*[data-qa*='#']");}
    getAllCellsByRowNumber(rowNumber) {return cy.get(`*[data-qa*='${rowNumber}-cell']`);}
    get tenantNameCells() {return cy.get("*[data-qa*='tenantName']");}
    get textareaToInput() {return cy.get("div:not([class*='hidden']) > *[class='handsontableInput']");}
    get useCells() {return cy.get("*[data-qa*=use]");}
    getLeaseDateCellsByName(name) {return cy.get(`*[data-qa*=lease${name}Date]`);}
    get squareFeetCells() {return cy.get("*[data-qa*=squareFeet]");}
}

export default new CommercialRentRollPage();