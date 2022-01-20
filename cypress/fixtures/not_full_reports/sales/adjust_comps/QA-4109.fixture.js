import Enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return {
        address: "462 1st Avenue, New York, USA",
        reportNumber: "TestAutoReport-QA4109",
        templateValue: Enums.TEMPLATE_TYPE.FREDDIE_MAC,
        incomeValue: Enums.INCOME_TYPE.RESIDENTIAL,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED
    };
};

const comparableFixture = () => {
    return {
        address: "200 West 78 Street",
        propertyRights: -70,
        trendedPrice: "$432.35"
    };
};

export default {
    reportCreationData: Object.freeze(reportCreationFixture()),
    calculationUnits: "PSF",
    comparable: Object.freeze(comparableFixture())
};