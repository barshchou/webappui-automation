import BasePage from "../base/base.page";

class LetterOfTransmittalPage extends BasePage {
    get previewButton() {return cy.get("[data-qa=Preview-switch-button]");}

    get formContainer() {return cy.get("[data-qa=formContainer]");}
}

export default new LetterOfTransmittalPage();