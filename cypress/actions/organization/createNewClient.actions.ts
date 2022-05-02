import createNewClientPage from "../../pages/organization/createNewClient.page";
import BaseActionsExt from "../base/base.actions.ext";

class OrganizationInfoActions extends BaseActionsExt<typeof createNewClientPage>{
    selectAddresseePrefix(prefix: string) {
        createNewClientPage.addresseePrefixField.click();
        createNewClientPage.prefixSelectOption(prefix).click();
        return this;
    }

    enterAddresseeTitle(title: string) {
        createNewClientPage.addresseeTitleField.type(title);
        return this;
    }

    enterAddresseeFirstName(firstName: string) {
        createNewClientPage.addresseeFirstNameField.type(firstName);
        return this;
    }

    enterAddresseeMiddleInitial(middleInitial: string) {
        createNewClientPage.addresseeMiddleInitialField.type(middleInitial);
        return this;
    }

    enterAddresseeLastName(lastName: string) {
        createNewClientPage.addresseeLastNameField.type(lastName);
        return this;
    }

    enterClientSuffix(clientSuffix: string) {
        createNewClientPage.clientSuffixField.type(clientSuffix);
        return this;
    }

    enterClientCompanyName(clientCompanyName: string) {
        createNewClientPage.clientCompanyNameField.type(clientCompanyName);
        return this;
    }

    enterStreetAddress(streetAddress: string | number) {
        createNewClientPage.streetAddressField.type(`${streetAddress}`);
        return this;
    }

    enterCity(city: string) {
        createNewClientPage.cityField.type(city);
        return this;
    }

    selectState(state: string) {
        createNewClientPage.stateField.click();
        createNewClientPage.prefixSelectOption(state).click();
        return this;
    }

    entrerZipCode(zipCode: string | number) {
        createNewClientPage.zipCodeField.type(`${zipCode}`);
        return this;
    }

    createNewClient(prefix, title, firstName, middleInitial, lastName, clientSuffix, 
        clientCompanyName, streetAddress, city, state, zipCode) {
        this.selectAddresseePrefix(prefix)
        .enterAddresseeTitle(title)
        .enterAddresseeFirstName(firstName)
        .enterAddresseeMiddleInitial(middleInitial)
        .enterAddresseeLastName(lastName)
        .enterClientSuffix(clientSuffix)
        .enterClientCompanyName(clientCompanyName)
        .enterStreetAddress(streetAddress)
        .enterCity(city)
        .selectState(state)
        .entrerZipCode(zipCode);
    }
}

export default new OrganizationInfoActions(createNewClientPage);