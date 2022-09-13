import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import {  BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _buildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 2;
const _commercialUnitSf = [ 100000, 120000, 145000 ];
const _commercialRentSf = [ 499, 1256.12, 777.99 ];
const _expenseType = Enums.PRO_FORMA_TYPES.realEstateTaxes;
const _expenseTypeCellName = Enums.EXPENSE_CELL.realEstateTaxes;
const _reimbursementType = Enums.REIMBURSEMENT_TYPES.dollarAmount as BoweryReports.ReimbursementType;
const _knownInformation = Enums.KNOWN_INFORMATION.monthly as BoweryReports.KnownInformation;
const _columnsId = Enums.REIMBURSEMENT_COLUMN_ID.monthly as BoweryReports.ReimbursementColumnsId;
const _monthlyReimbursement = [ 20, 30, 46.07 ];
const _reimbursementVcLoss = 5;

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

const _reimbursementLossTotal = (_annualReimbursementTotal() * _reimbursementVcLoss) / 100;
const _reimbursementLossPerSf = _reimbursementLossTotal / _buildingArea;
const _reimbursementLossPerUnit = _reimbursementLossTotal / _numberOfResidentialUnits;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4722_23_28_29", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _leaseStatuses: Array<BoweryReports.LeaseStatus> = [ "Occupied", "Occupied", "Occupied" ];

export default {
    reportCreationData: _reportCreationData,
    buildingArea: _buildingArea,
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
    reimbursementVcLoss: _reimbursementVcLoss,
    reimbursementLossTotal: _reimbursementLossTotal,
    reimbursementLossPerSf: _reimbursementLossPerSf,
    reimbursementLossPerUnit: _reimbursementLossPerUnit,
    basisSquareFootAnalysis: {
        gba: Enums.BASIS_SQUARE_FOOT_ANALYSIS.grossBuildingArea, 
        gla: Enums.BASIS_SQUARE_FOOT_ANALYSIS.grossLeasableArea,
        nla: Enums.BASIS_SQUARE_FOOT_ANALYSIS.netLeasableArea,
        nra: Enums.BASIS_SQUARE_FOOT_ANALYSIS.netRentableArea
    }
};