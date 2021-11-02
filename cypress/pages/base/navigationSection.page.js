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
    get summaryButton() {return cy.get("#property-summary");}
    get clientButton() {return cy.get("#client");}
    get propertyMarketButton() {return cy.get("#property-market");}
    get propertyHistoryButton() {return cy.get("#property-history");}
    get propertyDescriptionButton() {return cy.get("#general-property-description");}
    get siteDescription() {return cy.get("#site-description");}
    get propertyMaps() {return cy.get("#property-maps");}
    get utilities() {return cy.get("#utilities");}
    get amenities() {return cy.get("#amenities");}
}

export default new NavigationSection();