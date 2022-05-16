let ClientCreationData = function (prefix, title, firstName, middleInitial, lastName, clientSuffix, clientCompanyName, streetAddress, city, state, zipCode) {
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

    setAddresseePrefix(prefix?) {
        this.prefix = prefix ?? "Mr.";
        return this;
    }

    setAddresseeTitle(title?) {
        this.title = title ?? "Test building";
        return this;
    }

    setAddresseeFirstName(firstName?) {
        this.firstName = firstName ?? "Harley";
        return this;
    }

    setAddresseeMiddleInitial(middleInitial?) {
        this.middleInitial = middleInitial ?? " ";
        return this;
    }

    setAddresseeLastName(lastName?) {
        this.lastName = lastName ?? "Young";
        return this;
    }

    setClientSuffix(clientSuffix?) {
        this.clientSuffix = clientSuffix ?? "Pre";
        return this;
    }

    setClientCompanyName(clientCompanyName?) {
        this.clientCompanyName = clientCompanyName ?? "Test Company & CO";
        return this;
    }

    setStreetAddress(streetAddress?) {
        this.streetAddress = streetAddress ?? "422 1st Avenue";
        return this;
    }

    setCity(city?) {
        this.city = city ?? "New York";
        return this;
    }

    setState(state?) {
        this.state = state ?? "New York";
        return this;
    }

    setZipCode(zipCode?) {
        this.zipCode = zipCode ?? "10001";
        return this;
    }

    build() {
        return new
        ClientCreationData( this.prefix, this.title, 
            this.firstName, this.middleInitial, 
            this.lastName,this.clientSuffix,
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

    // createNewClient(data: BoweryAutomation.OrganizationCreateNewClientData) {
    //     return this.setAddresseePrefix(data.prefix)
    //     .setAddresseeTitle(data.title)
    //     .setAddresseeFirstName(data.firstName)
    //     .setAddresseeMiddleInitial(data.middleInitial)
    //     .setAddresseeLastName(data.lastName)
    //     .setClientSuffix(data.clientSuffix)
    //     .setClientCompanyName(data.clientCompanyName)
    //     .setStreetAddress(data.streetAddress)
    //     .setCity(data.city)
    //     .setState(data.state)
    //     .setZipCode(data.zipCode)
    //     .build()
    //     .clickSaveFormButton();
    // }
}

export default new ClientCreator();