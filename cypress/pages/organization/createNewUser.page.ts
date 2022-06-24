import { BoweryAutomation } from "../../types/boweryAutomation.type";
import { BoweryReports } from "../../types/boweryReports.type";
import BasePage from "../base/base.page";

class OrganizationCreateNewUserPage extends BasePage{

    get usernameField() {return cy.get("[name='username']");}

    get firstNameField() {return cy.get("[name='name.first']");}

    get lastNameField() {return cy.get("[name='name.last']");}

    get middleNameField() {return cy.get("[name='name.middle']");}

    get roleNameField() {return cy.get("[id='select-Roles']");}

    get userPrefixField() {return cy.xpath("//label[contains(text(), 'Prefix')]//following::*[@data-qa='select-value'][1]");}

    get saveFormButton() {return cy.get("[type='submit']");}

    get successModal() {return cy.xpath("//*[contains(text(), 'Success')]");}

    selectRoleOption(role: BoweryAutomation.OrganizationRoles) {return cy.xpath(`//ul[@role = 'listbox']//span[.= '${role}']`);}

    prefixSelectOption(prefix: BoweryReports.OrganizationAddresseePrefix) {return cy.get(`[data-qa="prefix-${prefix}-select-option"]`);}
}

export default new OrganizationCreateNewUserPage();