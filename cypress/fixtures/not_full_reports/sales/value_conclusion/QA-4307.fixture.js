const reportCreationFixture = () => {
    return {
        address: "462 1st Avenue, New York, USA",
        reportNumber: "TestAutoReport",
        templateValue: "freddie-mac",
        incomeValue: "mixed-use",
        conclusionValue: "AS_IS"
    };
};

export const reportCreationData = () => {
    return Object.freeze(reportCreationFixture());
};

export default {
    reportCreationData: reportCreationData(),
    dateOfValuation: {
        type: "dateOfValuation",
        date: "10-13-2021"
    }
};