import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import mapKeysUtils from "../../../../utils/mapKeys/income/capRateConclusion/capRateConclusion.keys";
import miscellaneousTitles from "../../../../enums/pages_titles/income/miscellaneousTitles.enum";

const _otherIncomeItem: BoweryReports.OtherIncomeItem = {
    vcLossType: "Other",
    vcPercent: 2,
    incomeCategory: "Billboard",
    annualAmount: 4422.79
};

const _valuationDateFixture: BoweryReports.KeyInfoDateType = {
    type: Enums.DATE_TYPE.dateOfValuation,
    date: "08-15-2022"
};

const _rentLossTypeStorage = Enums.RENT_LOSS_TYPE.storage;
const _rentLossTypeLaundry = Enums.RENT_LOSS_TYPE.laundry;
const _rentLossTypeOther = Enums.RENT_LOSS_TYPE.other;
const _rentLossTypeParking = Enums.RENT_LOSS_TYPE.parking;

const _asStabilizedLossesFileName = `${mapKeysUtils.valueConclusionLossesAsStabilizedFileName}.txt`;
const _asCompleteLossesFileName = `${mapKeysUtils.valueConclusionLossesAsStabilizedFileName}.txt`;

export default {
    reportCreationData: ReportDataCreator.getReportData("4316", {
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    }),
    numberOfUnits: 1,
    commercialUnits: 1,
    bedrooms: 1,
    residentialMonthlyRent: 999.99,
    rentType: Enums.RENT_TYPE.marketRate,
    leaseStatus: Enums.LEASE_STATUS.occupied,
    concludedCapRate: 6,
    lossMonths: 2,
    valueConclusionKeyAsComplete: Object.keys(Enums.VALUE_CONCLUSION_NAME)[2] as BoweryReports.ValueConclusionKeys,
    valueConclusionKeyAsStabilized: Object.keys(Enums.VALUE_CONCLUSION_NAME)[1] as BoweryReports.ValueConclusionKeys,
    otherIncomeItem: _otherIncomeItem,
    valuationDateFixture: _valuationDateFixture,
    storageUnits: 3,
    parkingPlaces: 3,
    monthlyRents: [ 450, 231, 350 ],
    laundryIncome: 15000,
    storageIncome: 2000,
    storageVCLoss: 5,
    vcLossPercentage: 5,
    parkingVCLoss: 3,
    vcLossValue: Enums.LAUNDRY_VC_LOSS_TYPE.laundryVC as BoweryReports.LaundryVcLossType,
    parkingVcLossTypeRadio: Enums.PARKING_VC_LOSS_TYPE.parking as BoweryReports.ParkingVcLossType,
    storageVcLossTypeRadio: Enums.STORAGE_VC_LOSS_TYPE.storageVC as BoweryReports.StorageVcLossType,
    concludedValuePerSf: 1600.25,
    asStabilizedLossesFileName: _asStabilizedLossesFileName,
    asCompleteLossesFileName: _asCompleteLossesFileName,
    miscRentLosses: [
        {
            rentLossType: _rentLossTypeLaundry,
            rentLossName: miscellaneousTitles.LAUNDRY
        },
        {
            rentLossType: _rentLossTypeStorage,
            rentLossName: miscellaneousTitles.STORAGE
        },
        {
            rentLossType: _rentLossTypeParking,
            rentLossName: miscellaneousTitles.PARKING
        },
        {
            rentLossType: _rentLossTypeOther,
            rentLossName: miscellaneousTitles.OTHER
        }
    ],
    sectionToExport: [ Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.salesComparisonApproach ]
};