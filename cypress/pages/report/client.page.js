import BasePage from "../base/base.page";

class ClientPage extends BasePage{
    get clientNameField() {return cy.get("*[name=client]");}
}

export default new ClientPage();