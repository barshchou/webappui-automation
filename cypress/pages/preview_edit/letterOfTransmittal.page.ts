import BasePage from "../base/base.page";

class LetterOfTransmittalPage extends BasePage {
    get previewButton() {return cy.get("[data-qa=Preview-switch-button]");}
}

export default new LetterOfTransmittalPage();