import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";

export default {
    reportCreationData: ReportDataCreator.getReportData("4302", {
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
    storageUnits: 3,
    storageIncome: 2000,
    storageVCLoss: 5,
    storageVcLossTypeRadio: Enums.STORAGE_VC_LOSS_TYPE.storageVC as BoweryReports.StorageVcLossType,
    rentLossTypeStorage: Enums.RENT_LOSS_TYPE.storage
};