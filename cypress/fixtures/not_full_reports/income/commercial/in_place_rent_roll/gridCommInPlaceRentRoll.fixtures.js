import Enums from "../../../../../enums/enums";

const reportCreationFixture = () => {
    return {
        address: "462 1st Avenue, New York, USA",
        reportNumber: "TestAutoReport-GridCommercialRentRoll",
        templateValue: Enums.TEMPLATE_TYPE.FREDDIE_MAC,
        incomeValue: Enums.INCOME_TYPE.BOTH,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
    };
};

const commonTestsFixture = () => {
    return {
        existLeaseStatuses: ["Occupied", "Vacant"],
        squareFeet: 200,
        rentPerSF: 100,
        monthlyRent: 550.5,
        annualRent: 20000.156,
        numberOfUnits: 3,
        squareFeetList: [200, 358, 190.5],
        leaseStatusesList: ["Occupied", "Vacant", "Occupied"]
    };
};

const id241Fixture = () => {
    return {
        tenantName: "Test tenant name"
    };
};

const id242Fixture = () => {
    return {
        useRadios: ["retail", "office", "medical", "community", "undetermined"],
        useTexts: ["Retail", "Office", "Medical Office", "Community Facility", "Undetermined"]
    };
};

const leaseDatesFixture = () => {
    return {
        wrongFormatLeaseDate: "25/45/3000"
    };
};

export const commonData = () => {
    return Object.freeze(commonTestsFixture());
};

export default {
    reportCreationData: Object.freeze(reportCreationFixture()),
    commonData: Object.freeze(commonTestsFixture()),
    leaseDates: Object.freeze(leaseDatesFixture()),
    id241: Object.freeze(id241Fixture()),
    id242: Object.freeze(id242Fixture())
};