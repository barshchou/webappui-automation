import BasePage from "../base/base.page";

class OrganizationUsersPage extends BasePage{
   getFullName(fullName: string) {return cy.contains(fullName).siblings().last();}

   get confirmDelete() {return cy.get('[data-qa=form-confirm-submit-btn]');}

   get successModal() {return cy.xpath("//*[contains(text(), 'Success')]");}

   get successModalCloseButton() {return cy.xpath("//*[contains(text(), 'Success')]//following::button[1]");}
}

export default new OrganizationUsersPage();