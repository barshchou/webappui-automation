import { BoweryAutomation } from "../../types/boweryAutomation.type";
import BasePage from "../base/base.page";

class OrganizationEditUserPage extends BasePage{
    get lastNameTextField() {return cy.get('[name="name.last"]');}

    get firstNameTextField() {return cy.get('[name="name.first"]');}

    get roleNameField() {return cy.get("[id='select-Roles']");}

    get saveButton() {return cy.xpath('//button[.="save"]');}

    getResultModal(result = true) {
        let message = result ? "Success" : "Error";
        return cy.xpath(`//*[contains(text(), "${message}")]`);
    }

    getResultModalCloseButton(result = true) {
        let message = result ? "Success" : "Error";
        return cy.xpath(`//*[contains(text(), "${message}")]//following::button[1]`);
    }

    selectRoleOption(role: BoweryAutomation.OrganizationRoles) {return cy.xpath(`//ul[@role='listbox']//span[.='${role}']`);}
}

export default new OrganizationEditUserPage();