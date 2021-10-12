import BasePage from "../../base/base.page";

class CommercialRentRollPage extends BasePage{
    get basisOfRentField() {return cy.contains("Basis of Rent");}
    get basisOfRentTooltip() {return cy.get("*[title='Select the unit of the provided rent roll.']");}
    get perSquareBasisButton() {return cy.get("button[value='per square foot']");}
    get monthlyBasisButton() {return cy.get("button[value='monthly']");}
    get annuallyBasisButton() {return cy.get("button[value='annually']");}
    get leaseStatusCells() {return cy.get("*[data-qa*='leaseStatus']");}
    get isInspectedCheckboxes() {return cy.get("*[data-qa*='isInspected']");}
    get elementToVerifyIsInspected() {return cy.get("*[data-qa*='isInspected'] span");}
}

export default new CommercialRentRollPage();