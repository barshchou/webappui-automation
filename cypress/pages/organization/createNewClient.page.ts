import BasePage from "../base/base.page";

class OrganizationCreateNewClientPage extends BasePage{
    get addresseePrefixField() {return cy.get("[data-qa=prefix-form-control]");}

    get addresseeTitleField() {return cy.get("");}

    get addresseeFirstNameField() {return cy.get("");}

    get addresseeMiddleInitialField() {return cy.get("");}

    get addresseeLastNameField() {return cy.get("");}

    get addresseeClientSuffixField() {return cy.get("");}

    get addresseeClientCompanyNameField() {return cy.get("");}

    get addresseeStreetAddressField() {return cy.get("");}

    get addresseeCityField() {return cy.get("");}

    get addresseeStateField() {return cy.get("");}

    get addresseeZipCodeField() {return cy.get("");}
}

export default new OrganizationCreateNewClientPage();