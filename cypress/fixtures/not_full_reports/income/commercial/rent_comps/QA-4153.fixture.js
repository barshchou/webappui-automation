import Enums from "../../../../../enums/enums";

const reportCreationFixture = () => {
    return {
        address: "462 1st Avenue, New York, USA",
        reportNumber: "TestAutoReport-QA4153",
        templateValue: Enums.TEMPLATE_TYPE.FREDDIE_MAC,
        incomeValue: Enums.INCOME_TYPE.BOTH,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
    };
};

const checkboxesAttributesFixture = () => {
    return [
        "gross", "modified gross", "tiple-net"];
};

export default {
    reportCreationData: Object.freeze(reportCreationFixture()),
    checkboxesAttributes: Object.freeze(checkboxesAttributesFixture())
};