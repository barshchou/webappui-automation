import BasePage from "../base/base.page";

class OrganizationUsersPage extends BasePage{
   fullName(fullName: string) {return cy.contains(fullName).siblings().last();}

   get confirmDelete() {return cy.get('[data-qa=form-confirm-submit-btn]');}

   get successModal() {return cy.xpath("//*[contains(text(), 'Success')]");}

   get successModalCloseButton() {return cy.xpath("//*[contains(text(), 'Success')]//following::button[1]");}

   editButton(name: string) {return cy.xpath(`//td[.='${name}']//following-sibling::td/button[.="Edit"]`);}
}

export default new OrganizationUsersPage();