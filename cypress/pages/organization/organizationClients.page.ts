import BasePage from "../base/base.page";

class OrganizationClientsPage extends BasePage {
    fullName(fullName: string) { return cy.contains(fullName).siblings().last(); }
}

export default new OrganizationClientsPage();