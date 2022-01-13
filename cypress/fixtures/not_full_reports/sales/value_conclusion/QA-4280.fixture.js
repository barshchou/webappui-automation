import Enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return {
        address: "462 1st Avenue, New York, USA",
        reportNumber: "TestAutoReport",
        templateValue: Enums.TEMPLATE_TYPE.FREDDIE_MAC,
        incomeValue: Enums.INCOME_TYPE.BOTH,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    };
};

const dataFixture = () => {
    return {
        numberOfUnits: 1,
        bedroomsNumber: 3,
        rentType: "Market Rate",
        leaseStatus: "Occupied",
        monthlyRent: 3000,
        appraisersConclusion: 5,
        rentLossTimePeriod: 2
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