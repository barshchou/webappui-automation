import Enums from "../../../../../enums/enums";

const reportCreationFixture = () => {
    return {
        address: "462 1st Avenue, New York, USA",
        reportNumber: "TestAutoReport-QA-4391",
        templateValue: Enums.TEMPLATE_TYPE.FREDDIE_MAC,
        incomeValue: Enums.INCOME_TYPE.BOTH,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    };
};

const generalFixture = () => {
    return {
        numberOfUnits: 3,
        squareFeetList: [200, 358, 190.5],
        leaseStatusesList: ["Occupied", "Vacant", "Occupied"]
    };
};

export default {
    reportCreationData: Object.freeze(reportCreationFixture()),
    general: Object.freeze(generalFixture())
};