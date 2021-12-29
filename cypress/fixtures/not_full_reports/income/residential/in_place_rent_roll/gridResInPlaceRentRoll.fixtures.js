const reportCreationFixture = () => {
    return {
        address: "462 1st Avenue, New York, USA",
        reportNumber: "TestAutoReport",
        templateValue: "freddie-mac",
        incomeValue: "mixed-use",
        conclusionValue: "AS_IS"
    };
};

const commonData = () => {
    return {
        sharpColumn: "#",
        numberOfUnits: 1,
        forecastLabel: "Developer's Forecast"
    };
};

export const reportCreationData = () => {
    return Object.freeze(reportCreationFixture());
};

export default {
    reportCreationData: reportCreationData(),
    commonData: commonData()
};