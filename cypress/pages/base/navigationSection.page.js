import BasePage from "./base.page";

class NavigationSection extends BasePage {

    get incomeApproachButton() {return cy.get("#income-approach > svg");}
    get residentalIncomeArrow() {return cy.get("#residentialIncome > svg");}
    get inPlaceRentRollButton() {return cy.get("#residential-rent-roll");}
    get rentCompsButton() {return cy.get("#residential-rent-comps");}
    get commercialIncomeArrow() {return cy.get("#commercialIncome > svg");}
    get commercialRentRollButton() {return cy.get("#commercial-rent-roll");}
}

export default new NavigationSection();