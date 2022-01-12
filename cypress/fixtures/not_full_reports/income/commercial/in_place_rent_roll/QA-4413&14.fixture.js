const reportCreationFixture = () => {
    return {
        address: "462 1st Avenue, New York, USA",
        reportNumber: "TestAutoReport",
        templateValue: "freddie-mac",
        incomeValue: "mixed-use",
        conclusionValue: "AS_IS"
    };
};

export default {
    reportCreationData: Object.freeze(reportCreationFixture()),
    editedCommentary: "some new commentary to add"
};