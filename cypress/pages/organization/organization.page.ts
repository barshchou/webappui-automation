import BasePage from "../base/base.page";

class OrganizationPage extends BasePage{
   get createNewClient() {return cy.contains("Create New Client");}
   
   get createNewUser() {return cy.contains("Create New User");}

   get organizationClient() {return cy.contains("Organization Clients");}
}

export default new OrganizationPage();