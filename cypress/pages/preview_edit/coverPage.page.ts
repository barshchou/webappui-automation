import BasePage from "../base/base.page";

class CoverPage extends BasePage {
    get requestedClientName() { return cy.get("[data-qa=client-name]"); }
   
    get applicationNumberText() { return cy.get("[data-qa=application-number]"); }
}
export default new CoverPage();
