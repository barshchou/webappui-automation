import BasePage from "../../base/base.page";

class CommercialRentRollPage extends BasePage{
    get pageHeader() {return cy.xpath("//h5[text()='In-Place Rent Roll']");}
    get basisOfRentField() {return cy.contains("Basis of Rent");}
    get basisOfRentTooltip() {return cy.get("*[title='Select the unit of the provided rent roll.']");}
    get perSquareBasisButton() {return cy.get("button[value='per square foot per year']");}
    get monthlyBasisButton() {return cy.get("button[value='monthly']");}
    get annuallyBasisButton() {return cy.get("button[value='annually']");}
    get leaseStatusArrows() {return cy.get("[data-qa*='leaseStatus']:not([class*='readOnly']) > div[class*=Arrow]");}
    get leaseStatusArrowsLocator() {return "[data-qa*='leaseStatus']:not([class*='readOnly']) > div[class*=Arrow]";}
    get leaseStatusCells() {return cy.get("*[data-qa*='leaseStatus']:not([class*='readOnly'])");}
    get isInspectedCheckboxesLocator() {return "[data-qa*='isInspected']:not([class*='readOnly']) input";}
    get isInspectedCheckboxes() {return cy.get("*[data-qa*='isInspected']:not([class*='readOnly']) input");}
    get elementToVerifyIsInspected() {return cy.get("*[data-qa*='isInspected']:not([class*='readOnly']) span");}
    get unitNumberCells() {return cy.get("*[data-qa*='#']");}
    getAllCellsByRowNumber(rowNumber) {return cy.get(`*[data-qa*='${rowNumber}-cell']`);}
    get tenantNameCells() {return cy.get("*[data-qa*='tenantName']");}
    get textareaToInput() {return cy.get("div:not([class*='hidden']) > *[class='handsontableInput']");}
    get useCells() {return cy.get("*[data-qa*=use]");}
    getLeaseDateCellsByName(name) {return cy.get(`*[data-qa*=lease${name}Date]`);}
    get squareFeetCells() {return cy.get("*[data-qa*=squareFeet]");}
    get rentPerSFCells() {return cy.get("*[data-qa*=annualRentPsf]");}
    get annualRentCells() {return cy.get("*[data-qa*=annualRent]:not([data-qa*=Psf])");}
    get monthlyRentCells() {return cy.get("*[data-qa*=monthlyRent]:not([data-qa*=Psf])");}
    getLeaseStatusToChooseByValue(status) {return cy.xpath(`//li[.='${status}']`);}
}

export default new CommercialRentRollPage();
