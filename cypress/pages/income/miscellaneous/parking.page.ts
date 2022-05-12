import BasePage from "../../base/base.page";

class ParkingPage extends BasePage {
    get isParkingFreeCheckbox() {return cy.get("[data-qa=isParkingFree] input");}

    get parkingCommentary() {return cy.get("[data-qa^='parkingIncomeDiscussion.commentary']");}
}

export default new ParkingPage();
