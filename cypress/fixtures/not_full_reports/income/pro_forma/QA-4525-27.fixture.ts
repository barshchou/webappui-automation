import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

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
const _columnsId = Enums.REIMBURSEMENT_COLUMN_ID.monthly as BoweryReports.ReimbursementColumnsId;
const _monthlyReimbursement = [ 20, 30, 46.07 ];
const _storageUnits = 2;
const _numberOfParkingPlaces = 2;
const _monthlyRents = [ 450, 231 ];
const _laundryIncome = 4567.99;
const _storageIncome = 4321.98;

const _otherIncomeItem: BoweryReports.OtherIncomeItem = {
    vcLossType: "Other",
    vcPercent: 2,
    incomeCategory: "Billboard",
    annualAmount: 4422.79
};

const _totalCommercialIncome = () => {
    let total = 0;
    for (let i = 0; i < _commercialUnitSf.length; i++) {
        total += _commercialUnitSf[i] * _commercialRentSf[i];
    }
    return total;
};

const _totalResidentialIncome = () => {
    let total = 0;
    _residentialMonthlyRent.forEach(rent => {
        total += rent * 12;
    });
    return total;
};

const _annualReimbursement = () => {
    let annual = [];
    _monthlyReimbursement.forEach(element => {
        annual.push(element * 12);
    });
    return annual;
};

const _annualReimbursementTotal = () => {
    let total = 0;
    _annualReimbursement().forEach(reimbursement => {
        total = total + reimbursement;
    });
    return total;
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

const _potentialGrossIncomeTotal = _annualReimbursementTotal() + _totalCommercialIncome() + _totalResidentialIncome() +
    _storageIncome + _laundryIncome + _otherIncomeItem.annualAmount + _totalParkingIncome();
const _potentialGrossIncomePerSf = _potentialGrossIncomeTotal / _grossBuildingArea;
const _potentialGrossIncomePerUnit = _potentialGrossIncomeTotal / _numberOfResidentialUnits;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4525-27", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _leaseStatuses: Array<BoweryReports.LeaseStatus> = [ "Occupied", "Occupied", "Occupied" ];

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
    columnsId: _columnsId,
    monthlyReimbursement: _monthlyReimbursement,
    expenseTypeCellName: _expenseTypeCellName,
    reimbursementType: _reimbursementType,
    residentialMonthlyRent: _residentialMonthlyRent,
    potentialGrossIncomeTotal: _potentialGrossIncomeTotal,
    potentialGrossIncomePerSf: _potentialGrossIncomePerSf,
    potentialGrossIncomePerUnit: _potentialGrossIncomePerUnit,
    storageUnits: _storageUnits,
    numberOfParkingPlaces: _numberOfParkingPlaces,
    monthlyRents: _monthlyRents,
    laundryIncome: _laundryIncome,
    storageIncome: _storageIncome,
    otherIncomeItem: _otherIncomeItem
};