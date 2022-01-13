import Enums from "../../../../../enums/enums";

const reportCreationFixture = () => {
    return {
        address: "462 1st Avenue, New York, USA",
        reportNumber: "TestAutoReport",
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

const id247Fixture = () => {
    return {
        squareFeet: 358
    };
};

const id248Fixture = () => {
    return {
        squareFeet: 190.5
    };
};

const id250Fixture = () => {
    return {
        annualRents: [20000.156, 55555, 3825.948]
    };
};

const id251Fixture = () => {
    return {
        monthlyRents: [550.5, 100, 999]
    };
};

const id252Fixture = () => {
    return {
        perSFList: [100, 95, 1051.9]
    };
};

export const reportCreationData = () => {
    return Object.freeze(reportCreationFixture());
};

export const commonData = () => {
    return Object.freeze(commonTestsFixture());
};

export const id241Data = () => {
    return Object.freeze(id241Fixture());
};

export const id242Data = () => {
    return Object.freeze(id242Fixture());
};

export const leaseDatesData = () => {
    return Object.freeze(leaseDatesFixture());
};

export const id247Data = () => {
    return Object.freeze(id247Fixture());
};

export const id248Data = () => {
    return Object.freeze(id248Fixture());
};

export const id250Data = () => {
    return Object.freeze(id250Fixture());
};

export const id251Data = () => {
    return Object.freeze(id251Fixture());
};

export const id252Data = () => {
    return Object.freeze(id252Fixture());
};

export default {
    reportCreationData: reportCreationData(),
    commonData: commonData(),
    leaseDates: leaseDatesData(),
    id241: id241Data(),
    id242: id242Data(),
    id247: id247Data(),
    id248: id248Data(),
    id250: id250Data(),
    id251: id251Data(),
    id252: id252Data()
};