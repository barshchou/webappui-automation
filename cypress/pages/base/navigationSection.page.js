import BasePage from "./base.page";

class NavigationSection extends BasePage {

    get incomeApproachButton() {return cy.get("#income-approach > svg");}
    get residentalIncomeArrow() {return cy.get("#residentialIncome > svg");}
    get inPlaceRentRollButton() {return cy.get("#residential-rent-roll");}
    get rentCompsButton() {return cy.get("#residential-rent-comps");}
    get commercialIncomeArrow() {return cy.get("#commercialIncome > svg");}
    get commercialRentRollButton() {return cy.get("#commercial-rent-roll");}
    get commercialStabRentRollButton() {return cy.get("#commercial-projected-rent-roll");}
    get finalButton() {return cy.get("#final > svg");}
    get unitInspectionButton() {return cy.get("#unit-inspection");}
    get propertyButton() {return cy.get("#property-information > svg");}
    get commercialUnitsButton() {return cy.get("#commercial-units");}
    get progressBar() {return cy.get("*[role='progressbar']");}
    get summaryButton() {return cy.get("#property-summary");}
}

export default new NavigationSection();