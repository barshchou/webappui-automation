import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _storageIncome = 4321.98;
const _storageUnits = 2;

const _storageIncomePerSf = _storageIncome / _grossBuildingArea;
const _storageIncomePerUnit = _storageIncome / _numberOfResidentialUnits;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4510-12", {
        incomeValue: Enums.INCOME_TYPE.BOTH
    });

const _leaseStatuses: Array<BoweryReports.LeaseStatus> = [ "Occupied", "Occupied", "Occupied" ];

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    leaseStatuses: _leaseStatuses,
    storageIncome: _storageIncome,
    storageIncomePerSf: _storageIncomePerSf,
    storageIncomePerUnit: _storageIncomePerUnit,
    storageUnits: _storageUnits
};