import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _unitSf = [ 100000, 120000, 145000 ];
const _rentSf = [ 499, 1256.12, 777.99 ];
const _expenseType = Enums.PRO_FORMA_TYPES.realEstateTaxes;
const _reimbursmentType = "Dollar Amount";
const _knownInformation = "Monthly";
const _monthlyReimbursement = [ 20, 30, 46.07 ];

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

const _reimbursementPerSf = _annualReimbursementTotal() / _grossBuildingArea;
const _reimbursementPerUnit = _annualReimbursementTotal() / _numberOfResidentialUnits;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4501-03", {
        incomeValue: Enums.INCOME_TYPE.BOTH
    });

const _leaseStatuses: Array<BoweryReports.LeaseStatus> = [ "Occupied", "Occupied", "Occupied" ];

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    listOfUnitsSF: _unitSf,
    leaseStatuses: _leaseStatuses,
    rentsPsf: _rentSf,
    expenseType: _expenseType,
    reimbursmentType: _reimbursmentType,
    knownInformation: _knownInformation,
    monthlyReimbursement: _monthlyReimbursement,
    annualReimbursement: _annualReimbursementTotal(),
    reimbursmentPerSf: _reimbursementPerSf,
    reimbursmentPerUnit: _reimbursementPerUnit,
};