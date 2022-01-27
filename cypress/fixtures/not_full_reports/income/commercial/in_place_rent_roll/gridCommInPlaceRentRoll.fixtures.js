import Enums from "../../../../../enums/enums";

const reportCreationFixture = () => {
    return {
        address: "462 1st Avenue, New York, USA",
        reportNumber: "TestAutoReport-GridCommercialRentRoll",
        templateValue: Enums.TEMPLATE_TYPE.FREDDIE_MAC,
        incomeValue: Enums.INCOME_TYPE.BOTH,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
    };
};

const commonTestsFixture = () => {
    return {
        existLeaseStatuses: ["Occupied", "Vacant"]
    };
};

export const commonData = () => {
    return Object.freeze(commonTestsFixture());
};

export default {
    reportCreationData: Object.freeze(reportCreationFixture()),
    commonData: Object.freeze(commonTestsFixture())
};