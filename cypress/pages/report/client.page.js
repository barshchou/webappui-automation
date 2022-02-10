import BasePage from "../base/base.page";

class ClientPage extends BasePage{
    get clientNameField() {return cy.get("*[name=client]");}
    get addClientButton() {return cy.xpath("//a[.='Add']");}
}

export default new ClientPage();