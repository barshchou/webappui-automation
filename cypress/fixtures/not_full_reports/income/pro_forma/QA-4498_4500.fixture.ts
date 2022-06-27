import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _unitSf = [ 100000, 120000, 145000 ];
const _rentSf = [ 499, 1256.12, 777.99 ];

const total = () => {
    let total = 0;
    for (let i = 0; i < _unitSf.length; i++){
        total += _unitSf[i] * _rentSf[i];
    }
    return total;
};

const totalRentPerSf = total() / _grossBuildingArea;
const totalRentPerUnit = total() / _numberOfResidentialUnits;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4498_4500", {
        incomeValue: Enums.INCOME_TYPE.both
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
    perSfCommercialIncome: totalRentPerSf,
    perUnitCommercialIncome: totalRentPerUnit, 
    total: total()
};