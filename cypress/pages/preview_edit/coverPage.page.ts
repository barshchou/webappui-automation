import BasePage from "../base/base.page";

class CoverPage extends BasePage {
   get requestedClientName() {return cy.get("[data-qa=client-name]");}
}
export default new CoverPage();