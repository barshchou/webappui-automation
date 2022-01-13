import Enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return {
        address: "462 1st Avenue, New York, USA",
        reportNumber: "TestAutoReport",
        templateValue: Enums.TEMPLATE_TYPE.FREDDIE_MAC,
        incomeValue: Enums.INCOME_TYPE.BOTH,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
    };
};

export const reportCreationData = () => {
    return Object.freeze(reportCreationFixture());
};

export default {
    reportCreationData: reportCreationData(),
    filePath: "not_full_reports/CostarExport.csv",
    compsNumber: 6
};