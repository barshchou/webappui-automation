import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _name = Enums.EXPENSE_CELL.repairAndMaintenance;
const _basis = "sf" as BoweryReports.UnitSF;
const _projection = 335.44;
const _forecast = 23.01;

const _forecastItem = (): BoweryReports.ForecastItem => {
    return {
        name: _name,
        basis: _basis,
        projection: _projection,
        forecast: _forecast
    };
};

const _repairAndMaintenanceSfTotal = _forecast * _grossBuildingArea;
const _repairAndMaintenanceSfPerSf = _forecast;
const _repairAndMaintenanceSfPerUnit = _repairAndMaintenanceSfTotal / _numberOfResidentialUnits;

const _repairAndMaintenanceUnitTotal = _forecast * _numberOfResidentialUnits;
const _repairAndMaintenanceUnitPerSf = _repairAndMaintenanceUnitTotal / _grossBuildingArea;
const _repairAndMaintenanceUnitPerUnit = _forecast;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5829-31", {
    incomeValue: Enums.INCOME_TYPE.both
});

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    forecastItem: _forecastItem(),
    repairAndMaintenanceSfTotal: _repairAndMaintenanceSfTotal,
    repairAndMaintenanceSfPerSf: _repairAndMaintenanceSfPerSf,
    repairAndMaintenanceSfPerUnit: _repairAndMaintenanceSfPerUnit,
    repairAndMaintenanceUnitTotal: _repairAndMaintenanceUnitTotal,
    repairAndMaintenanceUnitPerSf: _repairAndMaintenanceUnitPerSf,
    repairAndMaintenanceUnitPerUnit: _repairAndMaintenanceUnitPerUnit
};