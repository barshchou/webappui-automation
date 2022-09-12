import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";

const _otherIncomeItem: BoweryReports.OtherIncomeItem = {
    vcLossType: "Other",
    vcPercent: 2,
    incomeCategory: "Billboard",
    annualAmount: 4422.79
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4304", {
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    }),
    numberOfUnits: 1,
    bedrooms: 1,
    rentType: Enums.RENT_TYPE.marketRate,
    leaseStatus: Enums.LEASE_STATUS.occupied,
    concludedCapRate: 6,
    lossMonths: 2,
    valueConclusionKeyAsComplete: Object.keys(Enums.VALUE_CONCLUSION_NAME)[2] as BoweryReports.ValueConclusionKeys,
    valueConclusionKeyAsStabilized: Object.keys(Enums.VALUE_CONCLUSION_NAME)[1] as BoweryReports.ValueConclusionKeys,
    rentLossTypeOther: Enums.RENT_LOSS_TYPE.other,
    otherIncomeItem: _otherIncomeItem
};