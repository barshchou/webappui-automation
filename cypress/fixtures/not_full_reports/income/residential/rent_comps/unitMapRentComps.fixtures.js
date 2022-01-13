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

const dataFixture = () => {
    return {
        unitTypesQaAttrs: ["typical", "duplex", "triplex", "simplex", "loft",
            "garden style", "basement", "garage", "penthouse"],
        minRentValue: "465,524.31",
        maxRentValue: "700,000.55",
        minSquareFeet: "57.09",
        maxSquareFeet: "200.4",
        numberOfBedroomsQaAttr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        sourceOfInfoQaAttr: ["bowery subject", "external database", "other"],
        dateInputTypes: ["min", "max"],
        amenitiesQaAttr: ["none", "backyard", "balcony", "roof", "terrace", "building laundry", "in-unit laundry"],
        sortByOptions: ["Oldest", "Smallest", "Largest", "Newest"],
        comparableIndex: 0,
        numberOfUnits: 0
    };
};

export const reportCreationData = () => {
    return Object.freeze(reportCreationFixture());
};

export const data = () => {
    return Object.freeze(dataFixture());
};

export default {
    reportCreationData: reportCreationData(),
    data: data()
};