import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4280", {
        templateValue: Enums.TEMPLATE_TYPE.freddieMac,
        incomeValue: Enums.INCOME_TYPE.both,
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
    data: Object.freeze(dataFixture()),
    valueConclusionKeyAsStabilized: Object.keys(Enums.VALUE_CONCLUSION_NAME)[1] as BoweryReports.ValueConclusionKeys,
    rentLossTypeResidential: Enums.RENT_LOSS_TYPE.resRentLossItems,
};