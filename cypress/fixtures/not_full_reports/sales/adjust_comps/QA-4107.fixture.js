import Enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return {
        address: "462 1st Avenue, New York, USA",
        reportNumber: "TestAutoReport",
        templateValue: Enums.TEMPLATE_TYPE.FREDDIE_MAC,
        incomeValue: Enums.INCOME_TYPE.RESIDENTIAL,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED
    };
};

const comparableFixture = () => {
    return {
        address: "200 West 78 Street",
        sizeAdjustment: 20,
        conditionAdjustment: -30,
        otherAdjustment: 40,
        propertyRights: -70
    };
};

export default {
    reportCreationData: Object.freeze(reportCreationFixture()),
    calculationUnits: "Per Residential Unit",
    comparable: Object.freeze(comparableFixture())
};