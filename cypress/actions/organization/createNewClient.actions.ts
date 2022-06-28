import createNewClientPage from "../../pages/organization/createNewClient.page";
import { BoweryAutomation } from "../../types/boweryAutomation.type";
import BaseActionsExt from "../base/base.actions.ext";

class OrganizationInfoActions extends BaseActionsExt<typeof createNewClientPage>{
    selectAddresseePrefix(prefix?: string): OrganizationInfoActions {
        createNewClientPage.addresseePrefixField.click();
        createNewClientPage.prefixSelectOption(prefix).click();
        return this;
    }

    enterAddresseeTitle(title?: string): OrganizationInfoActions {
        createNewClientPage.addresseeTitleField.type(title).should("have.value", title);
        return this;
    }

    enterAddresseeFirstName(firstName?: string): OrganizationInfoActions {
        createNewClientPage.addresseeFirstNameField.type(firstName).should("have.value", firstName);
        return this;
    }

    enterAddresseeMiddleInitial(middleInitial?: string): OrganizationInfoActions {
        createNewClientPage.addresseeMiddleInitialField.type(middleInitial).should("have.value", middleInitial);
        return this;
    }

    enterAddresseeLastName(lastName?: string): OrganizationInfoActions {
        createNewClientPage.addresseeLastNameField.type(lastName).should("have.value", lastName);
        return this;
    }

    enterClientSuffix(clientSuffix?: string): OrganizationInfoActions {
        createNewClientPage.clientSuffixField.type(clientSuffix).should("have.value", clientSuffix);
        return this;
    }

    enterClientCompanyName(clientCompanyName?: string): OrganizationInfoActions {
        createNewClientPage.clientCompanyNameField.type(clientCompanyName).should("have.value", clientCompanyName);
        return this;
    }

    enterStreetAddress(streetAddress?: string): OrganizationInfoActions {
        createNewClientPage.streetAddressField.type(streetAddress).should("have.value", streetAddress);
        return this;
    }

    enterCity(city?: string): OrganizationInfoActions {
        createNewClientPage.cityField.type(city).should("have.value", city);
        return this;
    }

    selectState(state?: string): OrganizationInfoActions {
        createNewClientPage.stateField.click();
        createNewClientPage.stateSelectOption(state).click();
        return this;
    }

    entrerZipCode(zipCode?: string | number): OrganizationInfoActions {
        createNewClientPage.zipCodeField.type(`${zipCode}`).should("have.value", zipCode);
        return this;
    }

    clickSaveFormButton(): OrganizationInfoActions {
        createNewClientPage.saveFormButton.should("be.enabled").click();
        return this;
    }

    verifySuccessModal(): OrganizationInfoActions {
        createNewClientPage.successModal.should("be.visible");
        return this;
    }
 
    createNewClient(data: BoweryAutomation.OrganizationCreateNewClientData): OrganizationInfoActions {
        this.selectAddresseePrefix(data.prefix)
        .enterAddresseeTitle(data.title)
        .enterAddresseeFirstName(data.firstName)
        .enterAddresseeMiddleInitial(data.middleInitial)
        .enterAddresseeLastName(data.lastName)
        .enterClientSuffix(data.clientSuffix)
        .enterClientCompanyName(data.clientCompanyName)
        .enterStreetAddress(data.streetAddress)
        .enterCity(data.city)
        .selectState(data.state)
        .entrerZipCode(data.zipCode)
        .clickSaveFormButton()
        .verifyProgressBarNotExist()
        .verifySuccessModal();
        return this;
    }
}

export default new OrganizationInfoActions(createNewClientPage);