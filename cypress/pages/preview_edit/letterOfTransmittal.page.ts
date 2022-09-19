import BasePage from "../base/base.page";

class LetterOfTransmittalPage extends BasePage {
    get previewButton() { return cy.get("[data-qa=Preview-switch-button]"); }

    get formContainer() { return cy.get("[data-qa=formContainer]"); }

    get countList() { return cy.xpath("//*[contains(text(), 'The opinion of value expressed')]/following::ol"); }
}

export default new LetterOfTransmittalPage();