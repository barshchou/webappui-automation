import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _numberOfParkingPlaces = 2;
const _monthlyRents = [ 450, 231 ];

const _annualRentPerSpace = () => {
    let annual = [];
    _monthlyRents.forEach(element => {
        annual.push(element * 12);
    });
    return annual;
};

const _annualRentTotal = () => {
    let total = 0;
    _annualRentPerSpace().forEach(reimbursement => {
        total = total + reimbursement;
    });
    return total;
};

const _parkingincomePerSf = _annualRentTotal() / _grossBuildingArea;
const _parkingincomePerUnit = _annualRentTotal() / _numberOfResidentialUnits;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4504-06", {
        incomeValue: Enums.INCOME_TYPE.both
    });

const _leaseStatuses: Array<BoweryReports.LeaseStatus> = [ "Occupied", "Occupied", "Occupied" ];

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    leaseStatuses: _leaseStatuses,
    annualRentTotal: _annualRentTotal(),
    parkingincomePerSf: _parkingincomePerSf,
    parkingincomePerUnit: _parkingincomePerUnit,
    numberOfParkingPlaces: _numberOfParkingPlaces,
    monthlyRents: _monthlyRents
};