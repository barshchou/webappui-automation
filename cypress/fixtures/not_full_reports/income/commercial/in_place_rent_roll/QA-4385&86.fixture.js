import Enums from "../../../../../enums/enums";

const reportCreationFixture = () => {
    return {
        address: "462 1st Avenue, New York, USA",
        reportNumber: "TestAutoReport-QA-4385&86",
        templateValue: Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC,
        incomeValue: Enums.INCOME_TYPE.BOTH,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED
    };
};

export default {
    reportCreationData: Object.freeze(reportCreationFixture()),
    wrongFormatLeaseDate: "25/45/3000",
    occupiedLease: "Occupied",
    vacantLease: "Vacant"
};