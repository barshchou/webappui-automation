import { BoweryAutomation } from "../../types/boweryAutomation.type";

let ClientCreationData = function (prefix: string, title: string, firstName: string, 
    middleInitial: string, lastName: string, clientSuffix: string, clientCompanyName: string, 
    streetAddress: string, city: string, state: string, zipCode: string | number) {
        this.prefix = prefix;
        this.title = title;
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.clientSuffix = clientSuffix;
        this.clientCompanyName = clientCompanyName;
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
};

class ClientCreator {
    prefix: string

    title: string

    firstName: string

    middleInitial: string

    lastName: string

    clientSuffix: string

    clientCompanyName: string

    streetAddress: string

    city: string

    state: string

    zipCode: string | number

    setAddresseePrefix(prefix?: string) {
        this.prefix = prefix ?? "Mr.";
        return this;
    }

    setAddresseeTitle(title?: string) {
        this.title = title ?? "Test building";
        return this;
    }

    setAddresseeFirstName(firstName?: string) {
        this.firstName = firstName ?? "Harley";
        return this;
    }

    setAddresseeMiddleInitial(middleInitial?: string) {
        this.middleInitial = middleInitial ?? " ";
        return this;
    }

    setAddresseeLastName(lastName?: string) {
        this.lastName = lastName ?? "Young";
        return this;
    }

    setClientSuffix(clientSuffix?: string) {
        this.clientSuffix = clientSuffix ?? "Pre";
        return this;
    }

    setClientCompanyName(clientCompanyName?: string) {
        this.clientCompanyName = clientCompanyName ?? "Test Company & CO";
        return this;
    }

    setStreetAddress(streetAddress?: string) {
        this.streetAddress = streetAddress ?? "422 1st Avenue";
        return this;
    }

    setCity(city?: string) {
        this.city = city ?? "New York";
        return this;
    }

    setState(state?: string) {
        this.state = state ?? "New York";
        return this;
    }

    setZipCode(zipCode?: string | number) {
        this.zipCode = zipCode ?? "10001";
        return this;
    }

    build() {
        return new
        ClientCreationData( this.prefix, this.title, 
            this.firstName, this.middleInitial, 
            this.lastName, this.clientSuffix,
            this.clientCompanyName, this.streetAddress,
            this.city, this.state, this.zipCode);
    }

    getDefaultClientData() {
        return this.setAddresseePrefix()
        .setAddresseeTitle()
        .setAddresseeFirstName()
        .setAddresseeMiddleInitial()
        .setAddresseeLastName()
        .setClientSuffix()
        .setClientCompanyName()
        .setStreetAddress()
        .setCity()
        .setState()
        .setZipCode()
        .build();
    }

    getClientData(options?: BoweryAutomation.OrganizationCreateNewClientData) {
        
        options?.prefix == undefined ? this.setAddresseePrefix() : this.setAddresseePrefix(options.prefix);
        options?.title == undefined ? this.setAddresseeTitle() : this.setAddresseeTitle(options.title);
        options?.firstName == undefined ? this.setAddresseeFirstName() : this.setAddresseeFirstName(options.firstName);
        options?.middleInitial == undefined ? this.setAddresseeMiddleInitial() : this.setAddresseeMiddleInitial(options.middleInitial);
        options?.lastName == undefined ? this.setAddresseeLastName() : this.setAddresseeLastName(options.lastName);
        options?.clientSuffix == undefined ? this.setClientSuffix() : this.setClientSuffix(options.clientSuffix);
        options?.clientCompanyName == undefined ? this.setClientCompanyName() : this.setClientCompanyName(options.clientCompanyName);
        options?.streetAddress == undefined ? this.setStreetAddress() : this.setStreetAddress(options.streetAddress);
        options?.city == undefined ? this.setCity() : this.setCity(options.city);
        options?.state == undefined ? this.setState() : this.setState(options.state);
        options?.zipCode == undefined ? this.setZipCode() : this.setZipCode(options.zipCode);
        
        return this.build();
    }
}

export default new ClientCreator();