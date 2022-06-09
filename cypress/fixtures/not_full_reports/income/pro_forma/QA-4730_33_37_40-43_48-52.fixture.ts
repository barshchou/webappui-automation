import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryAutomation, BoweryReports } from "../../../../types";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4730_33_37_40-43_48-52", {
    incomeValue: Enums.INCOME_TYPE.BOTH
});

const _leaseStatuses: Array<BoweryReports.LeaseStatus> = [ "Occupied", "Occupied", "Occupied" ];
const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 2;
const _commercialUnitSf = [ 100000, 120000, 145000 ];
const _commercialRentSf = [ 499, 1256.12, 777.99 ];
const _residentialMonthlyRent = [ 999.99, 1801 ];
const _expenseType = Enums.PRO_FORMA_TYPES.realEstateTaxes;
const _expenseTypeCellName = Enums.EXPENSE_CELL.realEstateTaxes;
const _reimbursementType = Enums.REIMBURSEMENT_TYPES.dollarAmount as BoweryReports.ReimbursementType;
const _knownInformation = Enums.KNOWN_INFORMATION.monthly as BoweryReports.KnownInformation;
const _monthlyReimbursement = [ 20, 30, 46.07 ];
const _storageUnits = 2;
const _numberOfParkingPlaces = 2;
const _monthlyRents = [ 450, 231 ];
const _laundryIncome = 4567.99;
const _storageIncome = 4321.98;
const _reimbursementVcLoss = 3;
const _parkingVCLoss = 3;
const _laundryVCLoss = 5;
const _storageVCLoss = 6;
const _parkingVcLossTypeRadio = Enums.PARKING_VC_LOSS_TYPE.parking as BoweryReports.ParkingVcLossType;
const _laundryVcLossTypeRadio = Enums.LAUNDRY_VC_LOSS_TYPE.laundryVC as BoweryReports.LaundryVcLossType;
const _storageVcLossTypeRadio = Enums.STORAGE_VC_LOSS_TYPE.storageVC as BoweryReports.StorageVcLossType;

const _otherIncomeItem: BoweryReports.OtherIncomeItem = {
    vcLossType: "Other",
    vcPercent: 2,
    incomeCategory: "Billboard",
    annualAmount: 4422.79
};

const _annualRentPerSpace = () => {
    let annual = [];
    _monthlyRents.forEach(element => {
        annual.push(element * 12);
    });
    return annual;
};

const _totalParkingIncome = () => {
    let total = 0;
    _annualRentPerSpace().forEach(reimbursement => {
        total = total + reimbursement;
    });
    return total;
};

const _parkingLossTotal = (_totalParkingIncome() * _parkingVCLoss) / 100;
const _laundryLossTotal = (_laundryIncome * _laundryVCLoss) / 100;
const _storageLossTotal = (_storageIncome * _storageVCLoss) / 100;
const _otherLossTotal = (_otherIncomeItem.annualAmount * _otherIncomeItem.vcPercent) / 100;

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    listOfUnitsSF: _commercialUnitSf,
    leaseStatuses: _leaseStatuses,
    rentsPsf: _commercialRentSf,
    expenseType: _expenseType,
    knownInformation: _knownInformation,
    monthlyReimbursement: _monthlyReimbursement,
    expenceTypeCellName: _expenseTypeCellName,
    reimbursementType: _reimbursementType,
    residentialMonthlyRent: _residentialMonthlyRent,
    storageUnits: _storageUnits,
    numberOfParkingPlaces: _numberOfParkingPlaces,
    monthlyRents: _monthlyRents,
    laundryIncome: _laundryIncome,
    storageIncome: _storageIncome,
    otherIncomeItem: _otherIncomeItem,
    reimbursementVcLoss: _reimbursementVcLoss,
    parkingVcLossTypeRadio: _parkingVcLossTypeRadio,
    parkingVCLoss: _parkingVCLoss,
    laundryVCLoss: _laundryVCLoss,
    laundryVcLossTypeRadio: _laundryVcLossTypeRadio,
    storageVcLossTypeRadio: _storageVcLossTypeRadio,
    storageVCLoss: _storageVCLoss, 
    parkingLossTotal: _parkingLossTotal,
    laundryLossTotal: _laundryLossTotal,
    storageLossTotal: _storageLossTotal,
    otherLossTotal: _otherLossTotal
};