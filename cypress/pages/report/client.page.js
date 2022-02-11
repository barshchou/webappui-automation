import BasePage from "../base/base.page";

class ClientPage extends BasePage{
    get clientNameField() {return cy.get("*[name=client]");}
    get addClientButton() {return cy.xpath("//a[.='Add']");}
    get appraiserCommentary() {return cy.get("[name='clientGuidelinesDiscussion.additionalCommentary']");}
}

export default new ClientPage();