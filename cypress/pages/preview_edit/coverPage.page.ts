import BasePage from "../base/base.page";

class LetterOfTransmittalPage extends BasePage {
    get applicationNumberText() {return cy.get("[data-qa=application-number]");}
}

export default new LetterOfTransmittalPage();