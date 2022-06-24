import BasePage from "../base/base.page";

class OrganizationPage extends BasePage{
   get createNewClient() {return cy.contains("Create New Client");}
   
   get createNewUser() {return cy.contains("Create New User");}

   get organizationClients() {return cy.contains("Organization Clients");}

   get organizationUsers() {return cy.contains("Organization Users");}
}

export default new OrganizationPage();