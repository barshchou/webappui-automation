import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _name = Enums.EXPENSE_CELL.electricity;
const _basis = "unit" as BoweryReports.UnitSF;
const _projection = 335.44;
const _forecast = 66.01;

const _forecastItem: BoweryReports.ForecastItem = {
    name: _name,
    basis: _basis,
    projection: _projection,
    forecast: _forecast
};

const _electricityUnitTotal = _forecast * _numberOfResidentialUnits;
const _electricityUnitPerSf = _electricityUnitTotal / _grossBuildingArea;
const _electricityUnitPerUnit = _forecast;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4851-53", {
        incomeValue: Enums.INCOME_TYPE.BOTH
    });

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    forecastItem: _forecastItem,
    electricityUnitTotal: _electricityUnitTotal,
    electricityUnitPerSf: _electricityUnitPerSf,
    electricityUnitPerUnit: _electricityUnitPerUnit

};