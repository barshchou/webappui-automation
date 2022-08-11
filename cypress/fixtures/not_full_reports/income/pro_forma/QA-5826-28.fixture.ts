import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _name = Enums.EXPENSE_CELL.waterAndSewer;
const _basis = "sf" as BoweryReports.UnitSF;
const _projection = 335.44;
const _forecast = 66.01;

const _forecastItem = (): BoweryReports.ForecastItem => {
    return {
        name: _name,
        basis: _basis,
        projection: _projection,
        forecast: _forecast
    };
};

const _waterAndSewerSfTotal = _forecast * _grossBuildingArea;
const _waterAndSewerSfPerSf = _forecast;
const _waterAndSewerSfPerUnit = _waterAndSewerSfTotal / _numberOfResidentialUnits;

const _waterAndSewerUnitTotal = _forecast * _numberOfResidentialUnits;
const _waterAndSewerUnitPerSf = _waterAndSewerUnitTotal / _grossBuildingArea;
const _waterAndSewerUnitPerUnit = _forecast;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5826-28", {
    incomeValue: Enums.INCOME_TYPE.both
});

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    forecastItem: _forecastItem(),
    waterAndSewerSfTotal: _waterAndSewerSfTotal,
    waterAndSewerSfPerSf: _waterAndSewerSfPerSf,
    waterAndSewerSfPerUnit: _waterAndSewerSfPerUnit,
    waterAndSewerUnitTotal: _waterAndSewerUnitTotal,
    waterAndSewerUnitPerSf: _waterAndSewerUnitPerSf,
    waterAndSewerUnitPerUnit: _waterAndSewerUnitPerUnit
};