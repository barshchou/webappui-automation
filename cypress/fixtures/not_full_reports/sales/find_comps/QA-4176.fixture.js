import Enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return {
        address: "462 1st Avenue, New York, USA",
        reportNumber: "TestAutoReport-QA-4176",
        templateValue: Enums.TEMPLATE_TYPE.FREDDIE_MAC,
        incomeValue: Enums.INCOME_TYPE.RESIDENTIAL,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
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