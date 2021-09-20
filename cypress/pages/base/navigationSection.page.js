import BasePage from "./base.page";

class NavigationSection extends BasePage {

    get incomeApproachButton() {return cy.get("#income-approach > svg")}
    get residentalIncomeArrow() {return cy.get("#residentialIncome > svg")}
    get inPlaceRentRollButton() {return cy.get("#residential-rent-roll")}

}

export default new NavigationSection()