import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _name = Enums.EXPENSE_CELL.miscelaneous;
const _basis = "sf" as BoweryReports.UnitSF;
const _projection = 335.44;
const _forecast = 44.01;

const _forecastItem = (): BoweryReports.ForecastItem => {
    return {
        name: _name,
        basis: _basis,
        projection: _projection,
        forecast: _forecast
    };
};

const _miscellaneousSfTotal = _forecast * _grossBuildingArea;
const _miscellaneousSfPerSf = _forecast;
const _miscellaneousSfPerUnit = _miscellaneousSfTotal / _numberOfResidentialUnits;

const _miscellaneousUnitTotal = _forecast * _numberOfResidentialUnits;
const _miscellaneousUnitPerSf = _miscellaneousUnitTotal / _grossBuildingArea;
const _miscellaneousUnitPerUnit = _forecast;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5842-43_45", {
        incomeValue: Enums.INCOME_TYPE.both
    });

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    forecastItem: _forecastItem(),
    miscellaneousSfTotal: _miscellaneousSfTotal,
    miscellaneousSfPerSf: _miscellaneousSfPerSf,
    miscellaneousSfPerUnit: _miscellaneousSfPerUnit,
    miscellaneousUnitTotal: _miscellaneousUnitTotal,
    miscellaneousUnitPerSf: _miscellaneousUnitPerSf,
    miscellaneousUnitPerUnit: _miscellaneousUnitPerUnit
};