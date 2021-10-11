import BasePage from "../../base/base.page";

class CommercialRentRollPage extends BasePage{
    get basisOfRentField() {return cy.contains("Basis of Rent");}
    get basisOfRentTooltip() {return cy.get("*[title='Select the unit of the provided rent roll.']");}
    get perSquareBasisButton() {return cy.get("button[value='per square foot']");}
    get monthlyBasisButton() {return cy.get("button[value='monthly']");}
    get annuallyBasisButton() {return cy.get("button[value='annually']");}
}

export default new CommercialRentRollPage();