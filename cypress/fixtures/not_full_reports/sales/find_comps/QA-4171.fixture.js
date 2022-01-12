const reportCreationFixture = () => {
    return {
        address: "462 1st Avenue, New York, USA",
        reportNumber: "TestAutoReport",
        templateValue: "freddie-mac",
        incomeValue: "mixed-use",
        conclusionValue: "AS_IS"
    };
};

const comparableFixture = () => {
    return {
        address: "200 West 78 Street"
    };
};

export default {
    reportCreationData: Object.freeze(reportCreationFixture()),
    comparable: Object.freeze(comparableFixture())
};