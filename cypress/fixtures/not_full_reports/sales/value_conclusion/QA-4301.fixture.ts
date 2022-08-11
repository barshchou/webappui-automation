import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";

export default {
    reportCreationData: ReportDataCreator.getReportData("4301", {
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    }),
    numberOfUnits: 1,
    bedrooms: 1,
    rentType: "Market Rate",
    leaseStatus: "Occupied",
    laundryIncome: 15000,
    vcLossValue: Enums.LAUNDRY_VC_LOSS_TYPE.laundryVC as BoweryReports.LaundryVcLossType,
    vcLossPercentage: 5,
    concludedCapRate: 6,
    lossMonths: 2,
    laundryLossesAmount: "-$2,375",
    valueConclusionKeyAsComplete: Object.keys(Enums.VALUE_CONCLUSION_NAME)[2] as BoweryReports.ValueConclusionKeys,
    valueConclusionKeyAsStabilized: Object.keys(Enums.VALUE_CONCLUSION_NAME)[1] as BoweryReports.ValueConclusionKeys,
};