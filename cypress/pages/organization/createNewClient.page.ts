import BasePage from "../base/base.page";

class OrganizationCreateNewClientPage extends BasePage {
    get addresseePrefixField() { 
        return cy.xpath("//label[contains(text(), 'Addressee Prefix')]//following::*[@data-qa='select-value'][1]"); 
    }

    get addresseeTitleField() { 
        return cy.xpath("//label[contains(text(), 'Addressee Title')]//following::*[@type='text'][1]"); 
    }

    get addresseeFirstNameField() { 
        return cy.xpath("//label[contains(text(), 'Addressee First Name')]//following::*[@type='text'][1]"); 
    }

    get addresseeMiddleInitialField() { 
        return cy.xpath("//label[contains(text(), 'Addressee Middle Initial')]//following::*[@type='text'][1]"); 
    }

    get addresseeLastNameField() { 
        return cy.xpath("//label[contains(text(), 'Addressee Last Name')]//following::*[@type='text'][1]"); 
    }

    get clientSuffixField() { 
        return cy.xpath("//label[contains(text(), 'Client Suffix')]//following::*[@type='text'][1]"); 
    }

    get clientCompanyNameField() { 
        return cy.xpath("//label[contains(text(), 'Client/Company Name')]//following::*[@type='text'][1]"); 
    }

    get streetAddressField() { 
        return cy.xpath("//label[contains(text(), 'Street Address')]//following::*[@type='text'][1]"); 
    }

    get cityField() { return cy.xpath("//label[contains(text(), 'City')]//following::*[@type='text'][1]"); }

    get stateField() { 
        return cy.xpath("//label[contains(text(), 'State')]//following::*[@data-qa='select-value'][1]"); 
    }

    get zipCodeField() { return cy.xpath("//label[contains(text(), 'Zip Code')]//following::*[@type='text'][1]"); }

    get saveFormButton() { return cy.get("[type='submit']"); }

    get successModal() { return cy.xpath("//*[contains(text(), 'Success')]"); }

    prefixSelectOption(prefix: string) { return cy.get(`[data-qa="prefix-${prefix}-select-option"]`); }

    stateSelectOption(state: string) { return cy.get(`[data-qa="state.name-${state}-select-option"]`); }

}

export default new OrganizationCreateNewClientPage();