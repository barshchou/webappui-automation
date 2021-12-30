const reportCreationFixture = () => {
    return {
        address: "462 1st Avenue, New York, USA",
        reportNumber: "TestAutoReport",
        templateValue: "freddie-mac",
        incomeValue: "mixed-use",
        conclusionValue: "AS_COMPLETE"
    };
};

export const reportCreationData = () => {
    return Object.freeze(reportCreationFixture());
};

export default {
    reportCreationData: reportCreationData()
};