import Enums from "../../../../../enums/enums";

const reportCreationFixture = () => {
    return {
        address: "462 1st Avenue, New York, USA",
        reportNumber: "TestAutoReport-QA-4377",
        templateValue: Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC,
        incomeValue: Enums.INCOME_TYPE.BOTH,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED
    };
};

export default {
    reportCreationData: Object.freeze(reportCreationFixture()),
    leaseStatus: "Occupied"
};