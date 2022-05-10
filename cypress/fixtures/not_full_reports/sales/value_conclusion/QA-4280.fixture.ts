import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4280", false, {
        templateValue: Enums.TEMPLATE_TYPE.FREDDIE_MAC,
        incomeValue: Enums.INCOME_TYPE.BOTH,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    });
};

const dataFixture = () => {
    return {
        numberOfUnits: 1,
        bedroomsNumber: 3,
        rentType: "Market Rate",
        leaseStatus: "Occupied",
        monthlyRent: 3000,
        appraisersConclusion: 5,
        rentLossTimePeriod: 2
    };
};

export default {
    reportCreationData: reportCreationFixture(),
    data: Object.freeze(dataFixture())
};